const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const  authenticate  = require('../middleware/authmiddleware');


router.get('/requests', authenticate, volunteerController.getPendingDeliveries);
router.get('/active', authenticate, volunteerController.getActiveDeliveries);
router.get('/history', authenticate, volunteerController.getCompletedDeliveries);
router.put('/accept/:id', authenticate, volunteerController.acceptDelivery);
router.put('/complete/:id', authenticate, volunteerController.completeDelivery);
router.post('/createVolTask', authenticate,volunteerController.createVolAssignment);
module.exports = router;
