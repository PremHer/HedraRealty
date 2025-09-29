# HedraRealty

HedraRealty es un sistema integral de control interno para inmobiliarias especializado en la comercialización de lotes de terreno. Este repositorio contiene la documentación funcional inicial para construir una plataforma robusta similar a soluciones líderes del mercado como GoSoft Realty, con soporte para ventas al contado y a plazos, automatización administrativa y reportes gerenciales.

## Mapa de módulos principales

| Área | Submódulos clave |
| --- | --- |
| Gestión comercial | Ventas al contado, ventas a plazos, separación de unidades, generador de contratos, generador de planes de pago, reversión de ventas |
| Gestión de inmuebles | Plano de disponibilidad por manzana y lote, transferencia de titularidad |
| Administración financiera | Reprogramación de pagos, generador de recibos, cuentas por cobrar, cuentas en mora con intereses moratorios, integración con pasarelas de pago, flujo de caja por proyecto |
| Gestión de capital humano | Comisiones para promotores |
| Analítica y reportes | Dashboards, reportes tabulares, reportes gráficos |

## Documentación

Toda la documentación funcional y técnica se encuentra en la carpeta [`docs/`](docs/README.md).

## Stack tecnológico recomendado

Para asegurar experiencias consistentes en web y móvil sin duplicar esfuerzos de desarrollo, se propone una arquitectura basada en **React Native + Expo** con soporte para **React Native Web**. El backend se implementaría con **Node.js (NestJS)** sobre **TypeScript**, APIs REST/GraphQL seguras mediante OAuth2/OIDC, y base de datos **PostgreSQL** con cifrado de datos sensibles. La infraestructura se orquesta en **Kubernetes** (GKE/AKS) siguiendo buenas prácticas de CI/CD (GitHub Actions), pruebas automatizadas, escaneo de vulnerabilidades (Snyk, OWASP ZAP) y observabilidad (OpenTelemetry + Grafana). Este stack permite cumplir estándares modernos de calidad, seguridad y escalabilidad, manteniendo compliance regulatorio peruano y manejo nativo de la divisa PEN.

## Próximos pasos sugeridos

1. Definir los requerimientos no funcionales (escalabilidad, seguridad, compliance) para guiar las decisiones tecnológicas.
2. Priorizar los módulos críticos para construir un MVP y establecer un roadmap iterativo.
3. Seleccionar el stack tecnológico acorde al contexto de la empresa (web, móvil, nube, on-premise).
4. Implementar procesos de QA, monitoreo y soporte antes del despliegue en producción.
