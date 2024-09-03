const mongoose = require('mongoose');
const { Schema } = mongoose;
const { PermissionType, BasicStatus } = require('../scripts/mockData');

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
    type: Number,
    enum: Object.values(PermissionType),
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    enum: Object.values(BasicStatus),
    default: 1,
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
