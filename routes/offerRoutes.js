const express = require('express');
const Offer = require('../models/Offer');

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const newOffer = new Offer(req.body);
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add this GET route
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
