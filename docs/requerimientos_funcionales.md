# Requerimientos funcionales

## 1. Gestión comercial

### 1.1 Captación y registro de clientes
- Registro de prospectos con datos personales, intereses y fuente de captación.
- Conversión de prospectos a clientes mediante un flujo de calificación.
- Historial de interacciones y adjuntos (documentos de identidad, constancias de ingresos, etc.).

### 1.2 Ventas al contado
- Selección de lotes disponibles desde el plano interactivo.
- Generación automática de contrato de compraventa con cláusulas configurables.
- Registro del pago y emisión inmediata de recibo con folio único.
- Integración con Multipagos/PagosNet para confirmar pagos electrónicos.

### 1.3 Ventas a plazos
- Configuración de planes de financiamiento (enganche, número de cuotas, tasas, penalidades).
- Generación de cronograma de pagos con cálculo de intereses, IVA y cargos administrativos.
- Gestión de aprobaciones (crédito interno, verificación de documentos, límites de riesgo).
- Firma digital del contrato y plan de pagos.

### 1.4 Generador de contratos
- Plantillas parametrizables por proyecto inmobiliario.
- Inclusión de anexos (planos, reglamentos internos, políticas de garantía).
- Versionado de plantillas y control de cambios.

### 1.5 Plano de disponibilidad
- Representación visual del proyecto (mapa, grid o listado con estado por lote).
- Filtros por etapa, metraje, precio, orientación y estado.
- Actualización en tiempo real al reservar o vender un lote.

### 1.6 Reversiones y transferencias
- Proceso de reversión con motivos predefinidos, cálculo de penalidades y generación de notas de crédito.
- Transferencia de titularidad con validaciones legales, autorización de gerencia y actualización de documentos.

## 2. Gestión financiera

### 2.1 Generador de planes de pago
- Cálculo de cronogramas utilizando distintos métodos (francés, alemán, cuotas fijas).
- Emisión de calendario en PDF y envío automático por correo.
- Re-cálculo ante reprogramaciones o pagos extraordinarios.

### 2.2 Reprogramación de pagos
- Solicitud del cliente con motivos y adjuntos.
- Simulación de nuevos escenarios: extensión de plazo, cambio de cuota, diferimiento de intereses.
- Workflow de aprobación (ejecutivo → supervisor → gerencia).
- Historial de reprogramaciones con trazabilidad completa.

### 2.3 Cuentas por cobrar y en mora
- Registro y clasificación de saldos por cliente, contrato y proyecto.
- Alarmas automáticas por días de mora y generación de cartas de cobranza.
- Integración con SMS/email para recordatorios y notificaciones.
- Reportes de aging y provisiones contables.

### 2.4 Generador de recibos de ingresos
- Plantillas personalizables con numeración controlada.
- Firma digital del responsable y códigos QR para validación.
- Integración con contabilidad para asientos automáticos.

### 2.5 Integraciones de pago
- Multipagos: API REST para conciliación diaria, webhooks para notificaciones en tiempo real.
- PagosNet: carga de archivos para recaudación masiva y validación de referencias.
- Manejo de reintentos, conciliación de comisiones y logs de auditoría.

## 3. Gestión de promotores y comisiones
- Registro de promotores con datos fiscales y bancarios.
- Asignación de metas mensuales y seguimiento de desempeño.
- Cálculo de comisiones según reglas configurables (porcentaje, hitos, combinaciones).
- Aprobación y liquidación de comisiones con soporte documental.

## 4. Reportes y analítica
- Dashboards interactivos con métricas clave: ventas, cartera, morosidad, comisiones.
- Reportes tabulares exportables (Excel, CSV, PDF).
- Visualizaciones gráficas (barras, líneas, pastel, mapas de calor) con filtros dinámicos.
- Programación de reportes recurrentes y distribución automática por email.

## 5. Seguridad y control interno
- Gestión de roles y permisos a nivel de módulo, acción y registro.
- Bitácora de auditoría completa con trazabilidad de cambios.
- Doble factor de autenticación y políticas de contraseñas.
- Segmentación de datos por proyecto y sucursal.
