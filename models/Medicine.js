const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    quantity: Number,
    storeId: {
      type: String,
      required: [true, 'Please add a store ID'],
      trim: true,
      maxlength: [10, 'Store ID must be less than 10 chars']
    }
  })

  MedicineSchema.pre('save', async function(next) {
      console.log('Saving Medicine');
   next();
  });

  module.exports = mongoose.model('Medicine', MedicineSchema);