let modalLibro;

let libroEditando = null;


document.addEventListener("DOMContentLoaded", () => {

    modalLibro = new bootstrap.Modal(
        document.getElementById("modalLibro")
    );

});



async function cargarLibros() {

    try {

        const respuestaLibros = await fetch(API.libros);
        const libros = await respuestaLibros.json();


        const respuestaAutores = await fetch(API.autores);
        const autores = await respuestaAutores.json();



        let html = `


        <div class="d-flex justify-content-between align-items-center mb-3">

            <h2>Libros</h2>


            <button 
            class="btn btn-success"
            onclick="abrirModal()">

                <i class="bi bi-plus-circle"></i>
                Nuevo Libro

            </button>


        </div>



        <table class="table table-striped table-hover table-bordered">


        <thead class="table-dark">

        <tr>

            <th>ID</th>
            <th>Título</th>
            <th>Editorial</th>
            <th>Año</th>
            <th>Autor</th>
            <th>Acciones</th>


        </tr>

        </thead>


        <tbody>

        `;



        libros.forEach(libro => {


            const autor = autores.find(
                a => a.id == libro.autor_id
            );



            html += `


            <tr>

                <td>${libro.id}</td>

                <td>${libro.titulo}</td>

                <td>${libro.editorial}</td>

                <td>${libro.anio}</td>


                <td>
                    ${autor ? autor.nombre : "Sin autor"}
                </td>


                <td>


                <button 
                class="btn btn-warning btn-sm me-2"
                onclick="editarLibro(${libro.id})">

                    <i class="bi bi-pencil"></i>

                </button>



                <button 
                class="btn btn-danger btn-sm"
                onclick="eliminarLibro(${libro.id})">

                    <i class="bi bi-trash"></i>

                </button>



                </td>


            </tr>


            `;


        });



        html += `

        </tbody>

        </table>


        `;



        document.getElementById("contenido").innerHTML = html;



    } catch (error) {

        console.error(error);

        alert("Error cargando libros");

    }


}




async function abrirModal() {


    libroEditando = null;


    document.getElementById("titulo").value = "";
    document.getElementById("editorial").value = "";
    document.getElementById("anio").value = "";


    document.getElementById("tituloModal").innerText =
        "Nuevo Libro";


    document.getElementById("guardarLibro").innerText =
        "Guardar";



    await cargarAutores();


    document.getElementById("autor").value = "";


    modalLibro.show();


}




async function cargarAutores() {


    const respuesta = await fetch(API.autores);

    const autores = await respuesta.json();



    const select =
        document.getElementById("autor");



    select.innerHTML =
        '<option value="">Seleccione un autor</option>';



    autores.forEach(autor => {


        select.innerHTML += `

        <option value="${autor.id}">
            ${autor.nombre}
        </option>

        `;


    });


}







async function editarLibro(id) {



    const respuesta =
        await fetch(API.libros + "/" + id);



    const libro =
        await respuesta.json();



    libroEditando = id;



    document.getElementById("titulo").value =
        libro.titulo;


    document.getElementById("editorial").value =
        libro.editorial;


    document.getElementById("anio").value =
        libro.anio;



    await cargarAutores();



    document.getElementById("autor").value =
        libro.autor_id;



    document.getElementById("tituloModal").innerText =
        "Editar Libro";



    document.getElementById("guardarLibro").innerText =
        "Actualizar";



    modalLibro.show();



}








async function eliminarLibro(id) {

    const confirmar = confirm(
        "¿Seguro que deseas eliminar este libro?"
    );


    if (!confirmar) {
        return;
    }



    try {


        await fetch(API.libros + "/" + id, {

            method: "DELETE"

        });



        alert("Libro eliminado correctamente");


        cargarLibros();



    } catch (error) {


        console.error(error);

        alert("Error al eliminar el libro");


    }


}







document.addEventListener("click", async (e) => {


    if (e.target.id === "guardarLibro") {



        const datos = {


            titulo:
                document.getElementById("titulo").value,


            editorial:
                document.getElementById("editorial").value,


            anio:
                parseInt(document.getElementById("anio").value),



            autor_id:
                parseInt(document.getElementById("autor").value)


        };




        let url = API.libros;

        let metodo = "POST";



        if (libroEditando) {


            url += "/" + libroEditando;

            metodo = "PUT";


        }




        await fetch(url, {

            method: metodo,


            headers: {

                "Content-Type": "application/json"

            },


            body: JSON.stringify(datos)


        });



        modalLibro.hide();


        cargarLibros();


    }


});