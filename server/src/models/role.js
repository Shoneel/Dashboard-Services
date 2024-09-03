const mongoose = require('mongoose');
const { BasicStatus } = require('../scripts/mockData');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  label: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    enum: Object.values(BasicStatus),
    default: 1,
  },
  order: Number,
  desc: String,
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission'
  }]
}, { timestamps: true });

// Pre-save middleware to handle operations before saving a role
RoleSchema.pre('save', async function (next) {
  // You can add custom logic here if needed, e.g., validating linked permissions
  next();
});

// Populate permissions automatically when finding roles
RoleSchema.pre(/^find/, function (next) {
  this.populate('permissions');
  next();
});

module.exports = mongoose.model('Role', RoleSchema);