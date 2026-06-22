const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT *
      FROM leads
      ORDER BY created_at DESC
    `);

    res.json({
      data: result.rows
    });
  } catch (error) {
    console.log('GET LEADS ERROR:', error.message);
    res.status(500).json({
      message: 'PostgreSQL error while loading leads'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, phone, comment } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        message: 'Name and phone are required'
      });
    }

    const result = await db.query(
      `
      INSERT INTO leads (name, phone, comment, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        name,
        phone,
        comment || '',
        'new'
      ]
    );

    res.json({
      message: 'Lead saved to PostgreSQL',
      data: result.rows[0]
    });
  } catch (error) {
    console.log('CREATE LEAD ERROR:', error.message);
    res.status(500).json({
      message: 'PostgreSQL error while saving lead'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      'DELETE FROM leads WHERE id = $1',
      [id]
    );

    res.json({
      message: 'Lead deleted'
    });
  } catch (error) {
    console.log('DELETE LEAD ERROR:', error.message);
    res.status(500).json({
      message: 'PostgreSQL error while deleting lead'
    });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await db.query(
      `
      UPDATE leads
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id]
    );

    res.json({
      message: 'Status updated',
      data: result.rows[0]
    });
  } catch (error) {
    console.log('UPDATE STATUS ERROR:', error.message);
    res.status(500).json({
      message: 'PostgreSQL error while updating lead status'
    });
  }
});

module.exports = router;
