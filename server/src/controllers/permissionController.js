const Permission = require('../models/permission');

// Get all permissions
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find().populate('children'); // Populate children if required
    res.json({
      status: 0,
      message: 'Permissions retrieved successfully',
      data: permissions
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new permission
exports.createPermission = async (req, res) => {
  try {
    const { name, label, type, route, icon, order, parentId, component } = req.body;

    // Create the new permission
    const permission = new Permission({ name, label, type, route, icon, order, parentId, component });

    // If the permission has a parent, update the parent's children list
    if (parentId) {
      const parentPermission = await Permission.findById(parentId);
      if (!parentPermission) {
        return res.status(404).json({ message: 'Parent permission not found' });
      }
      parentPermission.children.push(permission._id);
      await parentPermission.save();
    }

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

// Update an existing permission
exports.updatePermission = async (req, res) => {
  try {
    const { name, label, type, route, icon, order, parentId, component } = req.body;

    // Find the existing permission
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    // If parentId is changed, update the parent permissions accordingly
    if (permission.parentId && permission.parentId.toString() !== parentId) {
      // Remove from the old parent
      const oldParent = await Permission.findById(permission.parentId);
      if (oldParent) {
        oldParent.children = oldParent.children.filter((childId) => childId.toString() !== permission._id.toString());
        await oldParent.save();
      }

      // Add to the new parent
      if (parentId) {
        const newParent = await Permission.findById(parentId);
        if (!newParent) {
          return res.status(404).json({ message: 'New parent permission not found' });
        }
        newParent.children.push(permission._id);
        await newParent.save();
      }
    }

    // Update the permission details
    permission.name = name;
    permission.label = label;
    permission.type = type;
    permission.route = route;
    permission.icon = icon;
    permission.order = order;
    permission.parentId = parentId;
    permission.component = component;

    await permission.save();
    res.json({
      status: 0,
      message: 'Permission updated successfully',
      data: permission
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a permission
exports.deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    // If it has a parent, remove it from the parent's children
    if (permission.parentId) {
      const parentPermission = await Permission.findById(permission.parentId);
      if (parentPermission) {
        parentPermission.children = parentPermission.children.filter(
          (childId) => childId.toString() !== permission._id.toString()
        );
        await parentPermission.save();
      }
    }

    // Delete all children recursively if necessary
    await Permission.deleteMany({ parentId: permission._id });

    // Finally, delete the permission
    await permission.remove();
    res.json({ status: 0, message: 'Permission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
