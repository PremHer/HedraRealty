# Arquitectura tecnológica recomendada

## Principios rectores
- **Experiencia unificada web/móvil**: reutilizar el mismo código base gracias a React Native con soporte para web, asegurando despliegues consistentes y manteniendo costos de mantenimiento bajos.
- **Seguridad desde el diseño**: aplicar OWASP ASVS, cifrado en tránsito y en reposo, controles de acceso basados en roles y segregación por empresa/proyecto.
- **Calidad continua**: pipelines CI/CD con pruebas automáticas (unitarias, integración, end-to-end), análisis estático, escaneo de dependencias y cobertura mínima del 80%.
- **Escalabilidad y resiliencia**: arquitectura modular orientada a servicios y despliegues containerizados que soporten incrementos de demanda.
- **Cumplimiento normativo peruano**: soporte para Soles (PEN), retenciones e impuestos locales, conservación de registros conforme a SUNAT y SBS cuando aplique.

## Frontend
- **Framework principal**: React Native + Expo Router.
- **Compatibilidad web**: React Native Web para exponer la misma base de componentes en navegadores modernos.
- **State management**: Zustand o Redux Toolkit para flujos complejos; React Query para sincronización con APIs.
- **UI/UX**: Design System corporativo implementado con Tamagui o Native Base para componentes accesibles.
- **Internacionalización**: i18next con soporte inicial para español peruano y extensible a otros idiomas.
- **Testing**: Jest, React Native Testing Library y Playwright para pruebas end-to-end sobre web.

## Backend
- **Lenguaje y framework**: TypeScript con NestJS, arquitectura hexagonal y módulos independientes por dominio (ventas, cobranza, inventario, integraciones).
- **APIs**: REST y GraphQL, versionadas y documentadas en OpenAPI/Swagger, protegidas con OAuth2/OIDC (Keycloak o Auth0) y soporte para MFA.
- **Base de datos**: PostgreSQL 15 con particionamiento por empresa y cifrado transparente; Redis para caché y colas ligeras.
- **Mensajería**: Apache Kafka o Google Pub/Sub para eventos (pagos, cambios de estado de lotes, notificaciones).
- **Integraciones**: Microservicio dedicado a recaudación que gestione Multipagos y PagosNet con colas de compensación y conciliación diaria.

## Infraestructura
- **Contenedores**: Imágenes Docker firmadas (Sigstore) y escaneadas antes del despliegue.
- **Orquestación**: Kubernetes (GKE/AKS) con autoscaling horizontal, políticas de red (Calico) y secretos administrados (HashiCorp Vault o Secret Manager).
- **Observabilidad**: Prometheus + Grafana, logs estructurados en ELK/Cloud Logging, trazas con OpenTelemetry.
- **Respaldo y recuperación**: políticas de backup incremental, pruebas de restauración trimestrales y RPO/RTO definidos por nivel de servicio.
- **CDN y WAF**: uso de CloudFront/Azure Front Door con Web Application Firewall para proteger aplicaciones públicas.

## Seguridad y cumplimiento
- Gestión de identidades federada con MFA obligatorio para roles privilegiados.
- Cifrado AES-256 para datos sensibles (documentos, contratos) y tokenización de información crítica.
- Auditoría completa mediante bitácora inviolable y retención mínima de 10 años para documentos contractuales.
- Evaluaciones periódicas de seguridad (OWASP ZAP, SAST/DAST) y pruebas de penetración semestrales.
- Cumplimiento de la Ley de Protección de Datos Personales peruana (Ley N° 29733) y normativa SBS para operaciones de financiamiento.

## Calidad y DevOps
- Pipeline GitHub Actions con etapas: lint, pruebas, build, seguridad, despliegue controlado.
- Estrategia GitFlow con entornos diferenciados (dev, QA, staging, producción).
- Feature flags gestionados con LaunchDarkly/Unleash para habilitar gradualmente nuevos módulos.
- Monitoreo de experiencia digital (RUM) y encuestas NPS integradas en la app para retroalimentación continua.
- Documentación técnica en repositorios dedicados (Storybook, Swagger UI, diagramas C4 actualizados).
