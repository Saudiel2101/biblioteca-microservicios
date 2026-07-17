const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const librosRoutes = require('./routes/libros');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// IMPORTANTE: prefijo /libros
app.use('/libros', librosRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'API Libros funcionando' });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor en puerto ${process.env.PORT}`);
});
