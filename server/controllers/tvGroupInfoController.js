import {getTvGroupCardInfo, getTvGroupInfo, getAllOutlets, getOutletsNTvsById} from "../models/tvGroupInfo.js";


const getTvGroupCardInfoController = async (req, res) => {
    try{
        const tvGroupInfo = await getTvGroupCardInfo();
        res.status(200).json(tvGroupInfo);
    } catch (error){
        console.error("Error in getting tv group info:", error);
        res.status(500).json({ message: "Error in retrieving tv group info" });
    }
}

// accepts id as params to look at specific tv grps
const getTvGroupInfoController = async (req, res) => {
    try{
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({message: 'TvGroupId is required'});
        }
        const tvGroupInfo = await getTvGroupInfo(id);
        res.status(200).json(tvGroupInfo);
    } catch (error){
        console.error("Error in getting tv group info:", error);
        res.status(500).json({ message: "Error in retrieving tv group info" });
    }
}

// get outlets
const getAllOutletsController = async (req, res) => {
    try {
        const outlets = await getAllOutlets();
        res.status(200).json(outlets);
    } catch (error) {
        console.error('Error retrieving outlets:', error);
        res.status(500).json({ message: 'Error retrieving outlets' });
    }
}

// get tvs for an outlet
const getOutletsNTvsByIdController = async (req, res) => {
    try{
        const { outletId } = req.params;

        if (!outletId) {
            return res.status(400).json({message: 'OutletId is required'});
        }
        const outletData = await getOutletsNTvsById(outletId);
        res.status(200).json(outletData);
    } catch (error){
        console.error("Error in getting outlet info:", error);
        res.status(500).json({message:"Error in retrieving outlet info"});
    }
}

export { getTvGroupCardInfoController, getTvGroupInfoController, getAllOutletsController, getOutletsNTvsByIdController};

