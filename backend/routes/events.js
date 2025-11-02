const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  // GET /events?start=&end=
  router.get('/', async (req, res) => {
    const { start, end } = req.query;
    try {
      const events = await prisma.event.findMany({
        where: {
          start: { gte: start ? new Date(start) : undefined },
          end: { lte: end ? new Date(end) : undefined }
        },
        orderBy: { start: 'asc' }
      });
      res.json(events);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });

  // GET /events/:id
  router.get('/:id', async (req, res) => {
    try {
      const event = await prisma.event.findUnique({ where: { id: Number(req.params.id) } });
      if (!event) return res.status(404).json({ error: 'Not found' });
      res.json(event);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch event' });
    }
  });

  // POST /events
  router.post('/', async (req, res) => {
    const { title, description, start, end, color } = req.body;
    try {
      const ev = await prisma.event.create({
        data: {
          title,
          description: description || '',
          start: new Date(start),
          end: new Date(end),
          color: color || '#1976d2'
        }
      });
      res.status(201).json(ev);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create event' });
    }
  });

  // PUT /events/:id
  router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { title, description, start, end, color } = req.body;
    try {
      const ev = await prisma.event.update({
        where: { id },
        data: {
          title,
          description,
          start: new Date(start),
          end: new Date(end),
          color
        }
      });
      res.json(ev);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update event' });
    }
  });

  // DELETE /events/:id
  router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
      await prisma.event.delete({ where: { id } });
      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete event' });
    }
  });

  return router;
};
