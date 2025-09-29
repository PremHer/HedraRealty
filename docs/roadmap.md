# Roadmap de implementación

## Fase 0: Preparación (4 semanas)
- Definición de requerimientos no funcionales y políticas de seguridad alineadas a la Ley 29733 y normativa SBS.
- Selección y validación del stack React Native + Expo / NestJS + PostgreSQL, arquitectura basada en dominios.
- Configuración de entornos (desarrollo, QA, staging, producción) y pipelines CI/CD con escaneo de seguridad.
- Diseño de UX/UI inicial y prototipos de alto nivel considerando web y móvil.
- Elaboración de manuales operativos para roles (Super Admin, Admin, Gerente General, Finanzas, Comercial).

## Fase 1: MVP Comercial (12 semanas)
- Módulos: captura de clientes, configuración multiempresa/proyecto, plano de disponibilidad por manzana y lote, ventas al contado, separación de unidades, generador de contratos.
- Plantillas de contrato parametrizadas con obras/servicios y anexos.
- Integración básica con Multipagos para registrar pagos al contado.
- Dashboard inicial con métricas de ventas y reservas.
- Entrega: piloto con una empresa y un proyecto inmobiliario.

## Fase 2: Finanzas y Cobranza (14 semanas)
- Implementación de ventas financiadas con planes francés, alemán y japonés, incluyendo escenarios sin intereses e inicial cero.
- Generador de planes de pago con cálculo de intereses moratorios y reprogramaciones.
- Gestión de cuentas por cobrar, flujo de caja por proyecto y emisión de recibos.
- Integraciones completas con Multipagos y PagosNet, conciliaciones automáticas y reportes SUNAT.
- Generación de reportes tabulares exportables y tableros financieros.

## Fase 3: Control interno avanzado (10 semanas)
- Reversiones de venta y transferencias de titularidad con flujos de aprobación.
- Cálculo y liquidación de comisiones para promotores, incluyendo hitos de avance de obra.
- Bitácora de auditoría, doble factor de autenticación, segmentación por empresa/proyecto/manzana.
- Dashboards gráficos con KPIs comerciales, financieros y de avance de obras.
- Automatización de reportes regulatorios y preparación para auditorías internas/externas.

## Fase 4: Optimización y escalamiento (continuo)
- Automatización de conciliaciones contables y asientos en ERP.
- Implementación de analítica avanzada (predicción de mora, segmentación de clientes, churn).
- Integración con sistemas externos (CRM corporativo, BI enterprise, gestión de obras).
- Mejora continua basada en retroalimentación de usuarios y métricas de uso.
- Evaluaciones de seguridad periódicas y certificaciones (ISO 27001, PCI DSS si aplica).
