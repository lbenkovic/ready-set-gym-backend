import { gymBrosCollection } from "../models/collections.js";
import { client } from "../database/connection.js";

gymBrosCollection.createIndex({ recipientEmail: 1 });

export const getGymBros = async (req, res) => {
    const userEmail = req.cookies.email;

    try {
        const userDoc = await gymBrosCollection.findOne(
            { recipientEmail: userEmail },
            { projection: { acceptedRequests: 1 } }
        );

        if (
            !userDoc ||
            !userDoc.acceptedRequests ||
            userDoc.acceptedRequests.length === 0
        ) {
            return res.json({
                message: "No Gym bros found.",
                data: [],
            });
        }
        return res.json({
            message: "Gym bros fetched successfully.",
            data: userDoc.acceptedRequests,
        });
    } catch (error) {
        console.error(`[GET] Fetch all friends error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: [],
        });
    }
};

export const getPendingRequests = async (req, res) => {
    const recipientEmail = req.cookies.email;

    try {
        const userDoc = await gymBrosCollection.findOne(
            { recipientEmail: recipientEmail },
            { projection: { pendingRequests: 1 } }
        );

        if (
            !userDoc ||
            !userDoc.pendingRequests ||
            userDoc.pendingRequests.length === 0
        ) {
            return res.json({
                message: "No pending Gym bro requests.",
                data: [],
            });
        }

        return res.json({
            message: "Pending Gym bro requests fetched successfully.",
            data: userDoc.pendingRequests,
        });
    } catch (error) {
        console.error(
            `[GET] Fetch pending Gym bro requests error: ${error.message}`
        );
        return res.status(500).json({
            message: "Internal server error",
            data: [],
        });
    }
};

export const savePendingRequest = async (req, res) => {
    const senderEmail = req.cookies.email;
    const recipientEmail = req.body.email;

    try {
        const recipientDoc = await gymBrosCollection.findOne(
            { recipientEmail: recipientEmail },
            { projection: { acceptedRequests: 1 } }
        );

        const acceptedRequests = recipientDoc?.acceptedRequests || [];

        if (acceptedRequests.includes(senderEmail)) {
            return res.status(400).json({
                message: "Gym bro request already accepted.",
                data: {},
            });
        }

        await gymBrosCollection.updateOne(
            { recipientEmail: recipientEmail },
            {
                $addToSet: { pendingRequests: senderEmail },
            },
            { upsert: true }
        );

        return res.json({
            message: "Pending request saved successfully.",
            data: {},
        });
    } catch (error) {
        console.error(`[POST] Gym bros pending error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};

export const acceptPendingRequest = async (req, res) => {
    const recipientEmail = req.cookies.email;
    const senderEmail = req.body.email;

    try {
        const session = client.startSession();
        session.startTransaction();

        const removeResult = await gymBrosCollection.updateOne(
            { recipientEmail: recipientEmail },
            {
                $pull: { pendingRequests: senderEmail },
            },
            { session }
        );

        if (removeResult.modifiedCount === 0) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                message: "Gym bro request not found.",
                data: {},
            });
        }

        await gymBrosCollection.updateOne(
            { recipientEmail: recipientEmail },
            {
                $addToSet: { acceptedRequests: senderEmail },
            },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.json({
            message: "Gym bro request accepted successfully.",
            data: {},
        });
    } catch (error) {
        console.error(`[POST] Accept Gym bro request error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};

export const denyPendingRequest = async (req, res) => {
    const recipientEmail = req.cookies.email;
    const senderEmail = req.body.email;

    try {
        const session = client.startSession();
        session.startTransaction();

        const removeResult = await gymBrosCollection.updateOne(
            { recipientEmail: recipientEmail },
            {
                $pull: { pendingRequests: senderEmail },
            },
            { session }
        );

        if (removeResult.modifiedCount === 0) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                message: "Gym bro request not found.",
                data: {},
            });
        }

        await session.commitTransaction();
        session.endSession();

        return res.json({
            message: "Gym bro request denied successfully.",
            data: {},
        });
    } catch (error) {
        console.error(`[POST] Deny Gym bro request error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};

export const cancelPendingRequest = async (req, res) => {
    const senderEmail = req.cookies.email;
    const recipientEmail = req.body.email;

    try {
        const recipientDoc = await gymBrosCollection.findOne(
            { recipientEmail: recipientEmail },
            { projection: { pendingRequests: 1 } }
        );

        if (
            !recipientDoc ||
            !recipientDoc.pendingRequests.includes(senderEmail)
        ) {
            return res.status(404).json({
                message: "Gym bro request not found.",
                data: {},
            });
        }
        await gymBrosCollection.updateOne(
            { recipientEmail: recipientEmail },
            {
                $pull: { pendingRequests: senderEmail },
            }
        );

        return res.json({
            message: "Gym bro request canceled successfully.",
            data: {},
        });
    } catch (error) {
        console.error(`[POST] Cancel Gym bro request error: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
};
