import db from "../database/connection.js";
import { ObjectId } from "mongodb";

const usersCollection = db.collection("users");
const recipesCollection = db.collection("recipes");

export const recordRecipes = async (req, res) => {
  const email = req.cookies.email;
  try {
    const { recipe } = req.body;
    const user = await usersCollection.findOne({ email: email });
    if (user) {
      await recipesCollection.insertOne({
        email: user.email,
        recipe,
      });
      return res.json({
        message: "Recipe saved successfully.",
        data: {},
      });
    } else {
      return res.status(404).json({ message: "User not found", data: {} });
    }
  } catch (error) {
    console.error(`[POST] Recipes error: ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
      data: {},
    });
  }
};

export const getRecipes = async (req, res) => {
  const email = req.cookies.email;
  try {
    const recipes = await recipesCollection.find({ email: email }).toArray();
    return res.json({
      message: "User recipes retrieved successfully.",
      data: { recipes },
    });
  } catch (error) {
    console.error(`[GET] Recipes error: ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
      data: {},
    });
  }
};

export const deleteRecipe = async (req, res) => {
  const email = req.cookies.email;
  const { recipeId } = req.params; // Recipe ID should be passed as a URL parameter

  try {
    // Check if user exists
    const user = await usersCollection.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: {},
      });
    }

    // Delete the recipe
    const result = await recipesCollection.deleteOne({
      _id: new ObjectId(recipeId), // Convert recipeId to ObjectId
      email: user.email,
    });

    if (result.deletedCount > 0) {
      return res.json({
        message: "Recipe deleted successfully.",
        data: {},
      });
    } else {
      return res.status(404).json({
        message: "Recipe not found",
        data: {},
      });
    }
  } catch (error) {
    console.error(`[DELETE] Recipe error: ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
      data: {},
    });
  }
};
