# Integraciones de pago

## Multipagos

- **Tipo de integración**: API REST + webhooks.
- **Funciones clave**:
  - Consulta de catálogo de servicios y configuración de productos (proyectos/lotes).
  - Generación de referencias de pago únicas por contrato y cuota.
  - Recepción de notificaciones en tiempo real cuando un cliente paga en canales afiliados.
  - Endpoint de conciliación diaria para cruzar pagos recibidos vs. cobrados.
- **Requerimientos técnicos**:
  - Autenticación mediante OAuth 2.0 (client credentials).
  - Validación de firmas digitales en webhooks y almacenamiento de logs.
  - Retries automáticos ante fallas de red, con backoff exponencial.
  - Almacenamiento seguro de tokens y llaves en el gestor de secretos.

## PagosNet

- **Tipo de integración**: intercambio de archivos (FTP/SFTP) y consultas API.
- **Funciones clave**:
  - Generación de archivos planos con las cuotas a cobrar (formato CSV propietario).
  - Descarga de archivos de respuesta con pagos conciliados y rechazos.
  - Consulta de estado por referencia para casos específicos.
- **Requerimientos técnicos**:
  - Programación de cron jobs para el envío y recepción diaria de archivos.
  - Validaciones previas: formato, montos, fechas de vencimiento, códigos de cliente.
  - Mapeo de códigos de error y reglas de reintento automatizadas.
  - Auditoría de todas las transferencias y retención de archivos por al menos 5 años.

## Consideraciones comunes

- Middleware de integración con capacidad de monitoreo y alertas.
- Registro centralizado de logs y dashboards de disponibilidad.
- Estrategia de fallback manual en caso de indisponibilidad de las pasarelas.
- Pruebas de extremo a extremo en entornos sandbox antes de subir a producción.
