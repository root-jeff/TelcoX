# Proyecto TelcoX

## Descripción General

TelcoX es una aplicación full-stack que incluye una API Backend desarrollada con Django Rest Framework y una aplicación web Frontend construida con React. El sistema utiliza arquitecturas y tecnologías modernas para proporcionar una solución robusta y escalable.

## Estructura del Proyecto

```


TelcoX/
├── ApiTelcoX/
│   ├── api/           # Django App
│   ├── ApiTelcoX/     # Archivos principales del proyecto Django
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   ├── asgi.py
│   ├── manage.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── entrypoint.sh
│   ├── docker-compose.yml
│   └── MySql/
│       ├── data.sql
│       └── Dockerfile
│
├── Frontend/                   # Frontend - React + TypeScript
│   ├── src/
│   │   ├── api/                # Configuración de API
│   │   ├── app/                # Componentes principales
│   │   ├── global/             # Estado global y utilidades
│   │   ├── routers/            # Enrutamiento
│   │   └── security/           # Autenticación
│   └── public/                 # Archivos estáticos
└── Documentacion/              # Documentación del proyecto
```

## Tecnologías Principales

### Backend

- **Django Rest Framework**: Framework para crear APIs RESTful de manera rápida.
- **MySQL Database**: Sistema de gestión de bases de datos relacional.
- **Docker**: Contenerización del entorno para facilitar el despliegue y la ejecución.
- **JWT Authentication**: Autenticación segura mediante tokens JWT.

### Frontend

- **React 18 + TypeScript**: Biblioteca para construir interfaces de usuario interactivas y escalables con tipado estático.
- **Vite**: Herramienta de construcción y desarrollo para aplicaciones frontend.
- **Material-UI (MUI)**: Framework de componentes de diseño para React.
- **Redux Toolkit (RTK)**: Biblioteca para gestionar el estado global de la aplicación.
- **React Router v6**: Librería para manejar el enrutamiento en la aplicación.

## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos:

- **Docker y Docker Compose**: Para manejar la contenedorización del backend y la base de datos.
- **Node.js** (versión 16 o superior): Para ejecutar el frontend.
- **Python 3.8+**: Para ejecutar el backend.
- **npm** o **yarn**: Herramientas para la gestión de dependencias del frontend.

## Instalación y Configuración

### 1. Backend (API)

La API estará disponible en `http://localhost:8000`. Para configurarla y levantarla:

```bash
cd Api
docker-compose up --build
```

### 2. FronEnd

La aplicación web estará disponible en http://localhost:5173. Para configurarla y levantarla:

```bash
cd Frontend
npm install
npm run dev
```

### Características Principales
- Autenticación JWT: Seguridad mediante tokens JWT para autenticación de usuarios.
- Gestión de usuarios: Sistema de registro, inicio de sesión y gestión de usuarios.
- Sistema de facturación: Módulo para administrar facturas y pagos.
- Dashboard interactivo: Interfaz de usuario interactiva con vistas de datos en tiempo real.
- Interfaz responsive: Compatible con dispositivos móviles y de escritorio.
- Gestión de estado global con Redux: Manejo eficiente del estado global de la aplicación utilizando Redux Toolkit.
- Sistema de notificaciones: Notificaciones en tiempo real para alertar a los usuarios sobre eventos importantes.