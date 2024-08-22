import { ObjectId } from "mongodb";
import {
    usersCollection,
    workoutPlansCollection,
} from "../models/collections.js";

export const addNewWorkoutPlan = async (req, res) => {
    const email = req.cookies.email;
    try {
        const { imageUrl, exercises, name } = req.body;
        if (!email || !name || !exercises || !imageUrl) {
            return res
                .status(400)
                .json({ message: "Missing required fields", data: {} });
        }

        const user = await usersCollection.findOne({ email: email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found", data: {} });
        }

        const result = await workoutPlansCollection.insertOne({
            _id: new ObjectId(),
            email,
            titleImagePath: imageUrl,
            exercisesArray: exercises,
            planName: name,
        });

        if (result.acknowledged) {
            return res
                .status(201)
                .json({ message: "New plan successfully added.", data: {} });
        } else {
            return res
                .status(500)
                .json({ message: "Failed to add new plan.", data: {} });
        }
    } catch (error) {
        console.error(`[POST] Workout plans error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};

export const getUserWorkoutPlans = async (req, res) => {
    const email = req.cookies.email;
    try {
        const workoutPlans = await workoutPlansCollection
            .find({ email: email })
            .toArray();
        return res.json({
            message: "User workout plans retrieved successfully.",
            data: { workoutPlans },
        });
    } catch (error) {
        console.error(`[GET] Workout plans error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};

export const deletePlan = async (req, res) => {
    const email = req.cookies.email;
    const { planId } = req.params;

    try {
        const user = await usersCollection.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                data: {},
            });
        }
        const result = await workoutPlansCollection.deleteOne({
            _id: new ObjectId(planId),
            email: user.email,
        });

        if (result.deletedCount > 0) {
            return res.json({
                message: "Plan deleted successfully.",
                data: {},
            });
        } else {
            return res.status(404).json({
                message: "Plan not found",
                data: {},
            });
        }
    } catch (error) {
        console.error(`[DELET] Workout plans error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};
