const pool = require("../db/conexion");

// Obtener todos los libros
const obtenerLibros = async (req, res) => {

    try {

        const resultado = await pool.query(
            "SELECT * FROM libros ORDER BY id"
        );

        res.json(resultado.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener los libros"
        });

    }

};

// Obtener un libro por ID
const obtenerLibroPorId = async (req, res) => {

    const { id } = req.params;

    try {

        const resultado = await pool.query(
            "SELECT * FROM libros WHERE id = $1",
            [id]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Libro no encontrado"
            });

        }

        res.json(resultado.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener el libro"
        });

    }

};

// Crear libro
const crearLibro = async (req, res) => {

    const { titulo, editorial, anio, autor_id } = req.body;

    try {

        const resultado = await pool.query(
            `INSERT INTO libros
            (titulo, editorial, anio, autor_id)
            VALUES ($1,$2,$3,$4)
            RETURNING *`,
            [titulo, editorial, anio, autor_id]
        );

        res.status(201).json({
            mensaje: "Libro creado correctamente",
            libro: resultado.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al crear el libro"
        });

    }

};


// Actualizar libro
const actualizarLibro = async (req, res) => {

    const { id } = req.params;
    const { titulo, editorial, anio, autor_id } = req.body;

    try {

        const resultado = await pool.query(
            `UPDATE libros
             SET titulo=$1,
                 editorial=$2,
                 anio=$3,
                 autor_id=$4
             WHERE id=$5
             RETURNING *`,
            [titulo, editorial, anio, autor_id, id]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Libro no encontrado"
            });

        }

        res.json({
            mensaje: "Libro actualizado correctamente",
            libro: resultado.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar"
        });

    }

};

// Eliminar libro
const eliminarLibro = async (req, res) => {

    const { id } = req.params;

    try {

        const resultado = await pool.query(
            "DELETE FROM libros WHERE id=$1 RETURNING *",
            [id]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Libro no encontrado"
            });

        }

        res.json({
            mensaje: "Libro eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al eliminar"
        });

    }

};

module.exports = {
    obtenerLibros,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
};