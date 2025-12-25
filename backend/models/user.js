import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true, unique: true },
  role: { type: String, enum: ['citizen', 'admin'], default: 'citizen' },
  name: { type: String },
  
  // FIX: Add these two lines so the database actually saves the OTP!
  otp: { type: String },
  otpExpires: { type: Date },

  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
export default User;