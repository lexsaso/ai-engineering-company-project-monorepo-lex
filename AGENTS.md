# Protocolo de agentes de HealthCore

GlobalHealth Solutions es la empresa seleccionada; HealthCore es el proyecto o agente. Esta relacion fue confirmada por el desarrollador el 2026-10-23 y sustituye la interpretacion inicial de HealthCore como empresa.

## Inicio de cada sesion

1. Leer `BRIEFING.md`, `CONTEXT.md` y `CONTEXT.es.md`. Son copias sincronizadas del contexto aportado por el desarrollador para GlobalHealth Solutions y el proyecto HealthCore, no un perfil oficial verificado.
2. Leer obligatoriamente `memory-bank/projectbrief.md`, `memory-bank/techContext.md` y `memory-bank/progress.md`.
3. Leer `.agents/rules/repo-conventions.md` y los README del area afectada. Antes de preparar un commit o PR, cargar `.agents/skills/company-workflow/SKILL.md`.
4. Comprobar rama, estado de Git y diffs con y sin staging. Trabajar en `feature/*`; en otra rama detener la preparacion y pedir indicaciones, sin cambiar de rama automaticamente.

No inventar requisitos ni resultados. No sobrescribir cambios del desarrollador. El reto aportado es "Optimizacion de Diagnosticos y Seguimiento": transformacion y validacion de metricas e informes de IA frente a fragmentacion de datos sanitarios. No presentar objetivos como garantias clinicas; estandares concretos, umbrales, jurisdicciones y revision sanitaria estan pendientes.

## Flujo obligatorio antes de cada commit o PR

1. Revisar el diff de trabajo y `git diff --cached`, su coherencia con el briefing y las rutas. Identificar el candidato exacto y comprobar ausencia de secretos o datos sanitarios.
2. Ejecutar el linter definido del proyecto y paquetes afectados; registrar comandos, alcance y codigos de salida.
3. Ejecutar todos los tests definidos del monorepo, incluidos paquetes no cubiertos por el runner global; no omitir suites silenciosamente.
4. Ejecutar `npm run build` en la raiz y los builds adicionales no cubiertos por el runner; exigir salida 0.
5. Actualizar `memory-bank/progress.md` con fecha, resumen del diff probado, comandos, resultados, bloqueos y proximos pasos.
6. Revisar el diff final y staging, ejecutar `git diff --check` y revalidar cambios posteriores que afecten lo probado. No incluir archivos en staging automaticamente.

El manifest y runner raiz ya existen: ejecutar `npm run lint`, `npm test` y `npm run build`. El alcance actual son los documentos de agentes y los tipos compartidos; no existen aplicaciones frontend/backend ni una implementacion de validacion clinica. Las pruebas tecnicas no certifican conformidad medica. Si faltan controles requeridos o fallan, informar `BLOCKED` o `FAILED`, nunca `PASSED`. No crear scripts vacios para superar controles. No hacer commits ni abrir PR sin peticion explicita y sin resolver los controles requeridos.

## Protecciones

No modificar, borrar, mover ni cambiar politicas sin confirmacion explicita del desarrollador:

- `CONTEXT.md`, `CONTEXT.es.md` y `BRIEFING.md`: fuentes de negocio.
- `AGENTS.md` y `.agents/`: protocolo, reglas y skills de desarrollo.
- `.devcontainer/`, `infra/`, `.github/` y configuracion raiz de despliegue, incluido un futuro `docker-compose.yml`.
- Manifests de dependencias, lockfiles y configuracion de workspace, incluido `packages/shared/package.json`.
- `data/raw/`, `data/eval/`, archivos `.env*` y secretos: no leer ni versionar informacion sensible; solicitar un procedimiento seguro.
- Contratos en `packages/shared/types/` y esquemas en `shared/`.

La creacion inicial de estos documentos esta expresamente autorizada. La actualizacion veraz de `memory-bank/progress.md` es rutinaria; cambiar alcance, arquitectura o restricciones en el resto de la memoria requiere confirmacion. No alterar `.git/` manualmente ni revertir trabajo ajeno.

## Ubicacion

El codigo de producto nuevo se limita a `uis/website/`, `uis/backoffice/` y `services/`. Las carpetas existentes mantienen sus responsabilidades; ampliar el mapa requiere autorizacion. `memory-bank/` y `.agents/` son soporte documental autorizado, no ubicaciones de aplicaciones.
