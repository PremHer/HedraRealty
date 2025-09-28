# Lineamientos de modelado de datos

## Entidades principales

| Entidad | Descripción | Relaciones clave |
| --- | --- | --- |
| `Proyecto` | Desarrollo inmobiliario con fases y lotes asociados. | 1:N con `Lote`, 1:N con `Contrato`. |
| `Lote` | Unidad inmobiliaria con características físicas y estado comercial. | N:1 con `Proyecto`, 1:N con `Reserva`, 1:N con `Contrato`. |
| `Cliente` | Persona natural o jurídica que adquiere un lote. | 1:N con `Contrato`, 1:N con `Pago`, 1:N con `SolicitudReprogramacion`. |
| `Contrato` | Acuerdo de compraventa que puede ser al contado o financiado. | N:1 con `Cliente`, N:1 con `Lote`, 1:N con `PlanPago`, 1:N con `Recibo`. |
| `PlanPago` | Cronograma de cuotas generadas a partir del contrato. | N:1 con `Contrato`, 1:N con `Cuota`. |
| `Cuota` | Pago programado con fecha de vencimiento, monto e intereses. | N:1 con `PlanPago`, 1:N con `Pago`, 1:N con `ReprogramacionCuota`. |
| `Pago` | Registro de abonos realizados por el cliente. | N:1 con `Cuota`, N:1 con `Cliente`, N:1 con `MedioPago`. |
| `Recibo` | Documento generado para un pago recibido. | N:1 con `Pago`, N:1 con `Usuario`. |
| `Reversion` | Operación que cancela una venta o contrato. | N:1 con `Contrato`, N:1 con `Usuario`. |
| `TransferenciaTitularidad` | Cambio de titular para un contrato activo. | N:1 con `Contrato`, N:1 con `Cliente` (nuevo titular). |
| `Promotor` | Ejecutivo responsable de la venta. | 1:N con `Contrato`, 1:N con `Comision`. |
| `Comision` | Cálculo y liquidación de comisiones para promotores. | N:1 con `Promotor`, N:1 con `Contrato`. |
| `Usuario` | Usuario interno con roles y permisos definidos. | 1:N con `Recibo`, 1:N con `BitacoraAuditoria`. |
| `BitacoraAuditoria` | Registro de acciones realizadas en el sistema. | N:1 con `Usuario`, opcional N:1 con cualquier entidad auditada. |

## Consideraciones de diseño

1. **Normalización**: mantener al menos 3NF para evitar redundancias, especialmente en entidades transaccionales como `Pago` y `Cuota`.
2. **Históricos**: conservar versiones históricas de contratos, plantillas y tablas maestras mediante entidades de vigencia (`vigente_desde`, `vigente_hasta`).
3. **Seguridad**: utilizar *row-level security* para segmentar datos por proyecto y sucursal.
4. **Trazabilidad**: todas las entidades críticas deben enlazarse a `BitacoraAuditoria` para registrar altas, bajas y modificaciones.
5. **Integraciones**: almacenar referencias externas (IDs de Multipagos/PagosNet) para facilitar conciliaciones.
6. **Reportabilidad**: crear *data marts* o vistas materializadas para KPIs de ventas, cartera y comisiones, optimizando consultas pesadas.

## Diagramas recomendados

- **ERD lógico**: para mapear entidades, atributos y relaciones cardinales.
- **Diagramas de secuencia**: para mostrar interacción entre módulos y servicios externos durante cobros e integraciones.
- **Data flow diagrams**: para representar el flujo de información entre sistemas internos y pasarelas.
