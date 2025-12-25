import express from 'express';
// We import ALL 3 functions here
import { sendOtp, verifyOtp, getAllCitizens } from '../controllers/authController.js';

const router = express.Router();

// 1. LOGIN ROUTE (This fixes the "Failed to send OTP" error)
router.post('/send-otp', sendOtp); 

// 2. VERIFY ROUTE (This verifies the code and saves the user)
router.post('/verify-otp', verifyOtp);

// 3. ADMIN ROUTE (This lets the admin panel see the list)
router.get('/citizens', getAllCitizens); 

export default router;