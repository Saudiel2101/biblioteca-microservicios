// prestamos.js

let modalPrestamo = null;
let prestamoEditando = null;

document.addEventListener("DOMContentLoaded", () => {
    modalPrestamo = new bootstrap.Modal(document.getElementById("modalPrestamo"));
});

// Cargar y mostrar la tabla de préstamos
async function cargarPrestamosVista() {
    try {
        const respPrestamos = await fetch(API.prestamos);
        if (!respPrestamos.ok) throw new Error("Error al obtener préstamos");
        const prestamos = await respPrestamos.json();

        // También obtenemos los libros para mostrar el título en lugar del ID
        const respLibros = await fetch(API.libros);
        const libros = respLibros.ok ? await respLibros.json() : [];

        let html = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h2>Préstamos</h2>
                <button class="btn btn-success" onclick="abrirModalPrestamo()">
                    <i class="bi bi-plus-circle"></i> Nuevo Préstamo
                </button>
            </div>
            <table class="table table-striped table-hover table-bordered">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Libro</th>
                        <th>Usuario</th>
                        <th>Fecha Préstamo</th>
                        <th>Fecha Devolución</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        prestamos.forEach(prestamo => {
            // Buscar el libro correspondiente
            const libro = libros.find(l => l.id === prestamo.libro_id);
            const tituloLibro = libro ? libro.titulo : 'Desconocido';
            // Formatear fechas (opcional)
            const fechaPrestamo = prestamo.fecha_prestamo ? new Date(prestamo.fecha_prestamo).toLocaleDateString() : '';
            const fechaDevolucion = prestamo.fecha_devolucion ? new Date(prestamo.fecha_devolucion).toLocaleDateString() : '';

            html += `
                <tr>
                    <td>${prestamo.id}</td>
                    <td>${tituloLibro}</td>
                    <td>${prestamo.usuario}</td>
                    <td>${fechaPrestamo}</td>
                    <td>${fechaDevolucion}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-2" onclick="editarPrestamo(${prestamo.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarPrestamo(${prestamo.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `</tbody></table>`;
        document.getElementById("contenido").innerHTML = html;

    } catch (error) {
        console.error(error);
        alert("Error cargando préstamos");
    }
}

// Función para cargar los libros en el select del modal
async function cargarLibrosEnSelect() {
    try {
        const resp = await fetch(API.libros);
        if (!resp.ok) throw new Error("Error al obtener libros");
        const libros = await resp.json();
        const select = document.getElementById("libro_id");
        select.innerHTML = '<option value="">Seleccione un libro</option>';
        libros.forEach(libro => {
            select.innerHTML += `<option value="${libro.id}">${libro.titulo}</option>`;
        });
    } catch (error) {
        console.error(error);
        document.getElementById("libro_id").innerHTML = '<option value="">Error al cargar libros</option>';
    }
}

// Abrir modal para nuevo préstamo
async function abrirModalPrestamo() {
    prestamoEditando = null;
    document.getElementById("tituloModalPrestamo").innerText = "Nuevo Préstamo";
    document.getElementById("guardarPrestamo").innerText = "Guardar";
    // Limpiar campos
    document.getElementById("usuario").value = "";
    // Fecha préstamo: hoy por defecto
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById("fecha_prestamo").value = hoy;
    document.getElementById("fecha_devolucion").value = "";
    // Cargar libros en el select
    await cargarLibrosEnSelect();
    document.getElementById("libro_id").value = "";
    modalPrestamo.show();
}

// Editar préstamo: carga datos y abre modal
async function editarPrestamo(id) {
    try {
        const resp = await fetch(API.prestamos + "/" + id);
        if (!resp.ok) throw new Error("Error al obtener préstamo");
        const prestamo = await resp.json();

        prestamoEditando = id;
        document.getElementById("tituloModalPrestamo").innerText = "Editar Préstamo";
        document.getElementById("guardarPrestamo").innerText = "Actualizar";
        // Cargar libros en el select
        await cargarLibrosEnSelect();
        document.getElementById("libro_id").value = prestamo.libro_id;
        document.getElementById("usuario").value = prestamo.usuario;
        document.getElementById("fecha_prestamo").value = prestamo.fecha_prestamo ? prestamo.fecha_prestamo.split('T')[0] : '';
        document.getElementById("fecha_devolucion").value = prestamo.fecha_devolucion ? prestamo.fecha_devolucion.split('T')[0] : '';
        modalPrestamo.show();

    } catch (error) {
        console.error(error);
        alert("Error al cargar el préstamo para editar");
    }
}

// Eliminar préstamo con confirmación
async function eliminarPrestamo(id) {
    const confirmar = confirm("¿Seguro que deseas eliminar este préstamo?");
    if (!confirmar) return;

    try {
        const resp = await fetch(API.prestamos + "/" + id, { method: "DELETE" });
        if (!resp.ok) throw new Error("Error al eliminar");
        alert("Préstamo eliminado correctamente");
        cargarPrestamosVista();
    } catch (error) {
        console.error(error);
        alert("Error al eliminar el préstamo");
    }
}

// Guardar o actualizar préstamo
document.getElementById("guardarPrestamo").addEventListener("click", async function () {
    const libro_id = parseInt(document.getElementById("libro_id").value);
    const usuario = document.getElementById("usuario").value.trim();
    const fecha_prestamo = document.getElementById("fecha_prestamo").value;
    const fecha_devolucion = document.getElementById("fecha_devolucion").value || null;

    // Validación simple
    if (!libro_id || !usuario || !fecha_prestamo) {
        alert("Libro, usuario y fecha de préstamo son obligatorios");
        return;
    }

    const datos = {
        libro_id,
        usuario,
        fecha_prestamo,
        fecha_devolucion
    };

    let url = API.prestamos;
    let metodo = "POST";

    if (prestamoEditando) {
        url += "/" + prestamoEditando;
        metodo = "PUT";
    }

    try {
        const resp = await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
        if (!resp.ok) throw new Error("Error al guardar préstamo");
        modalPrestamo.hide();
        cargarPrestamosVista();
    } catch (error) {
        console.error(error);
        alert("Error al guardar el préstamo");
    }
});