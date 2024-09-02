const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: String,
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
  },
  { 
    timestamps: true,
    toJSON: { 'virtuals': true }, // Include virtual fields in JSON responses
    toObject: { 'virtuals': true } // Include virtual fields in plain objects
  }
);

// Virtual field to automatically fetch permissions from the role
UserSchema.virtual('permissions', {
  ref: 'Permission',
  localField: 'role',
  foreignField: '_id',
  justOne: false,
  options: {
    populate: { path: 'permissions' }, // Ensure permissions within the role are populated
  },
});

// Pre-save middleware to hash the password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare the password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Custom method to populate role and permissions together when fetching the user
UserSchema.methods.getPermissions = async function () {
  const populatedUser = await this.populate({
    path: 'role',
    populate: {
      path: 'permissions', // Populate permissions within the role
    },
  }).execPopulate();

  return populatedUser.role.permissions; // Return permissions from the populated role
};

module.exports = mongoose.model('User', UserSchema);
