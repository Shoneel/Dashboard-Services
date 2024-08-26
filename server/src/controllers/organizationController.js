const Organization = require('../models/organization');

exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json({
      status: 0,
      message: 'Organizations retrieved successfully',
      data: organizations
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createOrganization = async (req, res) => {
  try {
    const { name, status, desc, order, children } = req.body;
    const organization = new Organization({ name, status, desc, order, children });
    await organization.save();
    res.status(201).json({
      status: 0,
      message: 'Organization created successfully',
      data: organization
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    const { name, status, desc, order, parentId } = req.body;
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      { name, status, desc, order, parentId },
      { new: true }
    );
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json({
      status: 0,
      message: 'Organization updated successfully',
      data: organization
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndDelete(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json({ status: 0, message: 'Organization deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};