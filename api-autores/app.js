const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const autoresRoutes = require('./routes/autores');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta base para autores
app.use('/autores', autoresRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'API Autores funcionando' });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor en puerto ${process.env.PORT}`);
});
