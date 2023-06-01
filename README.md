# Giticket
[https://aleesmp-giticket.netlify.app](https://aleesmp-giticket.netlify.app)

Este documento te ayudará a preparar el entorno de desarrollo de este proyecto, el cual utiliza Vue 3 y Vite.

## Instalación del proyecto

```sh
npm install
```

## Configuración del proyecto

```sh
cp .env.example .env.local
```
Una vez creado el fichero de entorno `.env.local`, tenemos que añadir los valores a cada una de las claves personales.

### Compilar y recargar en tiempo real en Desarrollo

```sh
npm run dev
```

### Compilar y minificar para Producción

```sh
npm run build
```

### Publicación de los cambios en Netlify
Una vez los cambios de la rama `master` se guardan en el repositorio de Github, automáticamente se publican en Netlify.