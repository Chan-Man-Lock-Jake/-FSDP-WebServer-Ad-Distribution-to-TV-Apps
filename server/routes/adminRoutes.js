import express from 'express';
import multer from 'multer';
import { getAllAdInfoController, uploadAdInfoController } from '../controllers/adInfoController.js';
import { uploadFinalizedAdController, getFinalizedAdController, getAllFinalizedAdController } from '../controllers/advertisementController.js';
import { createAdCampaignController, getAllAdCampaignController, updateAdCampaignController } from '../controllers/adCampaignController.js';
import { getTvGroupCardInfoController, getTvGroupInfoController, getOutletsNTvsByIdController, getAllOutletsController } from '../controllers/tvGroupInfoController.js';
const router = express.Router();
const upload = multer(); 

router.get('/get-ad-info', getAllAdInfoController);
router.post('/upload-finalized-ad', upload.single('file'), uploadFinalizedAdController);
router.get('/get-finalized-ad', getFinalizedAdController);
router.get('/get-all-finalized-ad', getAllFinalizedAdController);
router.post('/create-campaign', createAdCampaignController);
router.get('/get-all-ad-campaign', getAllAdCampaignController);
router.put("/update-ad-campaign/:campaignId", updateAdCampaignController);
router.get('/get-tv-grp-card-info', getTvGroupCardInfoController);
router.get('/get-tv-grp-info', getTvGroupInfoController);
router.post('/upload-ad-info', uploadAdInfoController);
router.get('/get-tv-grp-info/:id', getTvGroupInfoController);
router.get('/get-outlets', getAllOutletsController);
router.get('/get-outlet-info/:outletId', getOutletsNTvsByIdController);

export default router;