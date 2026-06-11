# Sistema de Compras y Ventas — Microservicios

Sistema de gestión de compras, ventas e inventario construido con arquitectura de microservicios en .NET 8, comunicación por eventos (RabbitMQ) y frontend en React.

## Arquitectura

El sistema está compuesto por 4 microservicios independientes, un API Gateway y un frontend:

- **Productos** — catálogo de productos (CRUD).
- **Compras** — registro de compras. Publica el evento `CompraRegistrada`.
- **Ventas** — registro de ventas. Valida stock contra Movimientos y publica `VentaRegistrada`.
- **Movimientos** — fuente de verdad del stock (entradas y salidas). Consume los eventos de compra y venta.
- **Gateway (YARP)** — punto único de entrada que enruta a cada microservicio.
- **Frontend (React + Vite + Tailwind)** — interfaz con las vistas de compra, venta y kardex.

Cada microservicio sigue Clean Architecture (API, Application, Domain, Infrastructure) y tiene su propia base de datos.

## Tecnologías

- .NET 8 (ASP.NET Core Web API)
- Entity Framework Core 8 (SQL Server)
- JWT (autenticación, token de 30 min)
- RabbitMQ + MassTransit (eventos / Saga)
- YARP (API Gateway)
- React + Vite + Tailwind CSS
- Docker (SQL Server y RabbitMQ)

## Requisitos previos

- .NET 8 SDK
- Node.js 18+
- Docker Desktop

## Cómo levantar el proyecto

### 1. Infraestructura (SQL Server + RabbitMQ)

Desde la raíz del proyecto:

\`\`\`bash
docker compose up -d
\`\`\`

Esto levanta SQL Server (puerto 1433) y RabbitMQ (panel en http://localhost:15672, usuario/clave: guest/guest).

### 2. Crear las bases de datos

Cada microservicio tiene su propia base. Aplica las migraciones en cada uno:

\`\`\`bash
cd Productos
dotnet ef database update --project Productos.Infrastructure --startup-project Productos.API

cd ../Movimientos
dotnet ef database update --project Movimientos.Infrastructure --startup-project Movimientos.API

cd ../Compras
dotnet ef database update --project Compras.Infrastructure --startup-project Compras.API

cd ../Ventas
dotnet ef database update --project Ventas.Infrastructure --startup-project Ventas.API
\`\`\`

### 3. Levantar los microservicios

Cada uno en una terminal distinta:

\`\`\`bash
cd Productos    && dotnet run --project Productos.API
cd Movimientos  && dotnet run --project Movimientos.API
cd Compras      && dotnet run --project Compras.API
cd Ventas       && dotnet run --project Ventas.API
cd Gateway      && dotnet run --project Gateway.API
\`\`\`

### 4. Levantar el frontend

\`\`\`bash
cd Frontend
npm install
npm run dev
\`\`\`

El frontend queda en http://localhost:5173

## Acceso

Usuario: \`admin\` — Contraseña: \`123456\`

## Documentación de la API

Cada microservicio expone Swagger en su raíz (ej: http://localhost:5201/swagger). El API Gateway corre en http://localhost:5000 y enruta así:

- \`/productos/...\` → Productos
- \`/compras/...\` → Compras
- \`/ventas/...\` → Ventas
- \`/movimientos/...\` → Movimientos

## Flujo de negocio

- **Compra:** registra la compra → actualiza costo y precio del producto (precio = costo × 1.35) → genera movimiento de Entrada (sube stock).
- **Venta:** valida que haya stock suficiente → registra la venta → genera movimiento de Salida (baja stock).
- **Kardex:** muestra el stock actual de cada producto (calculado como entradas − salidas) y su historial de movimientos.

## Scripts de base de datos

La carpeta \`database/\` contiene los scripts SQL de creación y CRUD de cada microservicio.