const express = require('express')
const router = express.Router();
const postDonation = require('../controllers/postDonationController');

router.post("/postDonation", postDonation);
module.exports = router