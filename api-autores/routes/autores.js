const express = require('express');
const router = express.Router();
const {
    obtenerAutores,
    obtenerAutorPorId,
    crearAutor,
    actualizarAutor,
    eliminarAutor
} = require('../controllers/autoresController');

// SIN prefijo (porque ya lo pusimos en app.js)
router.get('/', obtenerAutores);
router.get('/:id', obtenerAutorPorId);
router.post('/', crearAutor);
router.put('/:id', actualizarAutor);
router.delete('/:id', eliminarAutor);

module.exports = router;
