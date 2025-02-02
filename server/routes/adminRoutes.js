import express from 'express';
import multer from 'multer';
import { getAllAdInfoController, uploadAdInfoController } from '../controllers/adInfoController.js';
import { uploadFinalizedAdController, getFinalizedAdController, getAllFinalizedAdController } from '../controllers/advertisementController.js';
import { createAdCampaignController, getAllAdCampaignController } from '../controllers/adCampaignController.js';
import { getTvGroupCardInfoController, getTvGroupInfoController, getOutletsNTvsByIdController, getAllOutletsController } from '../controllers/tvGroupInfoController.js';
const router = express.Router();
const upload = multer(); 

router.get('/get-ad-info', getAllAdInfoController);
router.post('/upload-finalized-ad', upload.single('file'), uploadFinalizedAdController);
router.get('/get-finalized-ad', getFinalizedAdController);
router.get('/get-all-finalized-ad', getAllFinalizedAdController);
router.post('/create-campaign', createAdCampaignController);
router.get('/get-all-ad-campaign', getAllAdCampaignController);
router.get('/get-tv-grp-card-info', getTvGroupCardInfoController);
router.get('/get-tv-grp-info', getTvGroupInfoController);
router.post('/upload-ad-info', uploadAdInfoController);
router.get('/get-tv-grp-info/:id', getTvGroupInfoController);
router.get('/get-outlets', getAllOutletsController);
router.get('/get-outlet-info/:outletId', getOutletsNTvsByIdController);

export default router;





// import express from 'express';
// import { createBucketController, uploadFileController } from '../controllers/adContentController.js';
// import { createCampaignController, deleteCampaignController } from "../controllers/adCampaignController.js";
// //import { saveCampaign } from '../controllers/adCampaignController.js';
// import multer from 'multer';

// const router = express.Router();

// // Multer setup for handling file uploads
// const upload = multer({ dest: 'uploads/' }); // Temporary storage folder

// // Route to create a bucket with folders
// router.post('/create-bucket', createBucketController); // Reconsider when to place this!!!

// // Upload a file (advertisements/template contents) to folder in company bucket
// router.post('/upload-file', upload.single('file'), uploadFileController);

// //Ad Campaign
// //router.post('/saveCampaign', saveCampaign);
// router.post('/create-campaign', createCampaignController ) // Create campaign
// router.delete('/delete-campaign', deleteCampaignController) // Delete campaign 
// //router.post('/publish-campaign')                           // Publishes campaign to TV display

// export default router;
