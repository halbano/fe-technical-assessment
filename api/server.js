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
  return crypto.createHmac('sha256', Buffer.from(apiKey, 'utf-8')).update(userId).digest('hex');
};

app.post("/api/hash-user", (req, res) => {
  const { userId } = req.body;
  res.json({ hashedUserId: userIdHash(userId) });
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});