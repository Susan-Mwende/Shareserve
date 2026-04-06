import express from 'express';
import AdminUser from '../models/AdminUser.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET all admin users (super_admin only)
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is super_admin
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied. Super admin only.' });
    }

    const admins = await AdminUser.find().select('-password').sort({ createdAt: -1 });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single admin user
router.get('/:id', auth, async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.params.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin user not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create admin user (super_admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is super_admin
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied. Super admin only.' });
    }

    const { firstName, lastName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Admin user with this email already exists' });
    }

    // Create new admin user
    const adminUser = new AdminUser({
      firstName,
      lastName,
      email,
      password,
      role: role || 'admin'
    });

    await adminUser.save();
    res.status(201).json({
      message: 'Admin user created successfully',
      user: {
        id: adminUser._id,
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        email: adminUser.email,
        role: adminUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update admin user (super_admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    // Check if user is super_admin or updating themselves
    if (req.user.role !== 'super_admin' || req.user.userId === req.params.id) {
      return res.status(403).json({ message: 'Access denied. Super admin only.' });
    }

    const { firstName, lastName, email, role, isActive } = req.body;
    const admin = await AdminUser.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, role, isActive },
      { new: true, runValidators: true }
    );

    if (!admin) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE admin user (super_admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is super_admin
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied. Super admin only.' });
    }

    const adminToDelete = await AdminUser.findById(req.params.id);
    if (!adminToDelete) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    // Prevent deletion of super_admin users
    if (adminToDelete.role === 'super_admin') {
      return res.status(403).json({ message: 'Cannot delete super admin users' });
    }

    // Prevent self-deletion
    if (adminToDelete._id.toString() === req.user.userId) {
      return res.status(403).json({ message: 'Cannot delete your own account' });
    }

    await AdminUser.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admin user deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH toggle admin active status (super_admin only)
router.patch('/:id', auth, async (req, res) => {
  try {
    // Check if user is super_admin
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied. Super admin only.' });
    }

    const { isActive } = req.body;
    const adminToUpdate = await AdminUser.findById(req.params.id);
    if (!adminToUpdate) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    // Prevent modification of super_admin users
    if (adminToUpdate.role === 'super_admin') {
      return res.status(403).json({ message: 'Cannot modify super admin users' });
    }

    // Prevent self-modification
    if (adminToUpdate._id.toString() === req.user.userId) {
      return res.status(403).json({ message: 'Cannot modify your own account' });
    }

    await AdminUser.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true, runValidators: true }
    );

    res.json({ message: `Admin user ${isActive ? 'activated' : 'deactivated'} successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
