import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

// Create an express app
const app = express();

// Config 
dotenv.config();

// Middlewares
app.use (express.json());
app.use(cors());

// Load environment variables
const PORT = process.env.PORT
const token = process.env.TOKEN  
const list_id = process.env.LIST_ID

// Test endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST /register endpoint
app.post('/register', async (req, res) => {
  try {
    // Extract parameters from req.body
    const { email, firstName, lastName } = req.body;
     
    // Klaviyo API endpoint and options for creating profile
    const profileUrl = 'https://a.klaviyo.com/api/profiles/';
    const profileOptions = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        revision: '2024-02-15',
        'content-type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email,
            first_name: firstName,
            last_name: lastName,
          }
        }
      })
    };

    // Fetch and create profile
    const profileResponse = await fetch(profileUrl, profileOptions);
    const profileData = await profileResponse.json();
    
    // Check for errors in profile creation
    if(profileData.errors) {
      throw new Error(profileData.errors[0].detail);
    }
     
    // Klaviyo API endpoint and options for adding profile to list
    const listUrl = `https://a.klaviyo.com/api/lists/${list_id}/relationships/profiles/`;
    const listOptions = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        revision: '2024-02-15',
        'content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ data: [{ type: 'profile', id: profileData.data.id }] })
    };

    // Fetch and add profile to list
    const listResponse = await fetch(listUrl, listOptions);
   
    // Send response
    res.json({ success: true, profileData, listResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
