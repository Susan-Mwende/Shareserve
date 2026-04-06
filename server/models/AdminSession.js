import mongoose from 'mongoose';

const adminSessionSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser',
    required: true
  },
  loginTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  logoutTime: {
    type: Date,
    default: null
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number, // in seconds
    default: null
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Method to calculate session duration
adminSessionSchema.methods.calculateDuration = function() {
  if (this.logoutTime) {
    return Math.floor((this.logoutTime - this.loginTime) / 1000); // seconds
  }
  return Math.floor((Date.now() - this.loginTime) / 1000); // seconds
};

// Method to end session
adminSessionSchema.methods.endSession = function() {
  this.logoutTime = new Date();
  this.isActive = false;
  this.duration = this.calculateDuration();
  return this.save();
};

// Index for efficient queries
adminSessionSchema.index({ adminId: 1, loginTime: -1 });
adminSessionSchema.index({ isActive: 1 });
adminSessionSchema.index({ token: 1 });

const AdminSession = mongoose.model('AdminSession', adminSessionSchema);

export default AdminSession;
