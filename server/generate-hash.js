import bcrypt from 'bcryptjs';

const generateHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}`);
    return hash;
  } catch (error) {
    console.error('Error generating hash:', error);
  }
};

// Generate hash for "admin123"
generateHash('admin123');
