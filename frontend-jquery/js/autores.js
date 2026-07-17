// autores.js

let modalAutor = null;
let autorEditando = null;

document.addEventListener("DOMContentLoaded", () => {
    modalAutor = new bootstrap.Modal(document.getElementById("modalAutor"));
});

// Cargar y mostrar la tabla de autores
async function cargarAutoresVista() {
    try {
        const resp = await fetch(API.autores);
        if (!resp.ok) throw new Error("Error al obtener autores");
        const autores = await resp.json();

        let html = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h2>Autores</h2>
                <button class="btn btn-success" onclick="abrirModalAutor()">
                    <i class="bi bi-plus-circle"></i> Nuevo Autor
                </button>
            </div>
            <table class="table table-striped table-hover table-bordered">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Nacionalidad</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        autores.forEach(autor => {
            // Formatear fecha (opcional)
            const fecha = autor.fecha_nacimiento ? new Date(autor.fecha_nacimiento).toLocaleDateString() : '';
            html += `
                <tr>
                    <td>${autor.id}</td>
                    <td>${autor.nombre}</td>
                    <td>${autor.nacionalidad || ''}</td>
                    <td>${fecha}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-2" onclick="editarAutor(${autor.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarAutor(${autor.id})">
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
        alert("Error cargando autores");
    }
}

// Abrir modal para nuevo autor
async function abrirModalAutor() {
    autorEditando = null;
    document.getElementById("nombre").value = "";
    document.getElementById("nacionalidad").value = "";
    document.getElementById("fecha_nacimiento").value = "";
    document.getElementById("tituloModalAutor").innerText = "Nuevo Autor";
    document.getElementById("guardarAutor").innerText = "Guardar";
    modalAutor.show();
}

// Editar autor: carga datos y abre modal
async function editarAutor(id) {
    try {
        const resp = await fetch(API.autores + "/" + id);
        if (!resp.ok) throw new Error("Error al obtener autor");
        const autor = await resp.json();

        autorEditando = id;
        document.getElementById("nombre").value = autor.nombre;
        document.getElementById("nacionalidad").value = autor.nacionalidad || "";
        document.getElementById("fecha_nacimiento").value = autor.fecha_nacimiento || "";
        document.getElementById("tituloModalAutor").innerText = "Editar Autor";
        document.getElementById("guardarAutor").innerText = "Actualizar";
        modalAutor.show();

    } catch (error) {
        console.error(error);
        alert("Error al cargar el autor para editar");
    }
}

// Eliminar autor con confirmación
async function eliminarAutor(id) {
    const confirmar = confirm("¿Seguro que deseas eliminar este autor?");
    if (!confirmar) return;

    try {
        const resp = await fetch(API.autores + "/" + id, { method: "DELETE" });
        if (!resp.ok) throw new Error("Error al eliminar");
        alert("Autor eliminado correctamente");
        cargarAutoresVista();
    } catch (error) {
        console.error(error);
        alert("Error al eliminar el autor");
    }
}

// Guardar o actualizar autor (escucha el botón del modal)
document.getElementById("guardarAutor").addEventListener("click", async function () {
    const datos = {
        nombre: document.getElementById("nombre").value.trim(),
        nacionalidad: document.getElementById("nacionalidad").value.trim(),
        fecha_nacimiento: document.getElementById("fecha_nacimiento").value || null
    };

    // Validación simple
    if (!datos.nombre) {
        alert("El nombre es obligatorio");
        return;
    }

    let url = API.autores;
    let metodo = "POST";

    if (autorEditando) {
        url += "/" + autorEditando;
        metodo = "PUT";
    }

    try {
        const resp = await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
        if (!resp.ok) throw new Error("Error al guardar autor");
        modalAutor.hide();
        cargarAutoresVista();
    } catch (error) {
        console.error(error);
        alert("Error al guardar el autor");
    }
});