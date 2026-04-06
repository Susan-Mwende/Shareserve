import mongoose from "mongoose";

const testConnection = async () => {
  try {
    console.log("Testing MongoDB connection...");
    console.log("URI:", process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected Successfully!");
    
    // Test a simple query
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("✅ Available collections:", collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log("✅ Test completed");
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  }
};

testConnection();
