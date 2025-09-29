# Requerimientos funcionales

## 1. Gestión comercial

### 1.1 Captación y registro de clientes
- Registro de prospectos con datos personales, intereses y fuente de captación.
- Conversión de prospectos a clientes mediante un flujo de calificación.
- Historial de interacciones y adjuntos (documentos de identidad, constancias de ingresos, etc.).

### 1.2 Gestión de inventario y disponibilidad
- Plano interactivo que muestre jerarquía **Proyecto → Manzana → Lote** con filtros por estado, metraje, precio y avance de obra.
- Control de separación de unidades con tiempos configurables, bloqueo temporal y conversión ágil a contrato.
- Registro de obras, servicios, documentos obligatorios y porcentajes de avance/venta por proyecto para alimentar contratos y reportes.

### 1.3 Ventas al contado
- Selección de lotes disponibles desde el plano interactivo o búsqueda avanzada.
- Generación automática de contrato de compraventa con cláusulas configurables, considerando plantillas por empresa y proyecto.
- Registro del pago en PEN y emisión inmediata de recibo con folio único y numeración controlada.
- Integración con Multipagos/PagosNet para confirmar pagos electrónicos o bancarizados.

### 1.4 Ventas financiadas
- Configuración de planes de financiamiento con y sin cuota inicial, soporte para inicial cero y porcentajes mínimos/máximos.
- Selección de método de amortización (francés, alemán, japonés) y cálculo de intereses en escenarios con o sin intereses.
- Generación de cronograma de pagos con detalle de capital, interés, seguros, gastos administrativos e impuestos aplicables en Perú.
- Gestión de aprobaciones (crédito interno, verificación de documentos, límites de riesgo por empresa y proyecto).
- Firma digital del contrato y plan de pagos, con custodia de documentos conforme a la normativa local.

### 1.5 Generador de contratos
- Plantillas parametrizables por empresa y proyecto, asociadas a las obras y servicios comprometidos.
- Inclusión de anexos (planos, reglamentos internos, políticas de garantía, cronogramas de obra).
- Versionado de plantillas, bitácora de aprobaciones y control de firmas autorizadas.

### 1.6 Reversiones y transferencias
- Proceso de reversión con motivos predefinidos, cálculo de penalidades, devolución de pagos y generación de notas de crédito.
- Transferencia de titularidad con validaciones legales, autorización de gerencia y actualización automática de contratos y planes de pago.

## 2. Gestión financiera

### 2.1 Generador de planes de pago
- Cálculo de cronogramas utilizando métodos francés, alemán y japonés, con variantes con y sin intereses.
- Emisión de calendario en PDF, firma digital y envío automático por correo/SMS.
- Re-cálculo ante reprogramaciones, pagos extraordinarios o cambios de tasa.
- Inclusión de intereses moratorios automáticos según días de atraso y políticas por empresa/proyecto.

### 2.2 Reprogramación de pagos
- Solicitud del cliente con motivos y adjuntos.
- Simulación de nuevos escenarios: extensión de plazo, cambio de cuota, diferimiento de intereses.
- Workflow de aprobación (ejecutivo → supervisor → gerencia).
- Historial de reprogramaciones con trazabilidad completa.

### 2.3 Cuentas por cobrar y en mora
- Registro y clasificación de saldos por cliente, contrato y proyecto.
- Alarmas automáticas por días de mora, cálculo de intereses moratorios y generación de cartas de cobranza.
- Integración con SMS/email para recordatorios y notificaciones.
- Reportes de aging y provisiones contables.

### 2.4 Generador de recibos de ingresos
- Plantillas personalizables con numeración controlada.
- Firma digital del responsable y códigos QR para validación.
- Integración con contabilidad para asientos automáticos.
- Generación de recibos por ingresos y egresos en PEN, vinculados al flujo de caja del proyecto.

### 2.5 Integraciones de pago
- Multipagos: API REST para conciliación diaria, webhooks para notificaciones en tiempo real.
- PagosNet: carga de archivos para recaudación masiva y validación de referencias.
- Manejo de reintentos, conciliación de comisiones y logs de auditoría.

### 2.6 Flujo de caja por proyecto
- Registro de ingresos y egresos clasificados por proyecto, empresa y fase.
- Configuración de presupuestos y metas de ventas con seguimiento porcentual.
- Reportes de flujo de caja proyectado vs. real, exportables y con alertas por desviaciones.
- Integración con módulos de obra para reflejar porcentajes de avance y compromisos futuros.

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
- Reportes específicos para SUNAT/SBS, con soporte de auditoría y trazabilidad de modificaciones.

## 5. Seguridad y control interno
- Gestión de roles y permisos a nivel de módulo, acción y registro con soporte para **Super Admin**, **Admin**, **Gerente General**, **Finanzas**, **Comercial**, **Promotor** y perfiles personalizados.
- Super Admin: acceso integral al ecosistema multiempresa y configuración global.
- Admin: gestión de configuraciones y catálogos, sin acceso a operaciones transaccionales.
- Gerente General: visibilidad total de su empresa y proyectos asociados, aprobación de operaciones críticas.
- Gerencia financiera: control de flujo de caja, cuentas por cobrar/pagar y reportes financieros.
- Bitácora de auditoría completa con trazabilidad de cambios.
- Doble factor de autenticación y políticas de contraseñas.
- Segmentación de datos por empresa, proyecto y manzana, con controles de acceso dinámicos.
- Controles para cumplimiento de la Ley de Protección de Datos Personales y retención documental mínima requerida.

## 6. Gestión multiempresa y proyectos
- Creación y configuración de múltiples empresas con razón social, RUC, parámetros contables y plantillas de contrato.
- Asociación de proyectos a empresas y asignación de gerentes generales responsables.
- Configuración de manzanas y lotes por proyecto, con metadatos de dimensiones, uso, estado y precios.
- Registro de obras, servicios y entregables comprometidos por proyecto, con porcentajes de avance y ventas.
- Dashboard consolidado para comparar desempeño entre empresas, proyectos y fases.
