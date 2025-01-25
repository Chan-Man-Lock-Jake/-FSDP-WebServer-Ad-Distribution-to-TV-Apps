import { getAllAdInfo } from "../models/adInfo.js";

const getAllAdInfoController = async (req, res) => {
    try {
        const adInfo = await getAllAdInfo();
        res.status(200).json(adInfo);
    } catch (error) {
        console.error("Error getting ad info:", error);
        res.status(500).json({ message: "Error getting ad info" });
    }
}

export { getAllAdInfoController };