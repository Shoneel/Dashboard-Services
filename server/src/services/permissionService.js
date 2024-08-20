const Permission = require('../models/permission');

exports.findPermissionById = async (id) => {
  return Permission.findById(id);
};

exports.createPermission = async (permissionData) => {
  const permission = new Permission(permissionData);
  return permission.save();
};

exports.updatePermission = async (id, updateData) => {
  return Permission.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deletePermission = async (id) => {
  return Permission.findByIdAndDelete(id);
};

exports.getAllPermissions = async () => {
  return Permission.find();
};