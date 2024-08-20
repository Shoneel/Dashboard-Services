const mongoose = require('mongoose');
const { Schema } = mongoose;
const BasicStatus = require('../scripts/mockData'); 

const OrganizationSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['enable', 'disable'],
    default: 'enable'
  },
  desc: {
    type: String,
  },
  order: {
    type: Number,
  },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }],
}, { timestamps: true });

module.exports = mongoose.model('Organization', OrganizationSchema);
