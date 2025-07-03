const express = require('express')
const router = express.Router();
const middlware = require("../middleware/authmiddleware")
const postDonation = require('../controllers/postDonationController');
const getDonation = require('../controllers/getDonationController');
const getImage = require('../controllers/getImageController');
router.post("/postDonation", middlware,postDonation.postDonation);
router.get("/getDonations", getDonation);
router.get("/image/:id", getImage); 

router.post("/pending-donations", postDonation.postDonation)
router.get("/mydonations",middlware,  postDonation.getMyDonations);
module.exports = router;