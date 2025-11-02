require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Health
app.get('/', (req, res) => res.json({ ok: true, version: '1.0' }));

// Events CRUD
const eventsRouter = require('./routes/events');
app.use('/events', eventsRouter(prisma));

// Start
app.listen(PORT, async () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  try {
    await prisma.$connect();
    console.log('Connected to database');
  } catch (err) {
    console.error('Prisma connect error', err.message);
  }
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
