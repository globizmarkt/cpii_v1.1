---
tipo: indice-maestro
dominio: club-privado-inversion-inmobiliaria
version: 1.0.0
fecha: 2026-02-15
tags: [cpii, indice, navegacion, referencias]
metadatos:
  proposito: "Índice central y mapa de navegación de toda la documentación"
  audiencia: ["desarrolladores", "arquitectos", "gestores", "analistas"]
---

# Índice Maestro del CPII - Sistema de Documentación

## Visión General

Este índice maestro proporciona navegación estructurada a toda la documentación del **Club Privado de Inversión Inmobiliaria (CPII)**. La documentación está organizada en capas para facilitar tanto la comprensión humana como la integración técnica con sistemas de vibecoding.

---

## Mapa Conceptual del Sistema

```
CPII (Club Privado de Inversión Inmobiliaria)
│
├─── [1] CONCEPTOS FUNDAMENTALES
│    ├── Ontología y Glosario
│    ├── Taxonomía de Roles
│    ├── Modelo de Negocio
│    └── Principios de Gobernanza
│
├─── [2] ARQUITECTURA TÉCNICA
│    ├── Schemas de Datos
│    ├── Modelos de Entidades
│    ├── Relaciones y Grafos
│    └── APIs y Eventos
│
├─── [3] OPERACIONES Y PROCESOS
│    ├── Ciclos de Vida
│    ├── Workflows
│    ├── Reglas de Negocio
│    └── Automatizaciones
│
├─── [4] MODELOS FINANCIEROS
│    ├── Revenue Share
│    ├── Honorarios
│    ├── Ventanas de Inversión
│    └── Proyecciones
│
└─── [5] GUÍAS OPERATIVAS
     ├── Guía del Inversor
     ├── Guía del Agente
     ├── Guía del Gestor
     └── Guía de Compliance
```

---

## Documentos Principales

### 01. Ontología y Glosario Central
**Archivo:** `01-ontologia-glosario-cpii.md`

**Propósito:** Definir vocabulario controlado, taxonomía y conceptos fundamentales del CPII.

**Contenido Principal:**
- Entidades fundamentales (Club, Activo, Fondo de Sostenibilidad)
- Roles y actores (Dueños, Fundadores, Inversores, Prescriptores, Agentes, Gestores)
- Conceptos financieros (Interés Compuesto, Revenue Share, Honorarios, Arbitraje)
- Procesos y ciclos (Snowball & Catapulta, Ventanas, Prescripción)
- Estructuras organizacionales
- Taxonomía jerárquica completa

**Para quién:**
- Desarrolladores: Entender entidades y relaciones
- Gestores: Comprender estructura completa
- Inversores: Familiarizarse con terminología

**Referencias internas:**
```
→ Relacionado con: 02-arquitectura-datos-cpii.md (schemas)
→ Relacionado con: 03-flujos-procesos-cpii.md (workflows)
→ Relacionado con: 04-modelos-financieros-cpii.md (cálculos)
```

---

### 02. Arquitectura de Datos
**Archivo:** `02-arquitectura-datos-cpii.md`

**Propósito:** Definir estructuras de datos, schemas y modelos para vibecoding.

**Contenido Principal:**
- Schemas TypeScript de entidades core:
  - Usuario/Socio
  - Activo Inmobiliario
  - Ventana de Inversión
  - Inversión
  - Comisión
  - Sección Certificada
- Modelos de negocio (Tier A Catapulta, Tier B Refugio)
- Modelo de Revenue Share
- Modelo de Honorarios
- Estructuras de datos financieros
- Dataset de simulación 24 meses
- Modelos de relaciones y grafos
- Metadatos de integración

**Para quién:**
- Desarrolladores: Implementar schemas en código
- Arquitectos de datos: Diseñar bases de datos
- Analistas: Entender estructura de información

**Referencias internas:**
```
→ Basado en: 01-ontologia-glosario-cpii.md (conceptos)
→ Usado en: 03-flujos-procesos-cpii.md (operaciones)
→ Alimenta: 04-modelos-financieros-cpii.md (cálculos)
```

