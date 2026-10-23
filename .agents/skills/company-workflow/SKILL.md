---
name: company-workflow
description: "Verifica cambios del proyecto HealthCore de GlobalHealth Solutions antes de un commit o Pull Request: rama feature, rutas, lint, tests, build y banco de memoria. Usar al preparar o revisar una entrega."
---

# Verificacion previa a commit o PR

## Objetivo unico

Determinar de forma trazable si el diff candidato cumple los controles previos a un commit o PR. Esta skill no crea commits ni abre PR.

## Inputs obligatorios

- Rama obtenida con `git branch --show-current`: debe cumplir `feature/*` con nombre no vacio.
- `git status --short --untracked-files=all`, `git diff` y `git diff --cached`, incluidos nombres y destinos de renombres. Sin staging no existe candidato a commit.
- Desde la raiz: `BRIEFING.md`, `CONTEXT.md`, `CONTEXT.es.md`, los tres archivos de `memory-bank/`, `AGENTS.md` y `.agents/rules/repo-conventions.md`.
- Manifests, README y CI existentes que definan comandos reales y alcance de lint, tests y build.

## Procedimiento

1. Leer inputs y verificar la rama. Si no es `feature/*`, detener la preparacion y comunicar el bloqueo; no cambiar ramas automaticamente.
2. Revisar diff completo, candidato y archivos nuevos sin staging. El codigo de producto debe estar solo en `uis/website/`, `uis/backoffice/` o `services/`. `memory-bank/`, `.agents/`, `BRIEFING.md` y `AGENTS.md` son excepciones documentales autorizadas, no ubicaciones para aplicaciones. Respetar protecciones y no borrar la plantilla.
3. Contrastar el diff con las tres fuentes sincronizadas: GlobalHealth Solutions es la empresa y HealthCore el proyecto. El contexto procede del desarrollador, no de un perfil oficial verificado. No trasladar paises de la plantilla anterior ni presentar objetivos de validacion de metricas e informes como garantias clinicas. Registrar limites y bloquear cambios dependientes de estandares o criterios no confirmados.
4. Ejecutar el linter real del proyecto y paquetes afectados. Si falta configuracion, informar `BLOCKED`, sin instalar herramientas ni inventar comandos.
5. Ejecutar todos los tests definidos del monorepo, incluidos paquetes no cubiertos por el runner. Registrar comandos y salidas: fallos son `FAILED`; suites requeridas ausentes son `BLOCKED`.
6. Ejecutar `npm run build` en la raiz y builds adicionales requeridos; exigir salida 0. Manifest o script ausente implica `BLOCKED`, nunca `PASSED`.
7. Actualizar `memory-bank/progress.md` con fecha, resumen del diff probado, comandos, codigos de salida, bloqueos y proximos pasos. Comprobar whitespace, enlaces y documentos nuevos.
8. Revisar el staging final sin alterarlo automaticamente, ejecutar `git diff --check` y repetir controles afectados por cambios posteriores. Comunicar el resultado sin hacer commit ni abrir PR.

## Criterios de aceptacion verificables

- [ ] Rama `feature/*` y candidato en staging identificados; sin candidato no declarar lista la entrega.
- [ ] Ningun archivo nuevo de codigo de producto fuera de las tres rutas; excepciones documentales sin aplicaciones.
- [ ] Coherencia con el contexto confirmado y las protecciones del protocolo.
- [ ] Linter definido terminado con salida 0.
- [ ] Todos los tests del monorepo terminados con salida 0, sin suites requeridas omitidas.
- [ ] `npm run build` y builds adicionales terminados con salida 0 sin errores sintacticos.
- [ ] `memory-bank/progress.md` actualizado con fecha, diff resumido y resultados reales.
- [ ] Diff final sin errores de whitespace y dentro del alcance verificado.

## Informe de salida

Emitir los siguientes estados solo si los controles correspondientes se aprobaron realmente:

```text
Lint: PASSED
Build & Tests: PASSED
Coherencia de carpetas: PASSED
Memory Bank: UPDATED
```

En otro caso sustituir el estado afectado por `FAILED` o `BLOCKED`, con causa, comandos y codigos de salida. El runner raiz existe y verifica documentos y tipos compartidos; no certifica aplicaciones inexistentes ni conformidad clinica. Las comprobaciones documentales no sustituyen las de producto. Informar el alcance exacto de cualquier `PASSED` y los requisitos pendientes.
