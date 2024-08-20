const Role = require('../models/role');

exports.findRoleById = async (id) => {
  return Role.findById(id).populate('permissions');
};

exports.createRole = async (roleData) => {
  const role = new Role(roleData);
  return role.save();
};

exports.updateRole = async (id, updateData) => {
  return Role.findByIdAndUpdate(id, updateData, { new: true }).populate('permissions');
};

exports.deleteRole = async (id) => {
  return Role.findByIdAndDelete(id);
};

exports.getAllRoles = async () => {
  return Role.find().populate('permissions');
};