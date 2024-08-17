import db from "../database/connection.js";
import { ObjectId } from "mongodb";

const workoutPlansCollection = db.collection("WorkoutPlans");
const usersCollection = db.collection("users");

export const addNewWorkoutPlan = async (req, res) => {
  const email = req.cookies.email; // Use email from cookies or other secure methods
  try {
    const { imageUrl, exercises, name } = req.body;
    if (!email || !name || !exercises || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await usersCollection.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await workoutPlansCollection.insertOne({
      _id: new ObjectId(),
      email,
      titleImagePath: imageUrl,
      exercisesArray: exercises,
      planName: name,
    });

    if (result.acknowledged) {
      return res.status(201).json({ message: "New plan successfully added." });
    } else {
      return res.status(500).json({ error: "Failed to add new plan." });
    }
  } catch (error) {
    console.error("Error adding a plan:", error);
    return res.status(500).json({ error: "Error adding a plan" });
  }
};

export const getUserWorkoutPlans = async (req, res) => {
  const email = req.cookies.email; // Use email from cookies or other secure methods
  try {
    const workoutPlans = await workoutPlansCollection
      .find({ email: email })
      .toArray();
    return res.json({
      message: "User workout plans retrieved successfully.",
      data: { workoutPlans },
    });
  } catch (error) {
    console.error("Error fetching workout plans:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
