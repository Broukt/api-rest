# API ReST de Productos - Arquitecturas de Sistemas

API ReST para la consulta de operaciones típicas CRUD de productos ficticios para la evaluación sumativa 4 del curso "Arquitecturas de Sistemas".

## Autor

**Jairo Calcina Valda - 20.734.228-9**

## Pre-requisitos

- [Node.js](https://nodejs.org/es/) (version 23.11.0)
- [Redis](https://redis.io/downloads/) (version 8)
- [Docker Engine o Docker Desktop](https://docs.docker.com/manuals/)
- [PostgreSQL](https://www.postgresql.org/download/) (version 17)

**Nota**: Redis y PostgreSQL son configurables mediante Docker sin la necesidad de la descarga cuando se trabaja en un entorno de desarrollo. Para un entorno de producción, es necesario contar con una cuenta en Redis Cloud y crear una base de datos que actue como cache, al igual que PostgreSQL en su respectivo servicio.

## Instalación y configuración

1. **Clonar el repositorio**

```bash
git clone https://github.com/Broukt/api-rest
```

2. **Ingresar al directorio del proyecto**

```bash
cd api-rest
```

3. **Instalar las dependencias**

```bash
npm install
```

4. **Crear un archivo `.env` en la raíz del proyecto y ingresar las variables de entorno**

```bash
cp .env.example .env
```

5. **Iniciar el contenedor de Docker**

```bash
docker compose up -d
```

6. **Generar cliente de prisma**

```bash
npx prisma generate
```

7. **Crear la base de datos**

```bash
npx prisma db push
```

## Ejecutar la aplicación

```bash
npm start
```

El servidor se iniciará en el puerto **3000** (o en el puerto definido en la variable de entorno `PORT`). Accede a la API mediante `http://localhost:3000`.

## Seeder

Para poblar la base de datos con datos de prueba, ejecuta el siguiente comando:

```bash
npm run seed
```

## Despliegue

Esta aplicación se encuentra desplegada con su respectiva configuración en el siguiente link:**https://api-rest-23q4.onrender.com**