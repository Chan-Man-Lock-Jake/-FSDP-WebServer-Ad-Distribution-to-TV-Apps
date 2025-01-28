import express from 'express';
import { getAllAdInfoController } from '../controllers/adInfoController.js';
import { createAdCampaignController, getAllAdCampaignController } from '../controllers/adCampaignController.js';
const router = express.Router();

router.get('/get-ad-info', getAllAdInfoController);
router.post('/create-campaign', createAdCampaignController);
router.get('/get-all-ad-campaign', getAllAdCampaignController);

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
