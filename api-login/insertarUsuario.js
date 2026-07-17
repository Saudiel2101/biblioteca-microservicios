const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

async function insertar() {
    const usuario = 'admin';
    const password = '123456';
    const hash = await bcrypt.hash(password, 10);
    try {
        await pool.query(
            'INSERT INTO usuarios (usuario, password_hash) VALUES ($1, $2) ON CONFLICT (usuario) DO NOTHING',
            [usuario, hash]
        );
        console.log('Usuario insertado o ya existe');
    } catch (error) {
        console.error('Error:', error);
    }
    process.exit();
}
insertar();