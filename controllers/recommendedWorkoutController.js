import { recommendedWorkoutsCollection } from "../models/collections.js";

export const getRecommendedWorkouts = async (req, res) => {
    const workoutType = req.params.workoutType;
    try {
        const recommendedWorkouts = await recommendedWorkoutsCollection.findOne(
            { type: workoutType }
        );
        if (recommendedWorkouts) {
            return res.json({
                message: "Recommended workout retrieved successfully.",
                data: { recommendedWorkouts },
            });
        } else {
            res.status(404).json({
                message: "No recommended workouts found for this type",
                data: {},
            });
        }
    } catch (error) {
        console.error(`[GET] Recommended workouts error: ${error.message}`);
        return res
            .status(500)
            .json({ message: "Internal server error", data: {} });
    }
};
