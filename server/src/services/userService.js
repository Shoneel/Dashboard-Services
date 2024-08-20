const User = require('../models/user');

exports.findUserById = async (id) => {
  return User.findById(id).populate('role');
};

exports.findUserByUsername = async (username) => {
  return User.findOne({ username }).populate('role');
};

exports.createUser = async (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.updateUser = async (id, updateData) => {
  return User.findByIdAndUpdate(id, updateData, { new: true }).populate('role');
};

exports.deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

exports.getAllUsers = async () => {
  return User.find().populate('role');
};