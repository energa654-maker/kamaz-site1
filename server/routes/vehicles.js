const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT *
      FROM vehicles
      ORDER BY id DESC
    `);

    res.json({ data: result.rows });
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка получения техники',
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const vehicle = normalizeVehicle(req.body);

    if (!vehicle.title || !vehicle.price || !vehicle.category) {
      return res.status(400).json({
        message: 'Название, цена и категория обязательны'
      });
    }

    const result = await db.query(
      `
      INSERT INTO vehicles
      (title, price, category, description, image, images, page_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        vehicle.title,
        vehicle.price,
        vehicle.category,
        vehicle.description,
        vehicle.image,
        vehicle.images,
        vehicle.page_url
      ]
    );

    res.json({
      message: 'Техника добавлена',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка добавления техники',
      error: error.message
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = normalizeVehicle(req.body);

    if (!vehicle.title || !vehicle.price || !vehicle.category) {
      return res.status(400).json({
        message: 'Название, цена и категория обязательны'
      });
    }

    const result = await db.query(
      `
      UPDATE vehicles
      SET title = $1,
          price = $2,
          category = $3,
          description = $4,
          image = $5,
          images = $6,
          page_url = $7
      WHERE id = $8
      RETURNING *
      `,
      [
        vehicle.title,
        vehicle.price,
        vehicle.category,
        vehicle.description,
        vehicle.image,
        vehicle.images,
        vehicle.page_url,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Техника не найдена'
      });
    }

    res.json({
      message: 'Техника обновлена',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка обновления техники',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      'DELETE FROM vehicles WHERE id = $1',
      [id]
    );

    res.json({
      message: 'Техника удалена'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка удаления техники',
      error: error.message
    });
  }
});

function normalizeVehicle(body) {
  return {
    title: body.title || '',
    price: Number(body.price) || 0,
    category: body.category || '',
    description: body.description || '',
    image: body.image || '',
    images: body.images || '',
    page_url: body.page_url || ''
  };
}

module.exports = router;
