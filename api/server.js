import express from "express";
import crypto from 'crypto';
import process from 'process';
import { Buffer } from 'buffer';
import cors from 'cors';

const app = express();
const PORT = 3001;
import dotenv from 'dotenv';

dotenv.config();

// Add middleware to parse JSON
app.use(express.json());
// CORS
app.use(cors());

const userIdHash = (userId) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API_KEY environment variable is required');
  }
  // Convert your api key to a buffer
  const key = Buffer.from(apiKey, 'utf-8');
  // Hash the message using HMAC-SHA256 and the key
  const hash = crypto.createHmac('sha256', key).update(userId).digest('hex');
  return hash;
};

app.post("/api/hash-user", (req, res) => {
  console.log("API call to hash-user");
  const { userId } = req.body;
  console.log("The userId value in the request body: ", userId);
  const hashedUserId = userIdHash(userId);
  console.log("The hashed userId value: ", hashedUserId);
  res.json({ hashedUserId });
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});