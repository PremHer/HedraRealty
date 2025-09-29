# Lineamientos de modelado de datos

## Entidades principales

| Entidad | Descripción | Relaciones clave |
| --- | --- | --- |
| `Empresa` | Compañía inmobiliaria con configuración fiscal y operativa propia. | 1:N con `Proyecto`, 1:N con `Usuario`, 1:N con `PlantillaContrato`. |
| `Proyecto` | Desarrollo inmobiliario con fases, obras y lotes asociados. | N:1 con `Empresa`, 1:N con `Manzana`, 1:N con `Contrato`, 1:N con `IngresoEgreso`. |
| `Manzana` | Agrupador de lotes dentro de un proyecto. | N:1 con `Proyecto`, 1:N con `Lote`. |
| `Lote` | Unidad inmobiliaria con características físicas y estado comercial. | N:1 con `Manzana`, N:1 con `Proyecto`, 1:N con `Reserva`, 1:N con `Contrato`. |
| `Cliente` | Persona natural o jurídica que adquiere un lote. | 1:N con `Contrato`, 1:N con `Pago`, 1:N con `SolicitudReprogramacion`. |
| `Contrato` | Acuerdo de compraventa que puede ser al contado o financiado. | N:1 con `Cliente`, N:1 con `Lote`, N:1 con `Proyecto`, 1:N con `PlanPago`, 1:N con `Recibo`. |
| `PlanPago` | Cronograma de cuotas generadas a partir del contrato (francés, alemán, japonés). | N:1 con `Contrato`, 1:N con `Cuota`. |
| `Cuota` | Pago programado con fecha de vencimiento, monto, intereses y moras. | N:1 con `PlanPago`, 1:N con `Pago`, 1:N con `ReprogramacionCuota`, 1:N con `InteresMora`. |
| `Pago` | Registro de abonos realizados por el cliente. | N:1 con `Cuota`, N:1 con `Cliente`, N:1 con `MedioPago`. |
| `Recibo` | Documento generado para un pago recibido. | N:1 con `Pago`, N:1 con `Usuario`. |
| `Reversion` | Operación que cancela una venta o contrato. | N:1 con `Contrato`, N:1 con `Usuario`. |
| `TransferenciaTitularidad` | Cambio de titular para un contrato activo. | N:1 con `Contrato`, N:1 con `Cliente` (nuevo titular). |
| `Promotor` | Ejecutivo responsable de la venta. | 1:N con `Contrato`, 1:N con `Comision`. |
| `Comision` | Cálculo y liquidación de comisiones para promotores. | N:1 con `Promotor`, N:1 con `Contrato`. |
| `Usuario` | Usuario interno con roles y permisos definidos. | N:1 con `Empresa`, 1:N con `Recibo`, 1:N con `BitacoraAuditoria`. |
| `BitacoraAuditoria` | Registro de acciones realizadas en el sistema. | N:1 con `Usuario`, opcional N:1 con cualquier entidad auditada. |
| `IngresoEgreso` | Movimientos financieros asociados a proyectos. | N:1 con `Proyecto`, N:1 con `Usuario`, N:1 con `Contrato` (opcional). |
| `PlantillaContrato` | Configuración de cláusulas y anexos por empresa/proyecto. | N:1 con `Empresa`, 1:N con `Contrato`. |
| `InteresMora` | Registro del cálculo de intereses moratorios. | N:1 con `Cuota`, N:1 con `PoliticaMora`. |
| `PoliticaMora` | Tabla de políticas de mora diferenciadas por empresa/proyecto. | N:1 con `Empresa`, N:1 con `Proyecto`. |

## Jerarquía territorial y comercial

- Las consultas deben respetar la jerarquía `Empresa → Proyecto → Manzana → Lote` para garantizar segmentación de datos y reportes.
- Utilizar claves compuestas o surrogate keys con referencias externas para asegurar integridad y facilitar integraciones con catastros municipales.

## Consideraciones de diseño

1. **Normalización**: mantener al menos 3NF para evitar redundancias, especialmente en entidades transaccionales como `Pago` y `Cuota`.
2. **Históricos**: conservar versiones históricas de contratos, plantillas y tablas maestras mediante entidades de vigencia (`vigente_desde`, `vigente_hasta`).
3. **Seguridad**: utilizar *row-level security* para segmentar datos por empresa, proyecto y manzana.
4. **Trazabilidad**: todas las entidades críticas deben enlazarse a `BitacoraAuditoria` para registrar altas, bajas y modificaciones.
5. **Integraciones**: almacenar referencias externas (IDs de Multipagos/PagosNet) para facilitar conciliaciones y conciliación bancaria peruana (CCI, códigos interbancarios).
6. **Reportabilidad**: crear *data marts* o vistas materializadas para KPIs de ventas, cartera, flujo de caja y comisiones, optimizando consultas pesadas.
7. **Financiamiento flexible**: parametrizar tasas, métodos de amortización, periodos de gracia y penalidades para soportar los diferentes planes ofrecidos.

## Diagramas recomendados

- **ERD lógico**: para mapear entidades, atributos y relaciones cardinales.
- **Diagramas de secuencia**: para mostrar interacción entre módulos y servicios externos durante cobros e integraciones.
- **Data flow diagrams**: para representar el flujo de información entre sistemas internos y pasarelas.
