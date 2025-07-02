const adminController = require("../controllers/adminController");
const express = require('express');
const router = express.Router();

router.get("/pending-donations", adminController.getPendingDonations);
router.post("/approve/:id", adminController.approveDonation);
router.delete("/delete/:id", adminController.rejectDonation);

module.exports = router;
