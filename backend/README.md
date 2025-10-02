# HedraRealty API (prototipo)

Este paquete contiene un primer esqueleto de la API construida con NestJS para cubrir los
procesos clave descritos en la documentacion funcional:

- Gestion de empresas y gerentes generales.
- Configuracion de proyectos de lotizacion y sus manzanas.
- Inventario de lotes con filtros por manzana y estado comercial.
- Catalogo inicial de planes de financiamiento y control de flujo de caja.
- Generacion preliminar de contratos a partir de plantillas parametrizadas.

## Requisitos

- Node.js >= 18
- npm >= 9
- PostgreSQL 14 o superior

## Preparacion del entorno

1. Instala dependencias con `npm install`.
2. Copia `.env.example` a `.env` y ajusta las variables segun tu entorno:
   - Usa `DATABASE_URL` o los campos `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
   - En desarrollo puedes colocar `DB_SYNCHRONIZE=true` para que TypeORM cree las tablas la primera vez.
   - Mantener `DB_SYNCHRONIZE=false` en entornos compartidos o productivos y gestionar la estructura con migraciones.
3. Arranca PostgreSQL y asegurate de que la base de datos configurada exista.
4. Ejecuta `npm run start:dev` para levantar la API en `http://localhost:3000/api`.

## Comandos disponibles

```bash
npm install          # instala las dependencias
npm run start:dev    # inicia el servidor en modo desarrollo (http://localhost:3000/api)
npm run build        # compila el proyecto a JavaScript en ./dist
npm run lint         # valida reglas de estilo y calidad de codigo
```

> **Nota:** el servicio ahora persiste datos en PostgreSQL mediante TypeORM. Los datos en memoria se usaron solo
en el prototipo inicial y se mantienen como referencia en la documentacion funcional. Las siguientes iteraciones
> deberan incorporar migraciones formales y scripts de seed para poblar ambientes de prueba.
