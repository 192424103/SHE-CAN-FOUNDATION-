import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Serve static files directly from the project root
app.use(express.static(process.cwd()));

// Fallback to index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Preview server running at http://0.0.0.0:${PORT}`);
});
