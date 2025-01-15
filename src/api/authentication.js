require('dotenv').config();
const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const app = express();
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const cors = require('cors');

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userId = payload['sub'];

    res.json({ success: true, userId });

  } catch (error) {
    console.error('Error verifying token:', error);
    res.json({ success: false, message: 'Authentication failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

