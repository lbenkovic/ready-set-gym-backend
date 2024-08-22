import { ObjectId } from "mongodb";
import { usersCollection, diaryCollection } from "../models/collections.js";

export const recordDiary = async (req, res) => {
    const email = req.cookies.email;
    try {
        const { content, date } = req.body;
        const user = await usersCollection.findOne({
            email: email,
        });

        if (user) {
            await diaryCollection.insertOne({
                email: user.email,
                content,
                date,
            });
            return res.json({
                message: "Diary entry saved successfully.",
                data: {},
            });
        } else {
            return res
                .status(404)
                .json({ message: "User not found", data: {} });
        }
    } catch (error) {
        console.error(`[POST] Diary error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};

export const getDiary = async (req, res) => {
    const email = req.cookies.email;
    try {
        const diaries = await diaryCollection.find({ email: email }).toArray();
        return res.json({
            message: "User diaries retrieved successfully.",
            data: { diaries },
        });
    } catch (error) {
        console.error(`[GET] Diary error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};

export const deleteDiary = async (req, res) => {
    const email = req.cookies.email;
    try {
        const diaryId = req.params.diaryId;

        const user = await usersCollection.findOne({ email: email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found", data: {} });
        }

        const diaryEntry = await diaryCollection.findOne({
            _id: new ObjectId(diaryId),
            email: user.email,
        });
        if (!diaryEntry) {
            return res
                .status(404)
                .json({ message: "Diary entry not found", data: {} });
        }

        await diaryCollection.deleteOne({ _id: new ObjectId(diaryId) });
        return res.json({
            message: "Diary deleted successfully.",
            data: { user },
        });
    } catch (error) {
        console.error(`[DELETE] Diary error: ${error.message}`);
        return res
            .status(500)
            .json({ message: "Internal server error", data: {} });
    }
};
