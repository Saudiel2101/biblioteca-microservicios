const pool = require("../db/conexion");

/*
==================================
GET TODOS
==================================
*/

const obtenerAutores = async (req, res) => {

    try {

        const resultado = await pool.query(
            "SELECT * FROM autores ORDER BY id"
        );

        res.json(resultado.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener autores"
        });

    }

};

/*
==================================
GET POR ID
==================================
*/

const obtenerAutorPorId = async (req, res) => {

    const { id } = req.params;

    try {

        const resultado = await pool.query(
            "SELECT * FROM autores WHERE id=$1",
            [id]
        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Autor no encontrado"
            });

        }

        res.json(resultado.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener autor"
        });

    }

};

/*
==================================
POST
==================================
*/

const crearAutor = async (req, res) => {

    const {

        nombre,
        nacionalidad,
        fecha_nacimiento

    } = req.body;

    try {

        const resultado = await pool.query(

            `INSERT INTO autores
            (nombre,nacionalidad,fecha_nacimiento)

            VALUES($1,$2,$3)

            RETURNING *`,

            [
                nombre,
                nacionalidad,
                fecha_nacimiento
            ]

        );

        res.status(201).json({

            mensaje: "Autor creado correctamente",

            autor: resultado.rows[0]

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            mensaje: "Error al crear autor"

        });

    }

};

/*
==================================
PUT
==================================
*/

const actualizarAutor = async (req, res) => {

    const { id } = req.params;

    const {

        nombre,
        nacionalidad,
        fecha_nacimiento

    } = req.body;

    try {

        const resultado = await pool.query(

            `UPDATE autores

            SET

            nombre=$1,

            nacionalidad=$2,

            fecha_nacimiento=$3

            WHERE id=$4

            RETURNING *`,

            [

                nombre,

                nacionalidad,

                fecha_nacimiento,

                id

            ]

        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({

                mensaje: "Autor no encontrado"

            });

        }

        res.json({

            mensaje: "Autor actualizado correctamente",

            autor: resultado.rows[0]

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            mensaje: "Error al actualizar"

        });

    }

};

/*
==================================
DELETE
==================================
*/

const eliminarAutor = async (req, res) => {

    const { id } = req.params;

    try {

        const resultado = await pool.query(

            "DELETE FROM autores WHERE id=$1 RETURNING *",

            [id]

        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({

                mensaje: "Autor no encontrado"

            });

        }

        res.json({

            mensaje: "Autor eliminado correctamente"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            mensaje: "Error al eliminar"

        });

    }

};

module.exports = {

    obtenerAutores,

    obtenerAutorPorId,

    crearAutor,

    actualizarAutor,

    eliminarAutor

};