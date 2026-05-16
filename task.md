# Roadmap: Auditoría Forense y Extracción de mud_box (Fase 1 y Fase 2)

## [x] FASE 1: Auditoría de Código CPII_v1.0
- [x] Mapeo exhaustivo de las 9 páginas HTML.
- [x] Identificación de inconsistencias (Header duplicado, bugs en UI).
- [x] Disección de módulos core (`handoff-emitter`, `onboarding-controller`, `tracking`).
- [x] Análisis de arquitectura de Cloud Functions y Firestore Rules.
- [x] Identificación de deuda técnica (credenciales hardcodeadas, i18n monolítico).

## [x] FASE 1-B: Auditoría del Ecosistema de Carpetas
- [x] Análisis de archivos raíz de configuración (`firebase.json`, `package.json`, etc).
- [x] Clasificación de las carpetas de memoria (`.agents`, `session_memory`, `dogfood data`).
- [x] Tabla de la Verdad: Separación estricta entre Estructural vs Dominio.

## [/] FASE 1-C: Nomenclatura y Arquitectura de Red (En curso)
- [x] Auditoría semántica de archivos (Por qué se llaman así y qué hacen).
- [x] Plan de refactorización de nombres para el mud_box.
- [x] Análisis de red: Funcionamiento del CDN en CPII_v1.0.

## [ ] FASE 2: Extracción y Limpieza del mud_box (Próximas 2 horas)
- [ ] Crear directorio `Planta-2026/mud_box/`.
- [ ] Extraer archivos de infraestructura (`firebase.json`, `package.json`, `firestore.rules`).
- [ ] Limpiar infraestructura de identificadores de dominio (ej. cambiar `'cpii_v1.0'` por variables).
- [ ] Extraer y reescribir módulos JS core (`handoff-emitter`, `tracking`, `onboarding`) con namespace genérico.
- [ ] Crear estructura HTML canónica (Inyectar el `CANONICAL_HEADER` en plantillas limpias).
- [ ] Descartar código muerto (`update-i18n.js`, `js/design-system.js`).
