# Requerimientos no funcionales

## 1. Rendimiento y escalabilidad
- **Tiempo de respuesta**: operaciones críticas (consulta de plano de disponibilidad, generación de contratos, registro de pagos) deben responder en <500 ms en el 95.º percentil bajo carga nominal.
- **Escalabilidad horizontal**: servicios containerizados con *auto-scaling* para duplicar capacidad en <5 minutos frente a picos estacionales de ventas.
- **Gestión de carga**: uso de CDN/WAF para distribuir contenido estático, *rate limiting* adaptable por empresa y colas asíncronas para procesos intensivos (generación de contratos, conciliaciones).
- **Pruebas de desempeño**: ejecuciones trimestrales de *load testing* y *stress testing* con métricas de CPU, memoria y tiempos de respuesta integradas a observabilidad.

## 2. Disponibilidad y continuidad
- **SLA objetivo**: 99.5% de disponibilidad mensual para módulos transaccionales y 99.9% para pasarelas de pago.
- **Recuperación ante desastres**: RPO ≤ 15 minutos y RTO ≤ 2 horas con réplicas en otra región (Perú/Latam) y ejercicios de conmutación semestrales.
- **Backups**: respaldos incrementales diarios y completos semanales, cifrados, con pruebas de restauración documentadas.
- **Operación 24/7**: monitoreo proactivo con alertas automáticas (PagerDuty/Opsgenie) y runbooks para incidentes críticos.

## 3. Seguridad y cumplimiento
- **Gobierno de identidades**: adopción de OAuth2/OIDC, MFA obligatorio para roles privilegiados, ciclo de vida de usuarios automatizado y revisiones trimestrales de accesos.
- **Protección de datos**: cifrado TLS 1.3 en tránsito, AES-256 en reposo, tokenización de datos sensibles y segregación por empresa/proyecto usando *row-level security*.
- **DevSecOps**: análisis SAST/DAST en cada pipeline, escaneo de dependencias (Snyk/OWASP Dependency-Check), gestión de secretos centralizada (Vault/Secret Manager) y política de parches ≤ 15 días.
- **Cumplimiento normativo peruano**: alineamiento con Ley N.º 29733 (protección de datos personales), regulaciones SBS para financiamiento y obligaciones SUNAT para retención y emisión electrónica.
- **Auditoría y trazabilidad**: bitácora inmutable de eventos, conservación mínima de 10 años para contratos y planes de pago, firma digital con sellado de tiempo peruano.

## 4. Calidad y mantenibilidad
- **Cobertura de pruebas**: ≥80% en componentes críticos; suites automatizadas (unitarias, integración, end-to-end) ejecutadas en cada *pull request*.
- **Estándares de código**: linters obligatorios (ESLint, Prettier) y revisiones por pares con reglas de calidad definidas.
- **Documentación viva**: actualización continua de diagramas C4, ERD y guías de operación; documentación de APIs en OpenAPI sincronizada con releases.
- **Observabilidad**: métricas, logs y trazas centralizados; tableros de SLOs con alertas basadas en error budgets.
- **Feature flags y despliegues seguros**: uso de *blue/green* o *canary releases*, *feature toggles* y mecanismos de *rollback* automatizados.

## 5. Experiencia de usuario
- **Accesibilidad**: cumplimiento de WCAG 2.1 AA en web y componentes móviles accesibles (soporte de *screen readers*, tamaños de fuente configurables).
- **Internacionalización**: localización inicial en español peruano, soporte para formatos de fecha/número PEN y adaptación futura a otros idiomas.
- **Consistencia omnicanal**: paridad funcional entre web y móvil con diseño responsivo, modo offline para consultas de inventario y sincronización cuando se recupere la conectividad.
- **Soporte multicliente**: capacidad de personalizar branding por empresa sin afectar la base de código compartida.

## 6. Gobernanza y cumplimiento operativo
- **Gestión de proveedores**: contratos de SLA documentados con Multipagos, PagosNet y proveedores de nube, revisados anualmente.
- **Gestión de cambios**: proceso ITIL/Agile con aprobaciones electrónicas, bitácora de despliegues y ventanas de mantenimiento comunicadas con 72 h de anticipación.
- **Privacidad por diseño**: evaluación de impacto de privacidad (PIA) para nuevos módulos y anonimización de datos en ambientes no productivos.
- **Capacitación continua**: programas semestrales de concientización en seguridad y actualizaciones sobre normativa peruana para usuarios internos.
