const Medicine = require('../models/Medicine');

// @desc  Get all medicines for a specific store
// @route GET /api/v1/medicines/:store_id
// @access Public
exports.getMedicines = async (req, res, next) => {
  try {
    const medicines = await Medicine.find({store_id: req.params.store_id});

    return res.status(200).json({
      success: true,
      count: medicines.length,
      data: medicines
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Add medicine
// @route POST /api/v1/medicines
// @access Public
exports.addMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.create(req.body);

    return res.status(201).json({
      success: true,
      data: medicine
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This medicine already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
