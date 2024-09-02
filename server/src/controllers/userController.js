const User = require('../models/user');

// Get user by ID with role and permissions populated
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: 'role',
        populate: {
          path: 'permissions', // Populate permissions within the role
        },
      });

    if (!user) {
      return res.status(404).json({ status: 1, message: 'User not found' });
    }

    res.json({
      status: 0,
      message: 'User found',
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        permissions: user.role.permissions,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ status: 1, message: 'Server error' });
  }
};

// Update user with populated role and permissions
exports.updateUser = async (req, res) => {
  try {
    const { username, email, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, avatar },
      { new: true }
    ).populate({
      path: 'role',
      populate: {
        path: 'permissions', // Populate permissions within the role
      },
    });

    if (!user) {
      return res.status(404).json({ status: 1, message: 'User not found' });
    }

    res.json({
      status: 0,
      message: 'User updated successfully',
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        permissions: user.role.permissions,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ status: 1, message: 'Server error' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 1, message: 'User not found' });
    }
    res.json({ status: 0, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ status: 1, message: 'Server error' });
  }
};

// Get all users with roles and permissions populated
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate({
        path: 'role',
        populate: {
          path: 'permissions', // Populate permissions within the role
        },
      });

    res.json({
      status: 0,
      message: 'Users retrieved successfully',
      data: users.map((user) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        permissions: user.role.permissions,
      })),
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ status: 1, message: 'Server error' });
  }
};
