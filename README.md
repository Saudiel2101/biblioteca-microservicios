# 📚 Biblioteca Digital - Microservicios

Sistema de gestión de biblioteca desarrollado con **arquitectura de microservicios**.  
El proyecto consta de 4 APIs independientes (Login, Libros, Autores, Préstamos) y 3 frontends (jQuery, Angular, React) que consumen estas APIs.

---

## 🚀 Tecnologías utilizadas

- **Backend**: Node.js, Express, PostgreSQL
- **Frontend jQuery**: HTML, CSS, Bootstrap, JavaScript (Fetch API)
- **Frontend Angular**: Angular 17, TypeScript, Bootstrap
- **Frontend React**: React 18, JavaScript, Bootstrap
- **Base de datos**: PostgreSQL (4 bases de datos independientes)
- **Control de versiones**: Git + GitHub

---

## 📁 Estructura del proyecto

biblioteca-microservicios/
├── api-login/ # Microservicio de autenticación (puerto 3000)
├── api-libros/ # Microservicio de libros (puerto 3001)
├── api-autores/ # Microservicio de autores (puerto 3002)
├── api-prestamos/ # Microservicio de préstamos (puerto 3003)
├── frontend-jquery/ # Cliente jQuery (puerto 5500 con Live Server)
├── frontend-angular/ # Cliente Angular (puerto 4200)
└── frontend-react/ # Cliente React (puerto 3000/3001)



---

## 🛠️ Requisitos previos

- Node.js (v16 o superior)
- PostgreSQL (v13 o superior)
- Git (opcional, para clonar el repositorio)

---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/biblioteca-microservicios.git
cd biblioteca-microservicios


## Configurar las bases de datos

CREATE DATABASE login_db;
CREATE DATABASE db_libros;
CREATE DATABASE db_autores;
CREATE DATABASE db_prestamos;

## Ejecutar cada microservicio

# Terminal 1 - Login
cd api-login
npm install
npm start   # o npm run dev

# Terminal 2 - Libros
cd api-libros
npm install
npm start

# Terminal 3 - Autores
cd api-autores
npm install
npm start

# Terminal 4 - Préstamos
cd api-prestamos
npm install
npm start
## Tecnologías utilizadas
- Node.js
- Express
- PostgreSQL
- Bootstrap 5
- jQuery, Angular, React
