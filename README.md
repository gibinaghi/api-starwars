# Contenido

1. [Introducción](#introduccion)
2. [Tecnologias](#tecnologias)
3. [Instalacion](#instalacion)
4. [Ejecucion](#ejecución)
5. [Deploy local](#deploy-local)
6. [Test unitarios](#test-unitarios)
7. [Swagger](#swagger)

# Introduccion

Api StarWars BE. Su objetivo es ser una API que ingeste información de las peliculas de StarWars a la base de datos. Además permite logearse y desloguerse del sistema, crear usuarios, y realizar operaciones sobre las peliculas.

# Tecnologias

- **Framework:** NestJS
- **Lenguaje:** TypeScript
- **Base de Datos:** PostgreSQL

# Instalacion

`npm install`

# Ejecución

Local: `npm run start:local`

# Deploy local

- generar .env en base al .env.example (src/common/envs)
- tener una base de datos PostgreSQL creada
- las migraciones se corren automáticamente y se precarga la base de datos con un superadmin (emmail y pass seteados en el .env)
- utilizar el debugger de vs code y correrlo con la opción 'Debug Nest Framework' si se quieren usar breakpoints
- En caso contrario utilizar comand `npm run start:local` para levantar la aplicacion de modo local

# Test unitarios

- definir test unitarios con nomenclatura \*.spec.ts
- la configuracion de los test unitarios se hace sobre el archivo jest.config.js
- para debuggear y correr tests ejecutar sobre el 'Run and Debug' el suite 'Debug Jest unit Tests' parado sobre el test que se quiere correr. Esto permite debuggear los resultados de los tests

# Swagger

http://localhost:4080/api/v1/docs/generic#/
