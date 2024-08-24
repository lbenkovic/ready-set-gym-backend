import bcrypt from "bcrypt";
import { usersCollection } from "../models/collections.js";

export const getUserProfile = async (req, res) => {
    let email = req.cookies.email;
    if (req.params.email) {
        email = req.params.email;
    }
    try {
        const foundUser = await usersCollection.findOne({ email: email });
        if (foundUser) {
            if (req.params.email) {
                const user = {
                    email: foundUser.email,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    imagePath: foundUser.imagePath || null,
                };

                return res.json({
                    message: "Gym bro data retrieved successfully.",
                    data: { user },
                });
            } else {
                return res.json({
                    message: "User data retrieved successfully.",
                    data: { user: foundUser },
                });
            }
        } else {
            return res.status(404).json({
                message: "User not found.",
                data: {},
            });
        }
    } catch (error) {
        console.error(`[GET] Users error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const userData = req.body;
        const email = req.cookies.email;
        if (userData.new_password) {
            const user = await usersCollection.findOne({ email: email });
            console.log("USER:", user);
            if (
                user &&
                user.password &&
                (await bcrypt.compare(userData.old_password, user.password))
            ) {
                console.log("Old password matches. Updating profile...");
                const delta = {};
                if (userData.firstName) {
                    delta.firstName = userData.firstName;
                }
                if (userData.lastName) {
                    delta.lastName = userData.lastName;
                }
                if (userData.new_password) {
                    console.log("NEW PASSWORD", userData.new_password);
                    const newPasswordHash = await bcrypt.hash(
                        userData.new_password,
                        8
                    );
                    delta.password = newPasswordHash;
                }
                await usersCollection.updateOne(
                    { _id: user._id },
                    { $set: delta }
                );
            } else {
                return res.json({
                    message: "Old password doesn't match.",
                    data: {},
                });
            }
        } else {
            const user = await usersCollection.findOne({ email: email });
            if (user && user.password) {
                const delta = { imagePath: userData.imagePath };
                await usersCollection.updateOne(
                    { _id: user._id },
                    { $set: delta }
                );
            }
        }
        return res.json({
            message: "Profile updated successfully.",
            data: {},
        });
    } catch (error) {
        console.error(`[PATCH] Users error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};

export const searchUsers = async (req, res) => {
    const query = req.params.query;
    try {
        const foundUsers = await usersCollection
            .find({
                $or: [
                    { firstName: { $regex: query, $options: "i" } },
                    { lastName: { $regex: query, $options: "i" } },
                ],
            })
            .toArray();

        if (foundUsers && foundUsers.length > 0) {
            const users = foundUsers.map(({ _id, password, ...rest }) => rest);

            return res.json({
                message: "Users retrieved successfully.",
                data: { users },
            });
        } else {
            return res.status(404).json({
                message: "User not found.",
                data: {},
            });
        }
    } catch (error) {
        console.error(`[GET] Users error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};
