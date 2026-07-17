const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const prestamosRoutes = require('./routes/prestamos');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta base para préstamos
app.use('/prestamos', prestamosRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'API Préstamos funcionando' });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor en puerto ${process.env.PORT}`);
});
