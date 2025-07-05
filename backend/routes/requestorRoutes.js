const express = require('express');
const router = express.Router();
const middleware = require("../middleware/authmiddleware");
const requestor = require('../controllers/requestController');

router.get("/getDonations", requestor.getDonations);
router.get("/image/:id", requestor.getImage); 
router.post("/completeDonation", requestor.completeDonation);
//router.post("/request", middlware,requestor.requestFn);
module.exports = router;