const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Catch-all route to serve index.html for any other requests (useful if you ever add client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`VOTEमित्र server running on port ${PORT}`);
});
