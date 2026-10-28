# Sabores del Mundo

Aplicacion web para consultar el restaurante, explorar su menu y realizar reservas. Incluye una zona de administracion para gestionar reservas.

## Tecnologias

### Frontend

- Angular 19 y TypeScript 5.
- HTML y CSS para la interfaz.
- Angular Router para la navegacion.
- Formularios de Angular (reactivos y basados en `FormsModule`).
- `HttpClient` y RxJS para comunicarse con la API.
- Karma y Jasmine para las pruebas unitarias.

### Backend

El backend se encuentra en la carpeta `../saboresdelmundoBack` y utiliza:

- Node.js con Express 5 para la API REST.
- PostgreSQL y el paquete `pg` para el acceso a datos.
- `jsonwebtoken` para tokens de autenticacion.
- `bcryptjs` para el manejo de contrasenas.
- `dotenv` para la configuracion mediante variables de entorno.
- `cors` para permitir solicitudes desde el frontend.

## Funcionalidades

- Paginas de inicio, menu y acerca del restaurante.
- Formulario para solicitar una reserva.
- Inicio de sesion de administracion.
- Acceso a la pagina de reservas de administracion protegido por un guard de Angular.

## Requisitos

- Node.js y npm.
- El backend y PostgreSQL configurados y en ejecucion para que funcionen el inicio de sesion y las reservas.

El frontend envia solicitudes a `http://localhost:3000/api/auth/login` para iniciar sesion y a `http://localhost:3000/api/reservas` para crear reservas.

## Instalacion y ejecucion del frontend

Desde esta carpeta:

```bash
npm install
npm start
```

Abre `http://localhost:4200` en el navegador. El backend debe estar disponible en `http://localhost:3000` para las funciones que dependen de la API.

## Compilacion y pruebas

```bash
npm run build
npm test
```

## Credenciales de demostracion

Las credenciales de muestra se encuentran en [`CREDENCIALES_DEMO.txt`](./CREDENCIALES_DEMO.txt). El backend debe tener configurado ese usuario y esa contrasena para que el inicio de sesion funcione.

**Aviso:** estas credenciales son solo para demostraciones locales. No las uses en produccion ni en un servicio accesible publicamente. El archivo de texto contiene la contrasena en texto plano; evita publicarlo o subirlo a repositorios compartidos.
