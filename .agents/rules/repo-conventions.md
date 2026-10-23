# Convenciones de ubicacion de HealthCore

HealthCore es el proyecto de la empresa seleccionada GlobalHealth Solutions. Esta identidad no cambia el mapa autorizado de carpetas.

## Regla obligatoria

| Ruta              | Contenido de producto permitido                            |
| ----------------- | ---------------------------------------------------------- |
| `uis/website/`    | Sitio publico, recursos, configuracion y tests locales.    |
| `uis/backoffice/` | Interfaz interna, recursos, configuracion y tests locales. |
| `services/`       | API, workers, configuracion y tests locales.               |

No crear arboles paralelos en la raiz: `apps/`, `frontend/`, `backend/`, `src/`, `website/` o `backoffice/`. No crear carpetas vacias para aparentar implementacion. Cada aplicacion o servicio nuevo debe documentar instalacion, ejecucion y verificaciones.

## Plantilla y excepciones

- No mover ni eliminar carpetas preexistentes. Leer sus README antes de trabajar en ellas.
- `agents/`, `skills/` y `mcps/` conservan su funcion de IA de producto; `.agents/skills/` contiene solo procedimientos del agente de desarrollo.
- `memory-bank/`, `.agents/rules/` y `.agents/skills/` estan autorizadas como soporte documental, no para codigo de producto.
- `BRIEFING.md` y `AGENTS.md` son documentos autorizados en la raiz.
- Otras ampliaciones fuera de las rutas mapeadas requieren justificacion y confirmacion del desarrollador. Respetar las protecciones de `AGENTS.md`.

## Comprobacion

Revisar `git status --short --untracked-files=all`, `git diff --name-status` y `git diff --cached --name-status`. Incluir archivos sin staging y destinos de renombres. Distinguir producto de soporte documental: las excepciones autorizadas no infringen el mapa, pero no pueden contener aplicaciones. No borrar archivos existentes de la plantilla para cumplir esta regla.
