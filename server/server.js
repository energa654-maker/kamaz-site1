const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();

const leadRoutes = require('./routes/leads');
const vehicleRoutes = require('./routes/vehicles');
const initDb = require('./config/initDb');

const app = express();

app.use(cors());
app.use(express.json());

// Создание таблицы при запуске
if (process.env.DATABASE_URL) {
  initDb();
}

// Статика, если открываешь сайт через Render
app.use(express.static(path.join(__dirname, '../client')));

// API
app.use('/api/leads', leadRoutes);
app.use('/api/vehicles', vehicleRoutes);

// Главная
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
