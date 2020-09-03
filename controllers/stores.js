const Store = require('../models/Store');
const Medicine = require('../models/Medicine');

// @desc  Get all stores
// @route GET /api/v1/stores
// @access Public
exports.getStores = async (req, res, next) => {
  try {
    let stores = await Store.find();
    stores.forEach(async (store, idx) => {
      const medicines = await Medicine.find({storeId: store.storeId})
      if (medicines != null) {
        stores[idx].medicines = [...medicines]
      }
      if(idx === (stores.length - 1)) {
        return res.status(200).json({
          success: true,
          count: stores.length,
          data: stores
        });
      }
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Create a store
// @route POST /api/v1/stores
// @access Public
exports.addStore = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);

    return res.status(201).json({
      success: true,
      data: store
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This store already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
