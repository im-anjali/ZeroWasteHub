const express = require('express');
const router = express.Router();
const requestor = require('../controllers/requestController');
const authenticate = require('../middleware/authmiddleware'); 

router.get("/getDonations", requestor.getDonations);
router.get("/image/:id", requestor.getImage);
router.post("/completeDonation", requestor.completeDonation);
router.get('/myRequests', authenticate, requestor.getRequest);

module.exports = router;
