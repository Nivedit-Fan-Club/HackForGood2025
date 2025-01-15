require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Vercel serverless function handler
module.exports = async function handler(req, res) {
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', FRONTEND_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  console.log("I hate servers")

  // Only allow POST method
  if (req.method !== 'POST') {
    console.log("Help me")
    console.log(req.method)
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];
    res.status(200).json({ success: true, userId });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
}

