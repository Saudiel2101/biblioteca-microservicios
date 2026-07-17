document.addEventListener("DOMContentLoaded", () => {
    // Verificar si ya está logueado (por si recarga la página)
    if (localStorage.getItem('loggedIn') === 'true') {
        mostrarApp();
    } else {
        document.getElementById('loginContainer').style.display = 'block';
        document.getElementById('appContainer').style.display = 'none';
    }

    // Evento del botón login
    document.getElementById('btnLogin').addEventListener('click', async () => {
        const usuario = document.getElementById('loginUsuario').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (!usuario || !password) {
            mostrarError('Usuario y contraseña son obligatorios');
            return;
        }

        try {
            const resp = await fetch('http://172.236.251.165:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, password })
            });
            const data = await resp.json();

            if (data.success) {
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('usuario', data.usuario);
                mostrarApp();
            } else {
                mostrarError(data.message || 'Credenciales inválidas');
            }
        } catch (error) {
            console.error(error);
            mostrarError('Error de conexión con el servidor');
        }
    });

    function mostrarError(mensaje) {
        const errorDiv = document.getElementById('loginError');
        errorDiv.textContent = mensaje;
        errorDiv.classList.remove('d-none');
        setTimeout(() => errorDiv.classList.add('d-none'), 3000);
    }

    function mostrarApp() {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('appContainer').style.display = 'block';
        // Cargar la vista de inicio por defecto
        mostrarInicio();

        // Opcional: cargar los libros automáticamente
        // cargarLibros();
    }
});

// Función para mostrar el inicio
function mostrarInicio() {
    document.getElementById("contenido").innerHTML = `
        <div class="card shadow">
            <div class="card-body text-center">
                <h1>Sistema Biblioteca</h1>
                <hr>
                <p>Bienvenido, ${localStorage.getItem('usuario') || 'Usuario'}.</p>
            </div>
        </div>
    `;
}

// Eventos del menú
document.getElementById("menuLibros").addEventListener("click", (e) => {
    e.preventDefault();
    cargarLibros();
});

document.getElementById("menuAutores").addEventListener("click", (e) => {
    e.preventDefault();
    cargarAutoresVista();
});

document.getElementById("menuPrestamos").addEventListener("click", (e) => {
    e.preventDefault();
    cargarPrestamosVista();
});

document.getElementById("menuInicio").addEventListener("click", (e) => {
    e.preventDefault();
    mostrarInicio();
});

document.getElementById('btnLogin').addEventListener('click', async () => {
    const usuario = document.getElementById('loginUsuario').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!usuario || !password) {
        mostrarError('Usuario y contraseña son obligatorios');
        return;
    }

    try {
	const resp = await fetch('http://172.236.251.165:3000/login', {
   		method: 'POST',
    		headers: { 'Content-Type': 'application/json' },
    		body: JSON.stringify({ usuario, password })
	});

        const data = await resp.json();

        if (data.success === true) {  // ← Verifica que sea true
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('usuario', data.usuario);
            mostrarApp();
        } else {
            mostrarError(data.message || 'Credenciales inválidas');
        }
    } catch (error) {
        console.error(error);
        mostrarError('Error de conexión con el servidor');
    }
});
