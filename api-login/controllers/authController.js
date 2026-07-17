const bcrypt = require('bcryptjs');
const modelo = require('../models/usuarioModel');

const login = async (req, res) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({
            success: false,
            message: 'Usuario y contraseña son obligatorios'
        });
    }

    try {
        const user = await modelo.obtenerPorUsuario(usuario);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        res.json({
            success: true,
            message: 'Login exitoso',
            usuario: user.usuario
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
};

module.exports = { login };