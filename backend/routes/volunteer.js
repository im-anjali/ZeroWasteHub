const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Delivery = require('../models/delivery');
const User = require('../models/userModel');
const { createVolAssignment } = require('../controllers/volunteerAssignment'); 
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("🔑 Token received in header:", token);
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded JWT:", decoded);
        req.user = await User.findById(decoded.id);
        if (!req.user) return res.status(401).json({ message: 'User not found' });
        next();
    } catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


const verifyVolunteer = async (req, res, next) => {
  try {
    if (req.user?.role !== 'volunteer') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


router.get('/requests', authenticate, verifyVolunteer, async (req, res) => {
  try {
    const tasks = await Delivery.find({ status: 'pending', volunteerId: null });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});


router.put('/accept/:id', authenticate, verifyVolunteer, async (req, res) => {
  try {
    const task = await Delivery.findById(req.params.id);
    if (!task || task.volunteerId) {
      return res.status(400).json({ message: 'Invalid task or already assigned' });
    }
    task.volunteerId = req.user._id; // Set current volunteer
    task.status = 'active';
    await task.save();
    res.json({ message: 'Accepted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error accepting task' });
  }
});

router.get('/active', authenticate, verifyVolunteer, async (req, res) => {
  try {
    const active = await Delivery.find({ volunteerId: req.user._id, status: 'active' });
    res.json(active);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching active deliveries' });
  }
});

router.put('/complete/:id', authenticate, verifyVolunteer, async (req, res) => {
  try {
    const task = await Delivery.findOne({ _id: req.params.id, volunteerId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = 'completed';
    await task.save();
    res.json({ message: 'Marked as completed' });
  } catch (err) {
    res.status(500).json({ message: 'Error completing task' });
  }
});

router.get('/history', authenticate, verifyVolunteer, async (req, res) => {
  try {
    const history = await Delivery.find({ volunteerId: req.user._id, status: 'completed' });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching history' });
  }
});

router.post('/createVolTask', authenticate, createVolAssignment);

module.exports = router;
