const Role = require('../models/role');

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json({
      status: 0,
      message: 'Roles retrieved successfully',
      data: roles
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createRole = async (req, res) => {
  try {
    const { name, label, status, order, desc, permissions } = req.body;
    const role = new Role({ name, label, status, order, desc, permissions });
    await role.save();
    res.status(201).json({
      status: 0,
      message: 'Role created successfully',
      data: role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { name, label, status, order, desc, permissions } = req.body;
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { name, label, status, order, desc, permissions },
      { new: true }
    );
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json({
      status: 0,
      message: 'Role updated successfully',
      data: role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json({ status: 0, message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};