const User = require('../models/user');

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('role');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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
        permissions: user.role.permissions
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, avatar },
      { new: true }
    ).populate('role');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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
        permissions: user.role.permissions
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ status: 0, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('role');
    res.json({
      status: 0,
      message: 'Users retrieved successfully',
      data: users.map(user => ({
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        permissions: user.role.permissions
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};