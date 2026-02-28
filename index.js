const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (needed for the frontend to call this API)
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

/**
 * POST /webhook
 * Receives: { data: "string" }
 * Returns:  { word: ["sorted", "chars"] }
 */
app.post('/webhook', (req, res) => {
  const { data } = req.body;

  // Validate that `data` field exists and is a string
  if (typeof data !== 'string') {
    return res.status(400).json({
      error: 'Invalid request. Expected a JSON body with a "data" field containing a string.',
    });
  }

  // Convert the string into an array of individual characters
  const characters = data.split('');

  // Sort the characters alphabetically (case-insensitive, lowercase first)
  const sorted = characters.sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  // Return the sorted array as the "word" field
  return res.status(200).json({ word: sorted });
});

// Root health-check route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'String Sort API is running.' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
