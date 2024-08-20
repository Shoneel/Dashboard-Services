const Permission = require('../models/permission');

exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json({
      status: 0,
      message: 'Permissions retrieved successfully',
      data: permissions
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPermission = async (req, res) => {
  try {
    const { name, label, type, route, icon, order, parentId, component } = req.body;
    const permission = new Permission({ name, label, type, route, icon, order, parentId, component });
    await permission.save();
    res.status(201).json({
      status: 0,
      message: 'Permission created successfully',
      data: permission
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const { name, label, type, route, icon, order, parentId, component } = req.body;
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      { name, label, type, route, icon, order, parentId, component },
      { new: true }
    );
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    res.json({
      status: 0,
      message: 'Permission updated successfully',
      data: permission
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    res.json({ status: 0, message: 'Permission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};