import express from 'express';
import { mailRateLimiter, sendMail, sendOtp } from "../controllers/mail.controller.js";

const router = express.Router();

// Apply rate limiter for all mail-related routes
router.post('/send-mail', mailRateLimiter, sendMail);
router.post('/send-otp', mailRateLimiter, sendOtp);

export default router;
