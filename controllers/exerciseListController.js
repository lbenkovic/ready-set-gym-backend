// import db from "../database/connection.js";
import { exerciseListCollection } from "../models/collections.js";

// const exerciseListCollection = db.collection("exerciselist");

export const getExercises = async (req, res) => {
    try {
        const exerciseList = await exerciseListCollection.find({}).toArray();
        return res.json({
            message: "Exercise list retrieved successfully.",
            data: { exerciseList },
        });
    } catch (error) {
        console.error(`[GET] Exercise list error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};
