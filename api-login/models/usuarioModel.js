const pool = require('../db/conexion');

const obtenerPorUsuario = async (usuario) => {
    const result = await pool.query(
        'SELECT * FROM usuarios WHERE usuario = $1',
        [usuario]
    );
    return result.rows[0];
};

module.exports = { obtenerPorUsuario };