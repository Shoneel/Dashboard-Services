const mongoose = require('mongoose');

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
    type: String,
    enum: ['enable', 'disable'],
    default: 'enable'
  },
  order: Number,
  desc: String,
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Role', RoleSchema);