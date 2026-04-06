import bcrypt from 'bcryptjs';

// Test the same hash generation as your auth system
const testHash = async () => {
  const password = 'admin123';
  const hash = await bcrypt.hash(password, 10);
  console.log('New hash for admin123:', hash);
  
  // Test comparison
  const isValid = await bcrypt.compare('admin123', hash);
  console.log('Hash comparison test:', isValid);
};

testHash();
