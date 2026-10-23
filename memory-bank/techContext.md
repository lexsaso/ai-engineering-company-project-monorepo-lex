# Contexto tecnico

## Stack y evidencia

- [BRIEFING.md](../BRIEFING.md) recoge el contexto del desarrollador: GlobalHealth Solutions es la empresa y HealthCore el proyecto. El reto es transformar y validar metricas e informes de IA para abordar la fragmentacion de datos sanitarios; no prescribe tecnologias ni identifica estandares concretos.
- [README.es.md](../README.es.md) describe la plantilla inicial y recomienda un backend FastAPI centralizado. No hay una API implementada. El runner raiz ya existe y el protocolo distingue los controles de infraestructura de la validacion clinica pendiente.
- [packages/shared/package.json](../packages/shared/package.json) declara `@repo/shared-types`, con tipos TypeScript compartidos y sin scripts.
- [.devcontainer/devcontainer.json](../.devcontainer/devcontainer.json) contempla herramientas JavaScript y Python; eso no confirma el stack de producto.
- Framework frontend, base de datos, autenticacion, integraciones y despliegue: pendientes de aprobacion.
- [package.json](../package.json) configura npm workspaces para el paquete compartido existente, TypeScript, ESLint, markdownlint y pruebas nativas de Node.js. [package-lock.json](../package-lock.json) fija las dependencias; usar Node.js 22.13 o superior y `npm ci` para instalarlas.

## Arquitectura y restricciones

| Ruta de producto  | Responsabilidad prevista               |
| ----------------- | -------------------------------------- |
| `uis/website/`    | Sitio publico.                         |
| `uis/backoffice/` | Interfaz interna de operaciones.       |
| `services/`       | API centralizada y workers necesarios. |

No son aplicaciones ya creadas. No crear arboles paralelos como `apps/`, `frontend/` o `backend/`.
Mantener las carpetas existentes de la plantilla y leer sus README antes de intervenir. `memory-bank/` y `.agents/` son excepciones autorizadas para soporte documental, nunca para alojar aplicaciones.
`.agents/skills/` contiene procedimientos del agente de desarrollo; `skills/` conserva las capacidades de los agentes del producto.
No incluir datos reales de pacientes ni secretos en ejemplos, memoria o commits. Los paises de operacion y requisitos de privacidad de GlobalHealth Solutions no estan confirmados; no heredar los de la empresa de ejemplo anterior. Definir estandares, criterios y umbrales de validacion, datos autorizados y revision sanitaria antes de implementar o afirmar conformidad clinica.

## Verificacion vigente

El alcance aprobado por el desarrollador es verificar la infraestructura existente, sin crear aplicaciones:

- `npm run lint`: ESLint para JavaScript/TypeScript y markdownlint para las fuentes de contexto y los documentos de soporte del agente.
- `npm test`: cinco pruebas de Node.js sobre documentos, sincronizacion de las tres fuentes, identidad de empresa y proyecto, enlaces, protocolo y YAML de la skill, ademas de comprobaciones compilables del contrato TypeScript existente.
- `npm run build`: compilacion real de las declaraciones de `packages/shared/types/` en `.build/shared/`, sin modificar los contratos fuente.
- `npm audit`: control adicional de dependencias de desarrollo. Quedan cuatro alertas bajas transitivas vinculadas a KaTeX; no se ha forzado una version fuera del rango declarado por su consumidor ni degradado el linter para ocultarlas.

La infraestructura tiene verificaciones tecnicas, no suites de frontend o backend: no hay aplicaciones implementadas y los ejemplos Python no tienen suites configuradas. Incorporar controles reales al runner cuando se implementen esos componentes. Los controles actuales verifican coherencia con el contexto aportado, no autenticidad de un perfil corporativo, funcionalidad clinica ni cumplimiento de estandares aun sin identificar.

Ver [scripts/README.md](../scripts/README.md) para instalacion y alcance. `node_modules/` y `.build/` estan excluidos de Git. El contexto ya no es un placeholder, pero procede del desarrollador y no permite declarar certificacion medica ni una mision corporativa oficial verificada. Los resultados de cada ejecucion se registran en [progress.md](progress.md).
