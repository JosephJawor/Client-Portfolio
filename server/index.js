
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sql from 'mssql';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// SQL Server connection configuration
let pool = null;

// Build config based on authentication type
const sqlConfig = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'PortfolioDB',
  options: {
    encrypt: true,
    trustServerCertificate: true, // For local development
  },
};

// Use Windows Authentication if no user/password provided, otherwise SQL Auth
if (process.env.DB_USER && process.env.DB_PASSWORD) {
  sqlConfig.user = process.env.DB_USER;
  sqlConfig.password = process.env.DB_PASSWORD;
} else {
  // Windows Authentication
  sqlConfig.options.trustedConnection = true;
}

// Connect to SQL Server
async function connectToDatabase() {
  try {
    pool = await sql.connect(sqlConfig);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.log('SQL Server not available, using in-memory storage:', err.message);
    pool = null;
  }
}
connectToDatabase();

// In-memory storage for contact submissions when DB is not available
const contactSubmissions = [];

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required.' });
  }
  try {
    if (pool) {
      await pool.request()
        .input('name', sql.VarChar(100), name)
        .input('email', sql.VarChar(100), email)
        .input('message', sql.Text, message)
        .query('INSERT INTO contact_submissions (name, email, message) VALUES (@name, @email, @message)');
    } else {
      // Stores in memory when DB is not available
      contactSubmissions.push({ name, email, message, timestamp: new Date() });
      console.log('Contact submission stored in memory:', { name, email });
    }
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error.' });
  }
});


// NHS Digital API integration
app.get('/api/news', async (req, res) => {
  try {
    // NHS England (includes NHS Digital updates) press office RSS feed
    // Using a stable RSS endpoint avoids website-specific paths that may 404
    const nhsRssUrl = 'https://www.england.nhs.uk/feed/';

    const fetchImpl = globalThis.fetch
      ? globalThis.fetch
      : (await import('node-fetch')).default;

    const rssRes = await fetchImpl(nhsRssUrl, {
      headers: {
        'User-Agent': 'portfolio-poc/0.1 (+localhost)',
        Accept: 'application/rss+xml, application/xml;q=0.9, */*;q=0.8',
      },
    });

    if (!rssRes.ok) {
      return res.status(502).json({ error: `NHS RSS request failed (${rssRes.status})` });
    }
    const rssText = await rssRes.text();
    // Simple RSS to JSON conversion (headline, link, pubDate)
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(rssText))) {
      const itemXml = match[1];
      const title = (itemXml.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
      const link = (itemXml.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '';
      const pubDate = (itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '';
      items.push({ title, link, pubDate });
    }
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json({ articles: items });
  } catch (err) {
    console.error('Failed to fetch NHS Digital RSS:', err);
    res.status(500).json({ error: 'Failed to fetch NHS Digital news.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
