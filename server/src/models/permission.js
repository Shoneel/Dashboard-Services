const mongoose = require('mongoose');
const { Schema } = mongoose;
const { PermissionType, BasicStatus } = require('../scripts/mockData'); // Ensure these are correctly defined and imported

const PermissionSchema = new Schema({
  // id: {
  //   type: String,
  //   required: true,
  // },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission', // Referencing self
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  type: {
    type: String,
    enum: Object.values(PermissionType),
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(BasicStatus),
    default: 'enable',
  },
  order: {
    type: Number,
  },
  icon: {
    type: String,
  },
  component: {
    type: String,
  },
  hide: {
    type: Boolean,
    default: false,
  },
  hideTab: {
    type: Boolean,
    default: false,
  },
  frameSrc: {
    type: String,
  },
  newFeature: {
    type: Boolean,
    default: false,
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission', // Referencing self
  }],
}, { timestamps: true });

// Middleware to automatically populate children
PermissionSchema.pre(/^find/, function(next) {
  this.populate('children');
  next();
});

module.exports = mongoose.model('Permission', PermissionSchema);
