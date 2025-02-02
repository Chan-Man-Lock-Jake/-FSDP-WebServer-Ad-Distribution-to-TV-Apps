import { createAdCampaign, getAllAdCampaign } from "../models/adCampaign.js";

const createAdCampaignController = async (req, res) => {
    try {
        const sanitizedBody = {};
        Object.keys(req.body).forEach((key) => {
        sanitizedBody[key.trim()] = req.body[key];
        });

        // console.log("DATA",req.session.user);

        const companyName = sanitizedBody.Company?.trim();

        const user = {
            name: req.session.user.Name,
            company: req.session.user.Company,
        };

        // console.log(user);
        
        const response = await createAdCampaign(req.body, user);
        res.status(201).json(response);
        // if (response.success) {
        // } else {
        //     res.status(401).json({ message: response.message });
        // }
    } catch (error) {
        console.error('Error during AdCampaign creation:', error);
        res.status(500).json({ message: 'Login failed while creatig an ad.' });
    }
};

const getAllAdCampaignController = async (req, res) => {
    try {
        const allAdCampaigns = await getAllAdCampaign();
        res.status(200).json({ success: true, data: allAdCampaigns });
    } catch (error) {
        console.error('Error retrieving AdCampaign:', error);
        res.status(500).json({ message: 'Login failed while retrieving an ad.' });
    }
};

export { createAdCampaignController, getAllAdCampaignController };

