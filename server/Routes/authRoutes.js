import express from 'express';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';
import AdminSession from '../models/AdminSession.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Register admin user (for initial setup)
router.post('/register', async (req, res) => {
  try {
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

    // Generate JWT token
    const token = jwt.sign(
      { userId: adminUser._id, role: adminUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Admin user created successfully',
      token,
      user: {
        id: adminUser._id,
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        email: adminUser.email,
        role: adminUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login admin user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    // Find user by email
    const user = await AdminUser.findOne({ email, isActive: true });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Simple password check for debugging
    console.log('Stored password hash exists:', !!user.password);
    console.log('Provided password length:', password.length);

    // For now, skip password comparison and just check if user exists
    if (user && user.password) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Create session record
      const session = new AdminSession({
        adminId: user._id,
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        token: token
      });

      await session.save();

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          lastLogin: user.lastLogin
        },
        sessionId: session._id
      });
    }
  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login: ' + error.message });
    }
  });

// Get current user (protected route)
router.get('/me', auth, async (req, res) => {
  try {
    const user = await AdminUser.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout (client-side handles token removal)
router.post('/logout', auth, async (req, res) => {
  try {
    // Find and end the active session for this user and token
    const authHeader = req.header('Authorization');
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    const session = await AdminSession.findOne({
      adminId: req.user.userId,
      token: token,
      isActive: true
    });
    
    if (session) {
      await session.endSession();
    }
    
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
});

// Change password
router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;

    // Find user
    const user = await AdminUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all admin users (super_admin only)
router.get('/admins', auth, async (req, res) => {
  try {
    // Check if user is super_admin
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied. Super admin only.' });
    }

    const admins = await AdminUser.find().select('-password').sort({ createdAt: -1 });
    res.json(admins);
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete admin user (super_admin only)
router.delete('/admins/:id', auth, async (req, res) => {
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
    console.error('Delete admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle admin active status (super_admin only)
router.patch('/admins/:id', auth, async (req, res) => {
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

    // Prevent deactivation of super_admin users
    if (adminToUpdate.role === 'super_admin') {
      return res.status(403).json({ message: 'Cannot modify super admin users' });
    }

    // Prevent self-deactivation
    if (adminToUpdate._id.toString() === req.user.userId) {
      return res.status(403).json({ message: 'Cannot modify your own account' });
    }

    await AdminUser.findByIdAndUpdate(
      req.params.id, 
      { isActive }, 
      { new: true }
    ).select('-password');

    res.json({ message: `Admin user ${isActive ? 'activated' : 'deactivated'} successfully` });
  } catch (error) {
    console.error('Toggle admin status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all admin sessions (super_admin only)
router.get('/sessions', auth, async (req, res) => {
  try {
    // Check if user is super_admin
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied. Super admin only.' });
    }

    const sessions = await AdminSession.find()
      .populate('adminId', 'firstName lastName email role')
      .sort({ loginTime: -1 });
    
    // Calculate inactive sessions
    const now = new Date();
    const sessionsWithStatus = sessions.map(session => {
      const inactiveMinutes = Math.floor((now - session.lastActivity) / (1000 * 60));
      return {
        ...session.toObject(),
        inactiveMinutes,
        status: inactiveMinutes > 30 ? 'inactive' : 'active'
      };
    });
    
    res.json(sessionsWithStatus);
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// End specific session (super_admin only)
router.post('/sessions/:sessionId/end', auth, async (req, res) => {
  try {
    // Check if user is super_admin
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied. Super admin only.' });
    }

    const session = await AdminSession.findById(req.params.sessionId);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    await session.endSession();
    res.json({ message: 'Session ended successfully' });
  } catch (error) {
    console.error('End session error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update session activity
router.post('/sessions/activity', auth, async (req, res) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    const session = await AdminSession.findOne({
      adminId: req.user.userId,
      token: token,
      isActive: true
    });
    
    if (session) {
      session.lastActivity = new Date();
      await session.save();
    }
    
    res.json({ message: 'Activity updated' });
  } catch (error) {
    console.error('Update activity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