---

### 03. Flujos de Procesos y Workflows
**Archivo:** `03-flujos-procesos-cpii.md`

**Propósito:** Documentar flujos operativos, workflows y lógica de negocio.

**Contenido Principal:**
- Ciclo de vida del inversor (registro, KYC, inversión, autofinanciación)
- Ciclo de vida del activo (draft → published → liquidado → vendido)
- Proceso de ventanas de inversión (apertura, cierre, liquidación)
- Flujo de Revenue Share (cálculo y propagación multinivel)
- Proceso de graduación a gestor
- Workflows de gobernanza (decisiones, intervenciones)

**Para quién:**
- Desarrolladores: Implementar lógica de procesos
- Gestores operativos: Entender flujos diarios
- Auditores: Verificar compliance

**Referencias internas:**
```
→ Implementa conceptos de: 01-ontologia-glosario-cpii.md
→ Usa estructuras de: 02-arquitectura-datos-cpii.md
→ Ejecuta cálculos de: 04-modelos-financieros-cpii.md
```

---

### 04. Modelos Financieros Detallados
**Archivo:** `04-modelos-financieros-cpii.md`

**Propósito:** Especificar cálculos financieros, proyecciones y análisis económico.

**Contenido Principal:**
- Modelo Tier A Catapulta (100K EUR, 20% APY, 6 meses)
- Modelo Tier B Refugio (1M EUR, 8% APY, 12 meses)
- Cálculos de Revenue Share multinivel
- Estructura de honorarios (5% operación + 5% venta exclusiva)
- Gastos operativos (1% plataforma, gestión, marketing)
- Distribución de beneficios (50% Fondo Sostenibilidad)
- Proyecciones patrimoniales (1, 5, 10, 15 años)
- Simulaciones de crecimiento de red
- Análisis de sensibilidad

**Para quién:**
- CFO/Finanzas: Planificación económica
- Desarrolladores: Implementar cálculos
- Inversores: Entender rentabilidades

**Referencias internas:**
```
→ Basado en conceptos de: 01-ontologia-glosario-cpii.md
→ Usa datos de: 02-arquitectura-datos-cpii.md
→ Ejecutado por: 03-flujos-procesos-cpii.md
```

---

### 05. Guía de Graduación del Gestor
**Archivo:** `05-guia-graduacion-gestor.md`

**Propósito:** Documentar el proceso completo de emancipación profesional a Gestor.

**Contenido Principal:**
- Niveles de trayectoria profesional (Iniciación → Consolidación → Proyección)
- Requisitos críticos de graduación (1M EUR, 2 años, semáforo verde)
- Privilegios del gestor (50% beneficio, marca propia, autonomía)
- Obligaciones y código de honor (ADN, monitorización, inmortalidad del activo)
- Circuito económico del gestor
- Proceso de aplicación y acreditación

**Para quién:**
- Agentes: Entender carrera profesional
- Gestores actuales: Operar su sección
- Comité: Evaluar candidatos

**Referencias internas:**
```
→ Concepto definido en: 01-ontologia-glosario-cpii.md
→ Estructura de datos en: 02-arquitectura-datos-cpii.md
→ Proceso en: 03-flujos-procesos-cpii.md
→ Cálculos en: 04-modelos-financieros-cpii.md
```

---

## Índice por Temas

### A. Roles y Actores

| Tema | Documento Principal | Sección |
|------|---------------------|---------|
| Dueños Originales | 01-ontologia | Roles > Dueños/Gestores |
| Fundadores | 01-ontologia | Roles > Fundadores |
| Inversor | 01-ontologia | Roles > Inversor/Referidor |
| Prescriptor | 01-ontologia | Roles > Prescriptor |
| Agente Promotor | 01-ontologia | Roles > Agente |
| Gestor de Sección | 05-guia-graduacion | Todo el documento |

**Referencias cruzadas:**
- Schemas de datos → 02-arquitectura
- Ciclos de vida → 03-flujos-procesos
- Honorarios → 04-modelos-financieros

