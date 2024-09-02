const mongoose = require('mongoose');
const { Schema } = mongoose;
const { BasicStatus } = require('../scripts/mockData'); // Ensure BasicStatus is correctly imported and defined

const OrganizationSchema = new Schema({
  id: {
    type: String,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization', // Referencing self
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(BasicStatus),
    default: 'enable',
  },
  desc: {
    type: String,
  },
  order: {
    type: Number,
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization', // Referencing self
  }],
}, { timestamps: true });

// Middleware to automatically populate children when fetching organizations
OrganizationSchema.pre(/^find/, function(next) {
  this.populate('children');
  next();
});

module.exports = mongoose.model('Organization', OrganizationSchema);
