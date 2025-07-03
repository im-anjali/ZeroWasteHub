const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const authenticate = require('../middleware/authmiddleware');

// Apply `authenticate` middleware
router.get('/requests', authenticate, volunteerController.getUnassigned);
router.get('/active', authenticate, volunteerController.getActive);
router.get('/history', authenticate, volunteerController.getCompleted);

router.put('/accept/:id', authenticate, volunteerController.acceptDonation);
router.put('/complete/:id', authenticate, volunteerController.completeDonation);

module.exports = router;
