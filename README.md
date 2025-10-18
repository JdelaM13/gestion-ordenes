#  "Organiza las órdenes"

## Descripción

Esto es un programa diseñado para gestionar órdenes de logística, utilizando una API REST.

## Características

Se pueden realizar las siguientes funciones:
- Crear órdenes
- Leer órdenes
- Modificar órdenes
- Eliminar órdenes

## Tecnologías utilizadas
- Runtime: node.js

- Librerías: 
  - mongoose
  - morgan
  - express

- Base de datos: mongodb
> NOTA: la base de datos debe estar previamente configurada.

## Cómo instalar y usar

Para instalar todas las dependencias del proyecto, se ejecuta lo siguiente:

```bash
npm install
```

Luego creamos el archivo `.env` en la raíz del proyecto de la siguiente manera:

```ini
PORT=4000 #Puerto del servicio
MONGO_URI=mongodb://<usuario>:<contraseña>@<dominio>/<nombre_de_la_base_de_datos> #Conexión de la base de datos
NODE_ENV=<entorno> #Tipo de deploy
```

Luego inicializamos el proyecto:

```bash
npm run start
```

## Intrucciones generales
### Estructura del proyecto

```
/mi-proyecto
├── app.js               # Configuración   principal del servidor
├── /models              # Modelos de datos (MongoDB)
│   └── Order.js
├── /routes              # Rutas de la API
│   └── orders.js
├── /config              # Configuración de la base de datos
│   └── db.js
└── package.json         # Dependencias y configuración del proyecto
|
└── vercel.json       
```
> NOTA: vercel.json es la configuración del deploy


## Link de Vercel
https://gestion-ordenes.vercel.app/