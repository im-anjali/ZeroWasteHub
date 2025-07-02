// routes/volunteer.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Delivery = require('../models/Delivery'); // Schema for delivery requests
const User = require('../models/userModel');

// Middleware to verify role
const verifyVolunteer = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user?.role !== 'volunteer') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET: All unassigned delivery requests
router.get('/requests', verifyVolunteer, async (req, res) => {
  try {
    const tasks = await Delivery.find({ status: 'pending', volunteer: null });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// PUT: Accept a delivery task
router.put('/accept/:id', verifyVolunteer, async (req, res) => {
  try {
    const task = await Delivery.findById(req.params.id);
    if (!task || task.volunteer) {
      return res.status(400).json({ message: 'Invalid task' });
    }
    task.volunteer = req.user._id;
    task.status = 'active';
    await task.save();
    res.json({ message: 'Accepted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error accepting task' });
  }
});

// GET: Volunteer active deliveries
router.get('/active', verifyVolunteer, async (req, res) => {
  try {
    const active = await Delivery.find({ volunteer: req.user._id, status: 'active' });
    res.json(active);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching active deliveries' });
  }
});

// PUT: Mark delivery as completed
router.put('/complete/:id', verifyVolunteer, async (req, res) => {
  try {
    const task = await Delivery.findOne({ _id: req.params.id, volunteer: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = 'completed';
    await task.save();
    res.json({ message: 'Marked as completed' });
  } catch (err) {
    res.status(500).json({ message: 'Error completing task' });
  }
});

// GET: Delivery history for the volunteer
router.get('/history', verifyVolunteer, async (req, res) => {
  try {
    const history = await Delivery.find({ volunteer: req.user._id, status: 'completed' });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching history' });
  }
});

module.exports = router;