import {getTvGroupCardInfo} from "../models/tvGroupInfo.js";
import {getTvGroupInfo} from "../models/tvGroupInfo.js";


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

export { getTvGroupCardInfoController };
export { getTvGroupInfoController };

