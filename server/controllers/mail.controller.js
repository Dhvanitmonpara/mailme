import rateLimit from 'express-rate-limit';
import { asyncHandler } from "../utils/asyncHandler.js";
import mailHandler from "../utils/sendMail.js";

// Rate limiter middleware: max 10 requests per second
const mailRateLimiter = rateLimit({
  windowMs: 1000, // 1 second window
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    message: "Too many requests. Please try again later.",
  },
  headers: true, // optional: include rate limit info in headers
});

const generateOtp = (length = 6) => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

const sendMail = asyncHandler(async (req, res) => {
  const { from, to, subject, text, html } = req.body;

  if (!to || !from || !subject || !text || !html) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const mailResponse = await mailHandler(from, to, subject, text, html);

  if (!mailResponse.success) {
    return res.status(500).json({
      message: mailResponse.error || "Failed to send Mail",
    });
  }

  return res.status(200).json({
    messageId: mailResponse.messageId,
    message: "mail sent successfully",
  });
});

const sendOtp = asyncHandler(async (req, res) => {
  const { from, to, subject, text, html, otpLength = 6 } = req.body;

  const otp = generateOtp(otpLength);

  html.replace("{{otp}}", otp);

  const mailResponse = await mailHandler(from, to, subject, text, html);

  if (!mailResponse.success) {
    return res.status(500).json({
      message: mailResponse.error || "Failed to send Mail",
      error: mailResponse
    });
  }

  return res.status(200).json({
    messageId: mailResponse.messageId,
    message: "mail sent successfully",
    otp
  });
});

// Apply rate limiter to these routes
export { mailRateLimiter, sendMail, sendOtp };
