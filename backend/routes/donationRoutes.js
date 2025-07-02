const express = require('express')
const router = express.Router();
const postDonation = require('../controllers/postDonationController');
const getDonation = require('../controllers/getDonationController');
const getImage = require('../controllers/getImageController');
router.post("/postDonation", postDonation);
router.get("/getDonations", getDonation);
router.get("/image/:id", getImage); 

module.exports = router;