---

### B. Conceptos Financieros

| Concepto | Documento | Sección |
|----------|-----------|---------|
| Interés Compuesto | 01-ontologia | Conceptos Financieros |
| Revenue Share | 04-modelos-financieros | Revenue Share Multinivel |
| Honorarios de Gestión | 04-modelos-financieros | Estructura de Honorarios |
| Fondo de Sostenibilidad | 01-ontologia | Entidades > Fondo |
| Tier A Catapulta | 04-modelos-financieros | Modelo Tier A |
| Tier B Refugio | 04-modelos-financieros | Modelo Tier B |
| Autofinanciación | 01-ontologia | Conceptos > Hito Riesgo Cero |

**Referencias cruzadas:**
- Cálculos → 03-flujos-procesos (generarComisionesRed)
- Datos → 02-arquitectura (Comision, Inversion)
- Proyecciones → 04-modelos-financieros (simulacion24meses)

---

### C. Procesos Operativos

| Proceso | Documento | Workflow |
|---------|-----------|----------|
| Onboarding Inversor | 03-flujos-procesos | onboardingInversor() |
| Captación de Activo | 03-flujos-procesos | captarActivo() |
| Apertura Ventana | 03-flujos-procesos | aperturaVentana() |
| Liquidación | 03-flujos-procesos | liquidacionVentana() |
| Graduación Gestor | 03-flujos-procesos | procesarGraduacionGestor() |
| Intervención Sección | 03-flujos-procesos | intervenirSeccion() |

**Referencias cruzadas:**
- Entidades involucradas → 01-ontologia
- Schemas → 02-arquitectura
- Cálculos financieros → 04-modelos-financieros

---

### D. Tecnología e Integración

| Aspecto | Documento | Ubicación |
|---------|-----------|-----------|
| Schemas TypeScript | 02-arquitectura | Todo el documento |
| Eventos del Sistema | 02-arquitectura | Metadatos > eventos_sistema |
| Relaciones (Grafo) | 02-arquitectura | Modelos de Relaciones |
| APIs recomendadas | 02-arquitectura | (implícito en workflows) |
| Índices de BD | 02-arquitectura | Metadatos > indices_recomendados |

**Para implementación:**
1. Leer schemas en 02-arquitectura
2. Implementar workflows de 03-flujos-procesos
3. Integrar cálculos de 04-modelos-financieros
4. Consultar glosario en 01-ontologia para dudas

---

## Índice Alfabético

### A
- **Activo Inmobiliario:** 01-ontologia (Entidades), 02-arquitectura (Schemas)
- **Agente Promotor:** 01-ontologia (Roles), 05-guia-graduacion (Carrera)
- **Arbitraje de Valor:** 01-ontologia (Conceptos Financieros)
- **Árbol Genealógico:** 02-arquitectura (Modelos de Relaciones)
- **Autofinanciación:** 01-ontologia (Hito Riesgo Cero), 04-modelos (mes 12-24)

### B
- **Beneficio Neto:** 04-modelos-financieros (Distribución)
- **Blockchain:** 02-arquitectura (mencionado futuro)

### C
- **Catapulta (Ciclo A):** 01-ontologia (Procesos), 04-modelos (Tier A)
- **Comisión:** 02-arquitectura (Schema), 03-flujos (generarComisionesRed)
- **Compliance:** 01-ontologia (Fundadores > Obligaciones)
- **CPII:** 01-ontologia (definición raíz)

### D
- **Documentación Nivel 2:** 01-ontologia (Activo), 03-flujos (completarNivel2)
- **Dueños Originales:** 01-ontologia (Roles), todo el sistema

### E
- **Efecto Bola de Nieve:** 01-ontologia (Procesos), 04-modelos (Simulación)
- **Exclusividad Off-Market:** 01-ontologia (Fundadores > Deberes)

### F
- **Fondo de Sostenibilidad:** 01-ontologia (Entidades), 04-modelos (50% obligatorio)
- **Fundador:** 01-ontologia (Roles), documento BR-01-club-fundador

