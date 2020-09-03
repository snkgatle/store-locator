const express = require('express');
const { getMedicines, addMedicine } = require('../controllers/medicine');

const router = express.Router();

router
  .route('/')
  .get(getMedicines)
  .post(addMedicine);

module.exports = router;