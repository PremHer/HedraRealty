# Flujos operativos

## 1. Venta a plazos

1. **Prospección**: el promotor registra al prospecto y lo asocia a un proyecto.
2. **Reserva**: selección del lote desde el plano de disponibilidad y bloqueo temporal.
3. **Evaluación**: recopilación de documentos, scoring interno y aprobación de crédito.
4. **Generación de contrato**: selección de plantilla, parametrización de cláusulas y firma electrónica.
5. **Plan de pagos**: cálculo del cronograma, emisión de documento y envío al cliente.
6. **Cobro inicial**: registro del enganche y emisión del recibo; conciliación automática si es pago electrónico.
7. **Seguimiento**: monitoreo de cuotas, envíos de recordatorios y gestión de mora.
8. **Liquidación**: generación del finiquito, actualización de titularidad y liberación del lote.

## 2. Reprogramación de pagos

1. **Solicitud del cliente**: ingreso desde portal o por ejecutivo, detallando motivo y adjuntos.
2. **Análisis**: simulación de nuevos escenarios y verificación de historial de pagos.
3. **Aprobación**: flujo escalonado con notificaciones y registro en bitácora.
4. **Actualización**: regeneración del plan de pagos, notificación al cliente y ajuste contable.

## 3. Reversión de venta

1. **Solicitud**: iniciada por el área comercial o financiera con motivo y evidencias.
2. **Cálculo de penalidades**: aplicación de políticas internas y condiciones del contrato.
3. **Autorización**: aprobación por gerencia, generación de nota de crédito y actualización del inventario.
4. **Notificación**: envío de comunicación formal al cliente y registro en bitácora.

## 4. Generación de comisiones

1. **Identificación de contratos cerrados** en el período.
2. **Aplicación de reglas** de comisiones (porcentaje base, bonos, escalas).
3. **Validación** por supervisor y ajustes manuales justificados.
4. **Aprobación y pago**: integración con finanzas para la liquidación y emisión de comprobantes.

## 5. Integración con pasarelas

1. **Creación de referencia** al generar la cuota o contrato.
2. **Pago del cliente** en Multipagos/PagosNet.
3. **Recepción de notificación** (webhook o archivo) y validación de integridad.
4. **Aplicación del pago** en el sistema, emisión de recibo y actualización de estado.
5. **Conciliación** diaria y reporte de diferencias para seguimiento.
