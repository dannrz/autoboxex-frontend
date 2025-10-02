# Autoboxex Frontend
<img src="https://gearboxgo.com/_ipx/_/https:/s3.us-east-1.amazonaws.com/assets.gearboxgo.com/articles/primevue-tailwind-4.png" width="250">
<img src="https://xprimiendo.com/wp-content/uploads/2018/04/vue-js.png" width="500">
Proyecto frontend desarrollado con Vue 3, Primevue y TailwindCSS 4.

## Como levantar el proyecto
El proyecto requiere Node.JS 22.12.0 y npm 11.6.1

```sh
git init
git checkout -b <rama>
git remote add <variable_remota> <url_repo>
git pull <rama> <origen_remoto>

npm i
npm run dev
```
Es importante agregar variables de entorno para conexión a API


### Para build de producción

```sh
npm run build
```

### Correr pruebas unitarias con [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
