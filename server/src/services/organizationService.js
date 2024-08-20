const Organization = require('../models/organization');

exports.findOrganizationById = async (id) => {
  return Organization.findById(id);
};

exports.createOrganization = async (organizationData) => {
  const organization = new Organization(organizationData);
  return organization.save();
};

exports.updateOrganization = async (id, updateData) => {
  return Organization.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteOrganization = async (id) => {
  return Organization.findByIdAndDelete(id);
};

exports.getAllOrganizations = async () => {
  return Organization.find();
};