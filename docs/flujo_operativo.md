# Flujos operativos

## 1. Configuración inicial multiempresa

1. **Alta de empresa**: Super Admin registra razón social, RUC, parámetros contables y políticas de seguridad.
2. **Creación de proyectos**: Admin asocia cada proyecto a una empresa, define gerente general responsable y carga información de obras, servicios y documentos requeridos.
3. **Carga de manzanas y lotes**: importación masiva con metadatos (área, precio, estado, restricciones) y georreferenciación opcional.
4. **Definición de plantillas**: generación de plantillas de contrato, anexos y políticas de financiamiento por empresa/proyecto.
5. **Asignación de roles**: configuración de usuarios internos con permisos segmentados por empresa, proyecto y manzana.

## 2. Venta a plazos

1. **Prospección**: el promotor registra al prospecto y lo asocia a un proyecto.
2. **Reserva**: selección del lote desde el plano de disponibilidad y bloqueo temporal.
3. **Evaluación**: recopilación de documentos, scoring interno, evaluación de riesgo y elección del método (francés, alemán, japonés) con o sin intereses.
4. **Generación de contrato**: selección de plantilla, parametrización de cláusulas, anexos de obras/servicios y firma electrónica.
5. **Plan de pagos**: cálculo del cronograma, emisión del documento en PEN y envío al cliente.
6. **Cobro inicial**: registro de cuota inicial (o inicial cero), emisión de recibo y conciliación automática si es pago electrónico.
7. **Seguimiento**: monitoreo de cuotas, cálculo de intereses moratorios, envíos de recordatorios y gestión de mora.
8. **Liquidación**: generación del finiquito, actualización de titularidad y liberación del lote.

## 3. Reprogramación de pagos

1. **Solicitud del cliente**: ingreso desde portal o por ejecutivo, detallando motivo y adjuntos.
2. **Análisis**: simulación de nuevos escenarios y verificación de historial de pagos.
3. **Aprobación**: flujo escalonado con notificaciones y registro en bitácora.
4. **Actualización**: regeneración del plan de pagos, notificación al cliente y ajuste contable.

## 4. Reversión de venta

1. **Solicitud**: iniciada por el área comercial o financiera con motivo y evidencias.
2. **Cálculo de penalidades**: aplicación de políticas internas y condiciones del contrato.
3. **Autorización**: aprobación por gerencia, generación de nota de crédito y actualización del inventario.
4. **Notificación**: envío de comunicación formal al cliente y registro en bitácora.

## 5. Generación de comisiones

1. **Identificación de contratos cerrados** en el período.
2. **Aplicación de reglas** de comisiones (porcentaje base, bonos, escalas).
3. **Validación** por supervisor y ajustes manuales justificados.
4. **Aprobación y pago**: integración con finanzas para la liquidación y emisión de comprobantes.

## 6. Integración con pasarelas

1. **Creación de referencia** al generar la cuota o contrato.
2. **Pago del cliente** en Multipagos/PagosNet.
3. **Recepción de notificación** (webhook o archivo) y validación de integridad.
4. **Aplicación del pago** en el sistema, emisión de recibo y actualización de estado.
5. **Conciliación** diaria y reporte de diferencias para seguimiento.

## 7. Flujo de caja por proyecto

1. **Registro de ingresos y egresos**: el área financiera clasifica cada movimiento por empresa, proyecto, manzana y contrato (si aplica).
2. **Conciliación automática**: integración con PagosNet/Multipagos y bancos para actualizar saldos.
3. **Proyecciones**: generación de flujo de caja proyectado combinando cronogramas de pago, compromisos de obra y egresos programados.
4. **Alertas**: notificaciones por desviaciones significativas vs. presupuesto y escalamiento a gerencia.
5. **Reportes regulatorios**: emisión de reportes SUNAT/SBS y tableros ejecutivos.
