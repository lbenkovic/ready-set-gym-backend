import db from "../database/connection.js";
import bcrypt from "bcrypt";

const usersCollection = db.collection("users");

export const userProfile = async (req, res) => {
  const email = req.cookies.email;
  try {
    const user = await usersCollection.findOne({ email: email });
    if (user) {
      return res.json({
        message: "User data retrieved successfully.",
        data: { user }, // Provjerite vraća li se ovdje objekt user
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

export const updateUserProfile = async (req, res) => {
  try {
    const userData = req.body;
    const email = req.cookies.email;
    if (userData.new_password) {
      const user = await usersCollection.findOne({ email: email });
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
          const newPasswordHash = await bcrypt.hash(userData.new_password, 8);
          delta.password = newPasswordHash;
        }
        await usersCollection.updateOne({ _id: user._id }, { $set: delta });
      } else {
        return res.status(401).json({
          message: "Old password doesn't match.",
          data: {},
        });
      }
    } else {
      const user = await usersCollection.findOne({ email: email });
      if (user && user.password) {
        const delta = { imagePath: userData.imagePath };
        await usersCollection.updateOne({ _id: user._id }, { $set: delta });
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