### G
- **Gestor de Sección:** 05-guia-graduacion (todo), 01-ontologia (Roles)
- **Gobernanza:** 01-ontologia (Estructuras), 03-flujos (Workflows)
- **Grafo de Relaciones:** 02-arquitectura (Modelos)

### H
- **Hito de Autofinanciación:** Ver Autofinanciación
- **Honorarios:** 04-modelos-financieros (Estructura completa)

### I
- **Interés Compuesto:** 01-ontologia (Conceptos), 04-modelos (Proyecciones)
- **Inversión:** 02-arquitectura (Schema), 03-flujos (Ciclo de Vida)
- **Inversor:** 01-ontologia (Roles), 03-flujos (Ciclo de Vida)

### K
- **KYC:** 01-ontologia (mencionado), 03-flujos (onboarding)

### L
- **Liquidación:** 03-flujos (liquidacionVentana)

### M
- **Meritocracia:** 01-ontologia (Gobernanza), todo el sistema

### N
- **Nivel 1, 2, 3:** Ver Revenue Share

### O
- **Off-Market:** 01-ontologia (Exclusividad)

### P
- **Prescriptor:** 01-ontologia (Roles), documento BR-02-club-prescriptor
- **Proof of Funds (PoF):** 01-ontologia (Fondo), 03-flujos (Gobernanza)
- **Proyecciones:** 04-modelos-financieros (1-15 años)

### R
- **Refugio (Ciclo B):** 01-ontologia (Procesos), 04-modelos (Tier B)
- **Revenue Share:** 01-ontologia (Conceptos), 04-modelos (Modelo completo)

### S
- **Sección Certificada:** 02-arquitectura (Schema), 05-guia-graduacion
- **Semáforo de Salud:** 05-guia-graduacion (Requisitos)
- **Simulación 24 meses:** 02-arquitectura (Dataset), CSV adjunto
- **Snowball & Catapult:** 01-ontologia (Modelo), 04-modelos (Proyecciones)

### T
- **Takeover:** 03-flujos (intervenirSeccion), 05-guia (Inmortalidad Activo)
- **Tier A, B:** Ver Catapulta y Refugio

### V
- **Ventana de Inversión:** 01-ontologia (Procesos), 03-flujos (Workflows)
- **Vibecoding:** Todo el sistema (diseñado para integración)

---

## Guía de Uso por Perfil

### Para Desarrolladores Backend
**Ruta recomendada:**
1. `01-ontologia-glosario-cpii.md` → Entender el dominio
2. `02-arquitectura-datos-cpii.md` → Implementar schemas
3. `03-flujos-procesos-cpii.md` → Codificar workflows
4. `04-modelos-financieros-cpii.md` → Integrar cálculos

**Archivos clave:** Todos los TypeScript interfaces en 02-arquitectura

### Para Desarrolladores Frontend
**Ruta recomendada:**
1. `01-ontologia-glosario-cpii.md` → Vocabulario UI
2. `02-arquitectura-datos-cpii.md` → Schemas para estado
3. `03-flujos-procesos-cpii.md` → Flujos de usuario

**Archivos clave:** Schemas de Usuario, Ventana, Activo

### Para Product Managers / Gestores
**Ruta recomendada:**
1. `01-ontologia-glosario-cpii.md` → Visión completa
2. `05-guia-graduacion-gestor.md` → Carrera profesional
3. `04-modelos-financieros-cpii.md` → Rentabilidades

**Archivos clave:** Todos los documentos resumen ejecutivo

### Para Analistas de Datos
**Ruta recomendada:**
1. `02-arquitectura-datos-cpii.md` → Schemas y relaciones
2. `04-modelos-financieros-cpii.md` → Proyecciones y simulaciones
3. CSV adjunto → Dataset real

**Archivos clave:** 02-arquitectura, simulacion_cii_24m.csv

### Para Auditores / Compliance
**Ruta recomendada:**
1. `01-ontologia-glosario-cpii.md` → Gobernanza
2. `03-flujos-procesos-cpii.md` → Workflows de decisión
3. `05-guia-graduacion-gestor.md` → Obligaciones

