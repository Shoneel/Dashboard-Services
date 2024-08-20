const mongoose = require('mongoose');
const { Schema } = mongoose;
const { PermissionType, BasicStatus } = require('../scripts/mockData');  // Ensure these are correctly defined and imported

const PermissionSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
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
    enum: ['enable', 'disable'],
    default: 'enable'
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
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
}, { timestamps: true });

module.exports = mongoose.model('Permission', PermissionSchema);
