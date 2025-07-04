const express = require('express')
const router = express.Router();
const middlware = require("../middleware/authmiddleware")
const postDonation = require('../controllers/postDonationController');

router.post("/postDonation", middlware,postDonation.postDonation);
// router.post("/pending-donations", postDonation.postDonation)
router.get("/mydonations",middlware,  postDonation.getMyDonations);
module.exports = router;