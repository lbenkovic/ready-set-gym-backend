import { db } from "../database/connection.js";

export const usersCollection = db.collection("users");
export const diaryCollection = db.collection("Diary");
export const exerciseListCollection = db.collection("exerciselist");
export const recipesCollection = db.collection("recipes");
export const recommendedWorkoutsCollection = db.collection(
    "recommendedWorkouts"
);
export const weightCollection = db.collection("weight");
export const workoutPlansCollection = db.collection("WorkoutPlans");
export const gymBrosCollection = db.collection("GymBros");
export const chatLogsCollection = db.collection("ChatLogs");
