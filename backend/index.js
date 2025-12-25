import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Importing StatCivic modular routes
import authRoutes from './routes/authRoutes.js'; 
import grievanceRoutes from './routes/grievanceRoutes.js'; 

dotenv.config(); 

const app = express();

// Middleware to parse incoming data
app.use(cors());
app.use(express.json()); 

// Mounting Routes
// http://localhost:3000/api/auth/verify-otp
// http://localhost:3000/api/auth/citizens
app.use('/api/auth', authRoutes); 

// http://localhost:3000/api/grievances
app.use('/api/grievances', grievanceRoutes); 

// Database Connection using your verified .env variable
const MONGO_URI = process.env.MONGO_URI; 

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in your .env file!");
} else {
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log("------------------------------------------");
      console.log("✅ StatCivic Database: Connected Successfully");
      console.log("------------------------------------------");
    })
    .catch(err => {
      console.error("❌ MongoDB Connection Error:", err.message);
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 StatCivic Backend Server is Live on Port ${PORT}`);
});