**Archivos clave:** Secciones de Compliance y Gobernanza

---

## Convenciones de Nomenclatura

### En Código (TypeScript)
- **Interfaces:** PascalCase (ej: `Usuario`, `ActivoInmobiliario`)
- **Enums:** PascalCase (ej: `EstadoActivo`, `TipoRelacion`)
- **Funciones:** camelCase (ej: `onboardingInversor`, `generarComisionesRed`)
- **Constantes:** UPPER_SNAKE_CASE (ej: `AHORRO_MENSUAL`, `TIER_A`)

### En Documentación
- **Entidades:** Título en Castellano (ej: "Activo Inmobiliario")
- **Roles:** Con mayúscula (ej: "Inversor", "Gestor")
- **Conceptos:** Entrecomillados primera mención (ej: "Interés Compuesto")

### IDs y Referencias
- **Formato:** `uuid-v4` o `slug-readable`
- **Ejemplo:** `usuario-abc123`, `ventana-2026-q1`, `activo-lordelo-001`

---

## Estado de la Documentación

| Documento | Estado | Última Actualización | Completitud |
|-----------|--------|---------------------|-------------|
| 01-ontologia-glosario-cpii.md | ✅ Completo | 2026-02-15 | 100% |
| 02-arquitectura-datos-cpii.md | ✅ Completo | 2026-02-15 | 100% |
| 03-flujos-procesos-cpii.md | ✅ Completo | 2026-02-15 | 100% |
| 04-modelos-financieros-cpii.md | 🔄 Por crear | - | 0% |
| 05-guia-graduacion-gestor.md | 🔄 Por crear | - | 0% |
| simulacion_cii_24m.csv | ✅ Completo | 2026-02-15 | 100% |

---

## Próximos Pasos

### Documentación Pendiente
1. **04-modelos-financieros-cpii.md** - Cálculos detallados y proyecciones
2. **05-guia-graduacion-gestor.md** - Proceso completo de graduación
3. **06-guia-inversor-cpii.md** - Manual para inversores
4. **07-guia-compliance-cpii.md** - Normativas y regulaciones

### Integraciones Técnicas
1. Implementar schemas TypeScript en sistema
2. Crear API REST basada en workflows
3. Integrar simulador financiero
4. Construir dashboard de métricas

### Validaciones Requeridas
- [ ] Revisar todos los cálculos financieros con CFO
- [ ] Validar workflows con equipos operativos
- [ ] Testear schemas con datos reales
- [ ] Auditar compliance legal

---

## Contacto y Contribuciones

**Responsables de Documentación:**
- Arquitectura: Sistema de Extracción de Conocimiento
- Validación: David Almeida, Carlos Balboa
- Mantenimiento: Equipo Técnico CPII

**Proceso de Actualización:**
1. Identificar cambio en modelo de negocio
2. Actualizar documento(s) afectado(s)
3. Incrementar versión (semver)
4. Notificar a equipos dependientes
5. Regenerar índice maestro

---

## Metadatos de Sistema

```json
{
  "sistema": "CPII - Club Privado de Inversión Inmobiliaria",
  "version_documentacion": "1.0.0",
  "total_documentos": 6,
  "documentos_completados": 4,
  "lineas_codigo_documentadas": "~5000",
  "entidades_definidas": 25,
  "workflows_documentados": 12,
  "schemas_typescript": 15,
  "compatibilidad_vibecoding": true,
  "fecha_generacion": "2026-02-15T00:00:00Z",
  "idioma": "es-ES",
  "audiencia": ["desarrolladores", "gestores", "inversores", "auditores"],
  "tags_principales": [
    "cpii", "inversion-inmobiliaria", "revenue-share",
    "interés-compuesto", "venture-builder", "meritocracia"
  ]
}
```

---

*Índice Maestro generado por Sistema de Arquitectura de Información CPII v1.0*
*Última actualización: 2026-02-15*
*Próxima revisión programada: 2026-03-15*
