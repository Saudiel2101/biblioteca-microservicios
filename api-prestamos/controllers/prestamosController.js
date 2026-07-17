const pool = require("../db/conexion");

const obtenerPrestamos = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM prestamos ORDER BY id");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener préstamos" });
    }
};

const obtenerPrestamoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM prestamos WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: "Préstamo no encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener el préstamo" });
    }
};

const crearPrestamo = async (req, res) => {
  const { libro_id, usuario, fecha_prestamo, fecha_devolucion } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO prestamos (libro_id, usuario, fecha_prestamo, fecha_devolucion)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [libro_id, usuario, fecha_prestamo, fecha_devolucion]
    );
    res.status(201).json({ mensaje: "Préstamo creado", prestamo: result.rows[0] });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear" });
  }
};

const actualizarPrestamo = async (req, res) => {
  const { id } = req.params;
  const { libro_id, usuario, fecha_prestamo, fecha_devolucion } = req.body;
  try {
    const result = await pool.query(
      `UPDATE prestamos SET libro_id=$1, usuario=$2, fecha_prestamo=$3, fecha_devolucion=$4
       WHERE id=$5 RETURNING *`,
      [libro_id, usuario, fecha_prestamo, fecha_devolucion, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Actualizado", prestamo: result.rows[0] });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar" });
  }
};

const eliminarPrestamo = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM prestamos WHERE id=$1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: "Préstamo no encontrado" });
        }
        res.json({ mensaje: "Préstamo eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar" });
    }
};

module.exports = {
    obtenerPrestamos,
    obtenerPrestamoPorId,
    crearPrestamo,
    actualizarPrestamo,
    eliminarPrestamo
};
