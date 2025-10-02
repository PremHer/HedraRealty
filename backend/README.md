# HedraRealty API (prototipo)

Este paquete contiene un primer esqueleto de la API construida con NestJS para cubrir los
procesos clave descritos en la documentación funcional:

- Gestión de empresas y gerentes generales.
- Configuración de proyectos de lotización y sus manzanas.
- Inventario de lotes con filtros por manzana y estado comercial.
- Catálogo inicial de planes de financiamiento y control de flujo de caja.
- Generación preliminar de contratos a partir de plantillas parametrizadas.

## Requisitos

- Node.js >= 18
- npm >= 9

## Comandos disponibles

```bash
npm install          # instala las dependencias
npm run start:dev    # inicia el servidor en modo desarrollo (http://localhost:3000/api)
npm run build        # compila el proyecto a JavaScript en ./dist
npm run lint         # valida reglas de estilo y calidad de código
```

> **Nota:** el servicio utiliza datos en memoria a modo de _seed_ para facilitar las pruebas
> tempranas. Debe reemplazarse por persistencia real (PostgreSQL) en siguientes iteraciones.
