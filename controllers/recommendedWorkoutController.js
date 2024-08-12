import db from "../database/connection.js";

export const getRecommendedWorkouts = async (req, res) => {
  const workoutType = req.params.workoutType;
  try {
    const recommendedWorkouts = await db
      .collection("recommendedWorkouts")
      .findOne({ type: workoutType });
    if (recommendedWorkouts) {
      res.json(recommendedWorkouts);
    } else {
      res
        .status(404)
        .json({ message: "No recommended workouts found for this type" });
    }
  } catch (error) {
    console.error("Error fetching recommended workouts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
