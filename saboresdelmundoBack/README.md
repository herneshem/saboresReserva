# Sabores del Mundo - API backend

API REST para crear y administrar reservas del restaurante. La API permite crear reservas públicamente y protege la consulta y actualización de reservas con autenticación de administrador.

## Tecnologías

- **Node.js** y **JavaScript** (módulos CommonJS)
- **Express 5** para el servidor y las rutas HTTP
- **PostgreSQL**, conectado mediante `pg`
- **bcryptjs** para comprobar la contraseña de administrador usando un hash
- **jsonwebtoken (JWT)** para autenticar las peticiones protegidas
- **dotenv** para cargar la configuración desde `.env`
- **cors** para habilitar solicitudes de origen cruzado

## Requisitos

- Node.js y npm
- Una base de datos PostgreSQL accesible y con la tabla `reservas` creada

## Configuración y ejecución

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea un archivo `.env` en esta carpeta con la configuración de PostgreSQL y autenticación:

   ```env
   DB_USER=usuario_postgres
   DB_HOST=localhost
   DB_NAME=saboresdelmundo
   DB_PASSWORD=contraseña_postgres
   ADMIN_USER=admin
   ADMIN_PASSWORD_HASH=hash_bcrypt_de_la_contraseña_de_demo
   JWT_SECRET=una_clave_secreta_larga_y_aleatoria
   ```

   `ADMIN_PASSWORD_HASH` debe contener un hash bcrypt, no la contraseña en texto plano. Para generar el hash de la contraseña de demostración:

   ```bash
   node -e "require('bcryptjs').hash('adminSabores', 10).then(console.log)"
   ```

   Mantén `.env` fuera del control de versiones y no uses estas credenciales de demostración en producción.

3. Inicia el servidor:

   ```bash
   node server.js
   ```

   El servidor escucha en el puerto `3000`.

## Rutas principales

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| `POST` | `/api/auth/login` | Público | Inicia sesión. Recibe `usuario` y `password`; devuelve un JWT válido durante 2 horas. |
| `POST` | `/api/reservas` | Público | Crea una reserva. |
| `GET` | `/api/reservas` | Administrador | Devuelve las reservas. Requiere un JWT en el encabezado `Authorization` con esquema Bearer. |
| `PATCH` | `/api/reservas/:id/estado` | Administrador | Cambia el estado de una reserva. Requiere el mismo encabezado de autorización. |

Los estados permitidos para una reserva son `pendiente`, `confirmada` y `rechazada`.

### Ejemplo de inicio de sesión

```http
POST /api/auth/login
Content-Type: application/json

{
  "usuario": "admin",
  "password": "adminSabores"
}
```

La respuesta correcta contiene un token:

```json
{
  "token": "<jwt>"
}
```

## Credenciales de muestra

El archivo [credenciales-demo.txt](./credenciales-demo.txt) contiene las credenciales de acceso de demostración. Son únicamente para pruebas locales o una presentación; cambia la contraseña y el secreto JWT antes de desplegar la aplicación públicamente.
