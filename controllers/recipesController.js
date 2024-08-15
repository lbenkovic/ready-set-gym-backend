import db from "../database/connection.js";

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
            return res
                .status(404)
                .json({ message: "User not found", data: {} });
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
        const recipes = await recipesCollection
            .find({ email: email })
            .toArray();
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
