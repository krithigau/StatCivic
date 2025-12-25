import User from '../models/User.js';

// 1. Send OTP
export const sendOtp = async (req, res) => {
  const { mobileNumber } = req.body;
  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    // FIX: Ensure we always update the SAME user if duplicates exist
    // We sort by _id descending to get the newest user created
    let user = await User.findOne({ mobileNumber }).sort({ _id: -1 });

    if (!user) {
      user = new User({ mobileNumber, role: 'citizen', otp, otpExpires });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
    }
    await user.save();
    console.log(`🔐 OTP for ${mobileNumber} is: ${otp}`);

    res.status(200).json({ message: "OTP sent successfully", otp: otp });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};

// 2. Verify OTP (SUPER DEBUG VERSION)
export const verifyOtp = async (req, res) => {
  const { mobileNumber, otp } = req.body;
  try {
    // FIX: Find the NEWEST user record to avoid stale duplicate data
    const user = await User.findOne({ mobileNumber }).sort({ _id: -1 });

    if (!user) {
      console.log(`❌ User not found for: ${mobileNumber}`);
      return res.status(400).json({ message: "User not found" });
    }

    // --- DEBUG LOGS: READ THIS IN YOUR TERMINAL ---
    console.log("------------------------------------------------");
    console.log(`🔍 VERIFYING: ${mobileNumber}`);
    console.log(`📥 Input OTP: "${otp}"`);
    console.log(`💾 DB OTP:    "${user.otp}"`);
    console.log(`⏰ Expired?:  ${user.otpExpires < Date.now()}`);
    console.log("------------------------------------------------");

    if (String(user.otp) === String(otp) && user.otpExpires > Date.now()) {
      user.otp = undefined; 
      user.otpExpires = undefined;
      await user.save();
      
      console.log(`✅ Login Successful!`);
      res.status(200).json({ 
        message: "Login successful", 
        token: "dummy-jwt-token", 
        role: user.role,
        name: user.name || "Citizen" 
      });
    } else {
      console.log(`❌ Mismatch detected.`);
      res.status(400).json({ message: "Invalid or Expired OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get All Citizens
export const getAllCitizens = async (req, res) => {
  try {
    const citizens = await User.find({ role: 'citizen' });
    res.status(200).json(citizens);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};