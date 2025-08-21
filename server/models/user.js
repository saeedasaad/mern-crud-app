const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  birthday: { type: Date },
  jobTitle: { type: String, trim: true },
  companyName: { type: String, trim: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other', 'Prefer not to say'], trim: true },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

