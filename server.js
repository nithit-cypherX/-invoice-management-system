import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// --- Static File Serving ---
// Serve files from your 'dist' folder (where compiled TS/JS will go)
app.use(express.static(path.join(__dirname, 'dist')));
// Serve assets like images or CSS from 'src/html/assets'
app.use('/assets', express.static(path.join(__dirname, 'src', 'html', 'assets')));


// --- Page Routing ---
// Each app.get() call defines a route for a specific page

// Route for the root URL ('/') to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'html', 'index.html'));
});

// Route for '/login' to serve login.html
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'html', 'login.html'));
});

// Route for '/invoice' to serve invoice.html
app.get('/invoice', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'html', 'invoice.html'));
});

// Route for '/create-invoice' to serve create_invoice.html
app.get('/create-invoice', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'html', 'create_invoice.html'));
});


app.listen(PORT, () => {
  console.log(`🚀 Server with routing is running at http://localhost:${PORT}`);
});
