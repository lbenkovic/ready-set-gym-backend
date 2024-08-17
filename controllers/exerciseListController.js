import db from "../database/connection.js";

const exerciseListCollection = db.collection("exerciselist");

export const getExercises = async (req, res) => {
  try {
    const exerciseList = await exerciseListCollection.find({}).toArray();
    res.json(exerciseList);
  } catch (error) {
    console.error("Error fetching exercise list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
