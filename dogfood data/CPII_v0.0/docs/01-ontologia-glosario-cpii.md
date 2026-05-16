---
tipo: ontologia-glosario
dominio: club-privado-inversion-inmobiliaria
version: 1.0.0
fecha: 2026-02-15
tags: [cpii, ontologia, glosario, conceptos-core]
metadatos:
  autor: "Sistema de Extracción de Conocimiento"
  proposito: "Definir vocabulario controlado y taxonomía del CPII"
  audiencia: ["desarrolladores", "gestores", "inversores", "agentes"]
---

# Ontología y Glosario Central del CPII

## Tabla de Contenidos

1. [Entidades Fundamentales](#entidades-fundamentales)
2. [Roles y Actores](#roles-y-actores)
3. [Conceptos Financieros](#conceptos-financieros)
4. [Procesos y Ciclos](#procesos-y-ciclos)
5. [Estructuras Organizacionales](#estructuras-organizacionales)
6. [Taxonomía Jerárquica](#taxonomía-jerárquica)

---

## Entidades Fundamentales

### Club Privado de Inversión Inmobiliaria (CPII)
**Definición:** Ecosistema de inversión privado que transforma el ahorro individual en una maquinaria de gestión de activos de alto impacto mediante ingeniería económica estructurada.

**Sinónimos:** Club, CPII, Ecosistema Breeder Hub

**Propiedades:**
- Naturaleza jurídica: Empresa privada
- Gobernanza: Vertical meritocrática
- Modelo operativo: Venture Builder monitorizado

### Activo Inmobiliario
**Definición:** Propiedad estructurada que cumple estándares de rentabilidad, exclusividad y documentación técnica del Club.

**Niveles de Definición:**
- **Nivel 1:** Información básica
- **Nivel 2:** Documentación completa (escrituras, planos, licencias, presupuestos auditados)

**Estados:**
- Draft (Gratuito)
- Published (Inversión Abierta)

### Fondo de Sostenibilidad
**Definición:** Reserva estratégica que captura el 50% del beneficio neto de cada operación para contingencias e inversión propia del Club.

**Funciones:**
1. Reserva de contingencia
2. Capital propio para negocios estratégicos
3. Respaldo para Proof of Funds (PoF)

---

## Roles y Actores

### 1. Dueños Originales / Gestores Fundadores
**Actores:** David Almeida, Carlos Balboa

**Responsabilidades:**
- Autoridad final y poder de veto
- Arbitraje supremo
- Control del 50% de cada nueva sección
- Decisiones sobre Fondo de Sostenibilidad

**Ingresos:**
- 2,5% por gestión de inversores en cada operación

### 2. Fundador (Núcleo de los 10)
**Definición:** Grupo selecto por invitación directa que actúa como núcleo promotor del Club.

**Características:**
- Estatus: Por invitación, no vitalicio
- Sin cuota de entrada
- No requiere pertenencia obligatoria a EXP

**Privilegios:**
- Reparto del 50% de honorarios de entrada de propiedades que presentan
- 100% de honorarios de salida si gestionan la venta
- Prioridad operativa para proponer activos
- Derecho de preferencia para mandatos de venta
- Acceso a Revenue Share multinivel

**Obligaciones:**
- Documentación técnica completa
- Informes de gestión mensuales
- Compliance estricto (reparto 50/50)
- Exclusividad off-market

**Carrera de Méritos:**
- Hito: 1 millón de euros en 2 años
- Recompensa: Gestión de nueva sección al 50% con Dueños Originales

### 3. Inversor / Referidor
**Definición:** Socio que construye patrimonio mediante ahorro sistemático y crecimiento de red.

**Características:**
- Inversión mínima: 100€
- Modelo recomendado: 50€ mensuales
- Activación automática como Prescriptor tras KYC

**Mecanismos:**
- Interés compuesto
- Efecto "Bola de Nieve"
- Ventanas de inversión trimestrales
- Revenue Share por referidos (3 niveles)

**Hito Clave:**
- **Mes 12:** Autofinanciación (comisiones cubren ahorro mensual)

### 4. Prescriptor
**Definición:** Inversor habilitado para expandir la red de capital mediante enlaces de invitación personalizados.

**Activación:** Automática tras verificación KYC

**Norma:** Sumar 1 nuevo inversor cualificado cada mes

**Revenue Share:**
```json
{
  "nivel_1_hijo": "1% del capital invertido",
  "nivel_2_nieto": "0.5% del capital invertido",
  "nivel_3_bisnieto": "0.25% del capital invertido"
}
```

**Liquidación:** Al cierre de inversión o reparto de beneficios anual

### 5. Agente Promotor / Captador / Angariador
**Definición:** Profesional que aporta activos inmobiliarios debidamente preparados bajo estándares del Club.

**Responsabilidades:**
- Identificación de activos off-market
- Estructuración documental (Nivel 2)
- Compliance con protocolos de ingesta

**Ingresos:**
- **Entrada:** 2,5% por captación del activo
- **Salida:** 5% comisión de venta en exclusiva (si mandatario)

**Carrera:** Puede escalar a Gestor de Sección

### 6. Gestor de Sección
**Definición:** Líder graduado que opera una sección autónoma con marca propia dentro del ecosistema.

**Requisitos de Graduación:**
```json
{
  "volumen_gestionado": "1.000.000 EUR",
  "continuidad": "2 años consecutivos",
  "calidad": "Semáforo verde en protocolos"
}
```

**Privilegios:**
- 50% del beneficio neto de su sección
- Marca propia (Sección Certificada)
- Autonomía operativa (monitoreada)
- Capacidad de proponer inversiones

**Obligaciones:**
- Observancia del ADN del Club
- Monitorización continua por Dueños Originales
- Compliance con Business Plan
- Sumisión a arbitraje del Club

**Estructura Patrimonial:**
- 50% Dueños Originales
- 50% Gestor graduado

---

## Conceptos Financieros

### Interés Compuesto
**Definición:** Mecanismo donde beneficios generados se reinvierten automáticamente para acelerar crecimiento patrimonial.

**Fórmula Conceptual:**
```
Patrimonio(t+1) = Patrimonio(t) + Ahorro + Rendimientos + Comisiones_Red
```

### Revenue Share / Reparto de Beneficios
**Definición:** Sistema de incentivos por captación de capital estructurado en 3 niveles de herencia.

**Estructura Multinivel:**
```yaml
nivel_1_directo:
  porcentaje: 1%
  base_calculo: "capital aportado por referido"
  
nivel_2_indirecto:
  porcentaje: 0.5%
  base_calculo: "capital aportado por referido de referido"
  
nivel_3_indirecto:
  porcentaje: 0.25%
  base_calculo: "capital aportado por referido de nivel 3"
```

### Honorarios de Gestión
**Definición:** Compensación integrada en el precio del activo para responsables de la operación.

**Estructura (5% total):**
```json
{
  "gestion_inversores": {
    "porcentaje": "2.5%",
    "beneficiarios": ["David Almeida", "Carlos Balboa"],
    "responsabilidad": "Acompañamiento y seguridad del capital"
  },
  "captacion_activo": {
    "porcentaje": "2.5%",
    "beneficiario": "Agente Promotor",
    "responsabilidad": "Estructuración documental y validación"
  }
}
```

### Gasto de Plataforma (1% estable)
**Desglose:**
- 0,5% → Leirum
- 0,5% → Estructura tecnológica propia

**Naturaleza:** Gasto de arranque obligatorio en cada financiación

### Arbitraje de Valor
**Definición:** Modelo de generación de beneficio basado en la diferencia entre rentabilidad del activo y reparto a inversores.

**Ecuación:**
```
Beneficio_Neto = Margen_Bruto - Rendimiento_Inversores - Comisiones_Red - Gastos_Operativos
```

### Hito de Autofinanciación / Riesgo Cero
**Definición:** Punto donde comisiones de red superan la aportación mensual del inversor.

**Momento típico:** Mes 18-24 con modelo 1x1 mensual

**Impacto:** Patrimonio crece sin aportación de bolsillo

---

## Procesos y Ciclos

### Modelo "Snowball & Catapult"
**Definición:** Sistema dual de ventanas de inversión que combina acumulación con aceleración estratégica.

### Ventanas de Inversión

#### Ciclo A: Catapulta
```yaml
nombre: "Catapulta"
tipo: "Alto rendimiento"
duracion: "6 meses"
rendimiento_inversor: "20% APY"
margen_club: "30%"
capital_tipo: "100.000 EUR"
ejemplos: ["Preventas", "Lordelo", "Haven Nobre"]
caracteristica_clave: "Salida coincide con nueva ventana (roll-over)"
```

#### Ciclo B: Refugio
```yaml
nombre: "Refugio"
tipo: "Renta estable"
duracion: "Anual"
rendimiento_inversor: "8% APY"
margen_club: "12%"
capital_tipo: "1.000.000 EUR"
ejemplos: ["Activos residenciales", "Renta estable"]
caracteristica_clave: "Capital en espera o largo plazo"
```

### Frecuencia de Ventanas
- **Apertura:** Cada 3 meses
- **Acumulación trimestral:** 150€ (50€ x 3 meses)
- **Alternancia:** Q1→Catapulta, Q2→Refugio, Q3→Catapulta, Q4→Refugio

### Prescripción Continua (Norma 1x1)
**Definición:** Cada asociado suma un nuevo prescriptor al mes.

**Dinámica de Crecimiento:**
```json
{
  "mes_1": {"total_miembros": 1, "estructura": "1-0-0"},
  "mes_6": {"total_miembros": 32, "estructura": "6-15-20"},
  "mes_12": {"total_miembros": 2048, "estructura": "12-66-220"},
  "mes_24": {"total_miembros": 8388608, "estructura": "24-276-2024"}
}
```

### Flujo de Capital (Circuito Hidráulico)

#### Fase 1: Ingesta y Captación
1. Aporte del activo (Nivel 2)
2. Integración en plataforma
3. Añadir 5% de honorarios al precio

#### Fase 2: Operación
1. Captación de inversores
2. Inyección en ventana correspondiente
3. Gestión del proyecto

#### Fase 3: Split de Beneficios
```yaml
distribucion_beneficio_neto:
  fondo_sostenibilidad: "50%"
  beneficio_gestion: "50%"
  
calculo_beneficio_neto:
  base: "Margen_Bruto"
  deducciones:
    - "Rendimiento_Inversores"
    - "Comisiones_Red (1.75%)"
    - "Gastos_Gestion (100 EUR)"
    - "Gastos_Marketing (50 EUR)"
```

### Proceso de Graduación a Gestor

**Fases:**
```yaml
fase_1_iniciacion:
  duracion: "Mes 0-6"
  foco: "Microinversión y aprendizaje"
  
fase_2_consolidacion:
  duracion: "Año 1"
  foco: "Red activa y volumen"
  
fase_3_graduacion:
  duracion: "Año 2"
  objetivo: "1M EUR gestionados"
  recompensa: "Gestor con empresa propia"
```

**Proceso de Acreditación:**
1. Auditoría de datos en plataforma
2. Validación de casos de éxito ante Comité
3. Entrega de credenciales
4. Activación de nuevo nivel de acceso

---

## Estructuras Organizacionales

### Jerarquía de Roles
```
Dueños Originales (David Almeida, Carlos Balboa)
├── Fundadores (Núcleo de 10)
├── Gestores de Sección (Graduados)
│   ├── Agentes Promotores
│   └── Agentes Junior
├── Prescriptores Activos
└── Inversores Base
```

### Gobernanza
**Tipo:** Empresa privada con autoridad vertical

**Estructura de Poder:**
```yaml
autoridad_final: ["David Almeida", "Carlos Balboa"]
rol_consultivo: ["Fundadores", "Prescriptores organizados"]
poder_veto: "Dueños Originales exclusivamente"
arbitraje: "Comité (David, Carlos, Edmundo)"
```

### Estructura de Secciones
```json
{
  "matriz": {
    "nombre": "Club Privado de Inversión Inmobiliaria",
    "control": "100% Dueños Originales",
    "funciones": ["Tecnología", "Marca", "Compliance", "Fondo Sostenibilidad"]
  },
  "secciones_certificadas": {
    "control": "50% Matriz + 50% Gestor",
    "autonomia": "Operativa monitoreada",
    "obligaciones": ["ADN del Club", "Business Plan", "Reporting"]
  }
}
```

---

## Taxonomía Jerárquica

### Dominios de Conocimiento
```
CPII (Raíz)
├── Roles
│   ├── Dueños/Gestores
│   ├── Fundadores
│   ├── Inversores
│   ├── Prescriptores
│   ├── Agentes
│   └── Gestores de Sección
├── Finanzas
│   ├── Revenue Share
│   ├── Honorarios
│   ├── Ventanas de Inversión
│   ├── Interés Compuesto
│   └── Fondo de Sostenibilidad
├── Operaciones
│   ├── Captación de Activos
│   ├── KYC
│   ├── Gestión de Red
│   ├── Ciclos de Inversión
│   └── Reporting
├── Gobernanza
│   ├── Autoridad y Veto
│   ├── Compliance
│   ├── Protocolos
│   └── Arbitraje
└── Tecnología
    ├── Plataforma Digital
    ├── CRM UXE
    ├── Blockchain (futuro)
    └── Automatización
```

### Conceptos por Criticidad

**Críticos (Bloquean operación):**
- KYC/Verificación identidad
- Nivel 2 de definición de activos
- Fondo de Sostenibilidad (50% obligatorio)
- Autoridad final (Dueños Originales)

**Importantes (Impactan rendimiento):**
- Prescripción Continua (1x1)
- Ventanas de Inversión
- Revenue Share multinivel
- Honorarios de gestión

**Complementarios (Mejoran experiencia):**
- Gala Anual
- Formación continua
- Herramientas de prospección
- Reconocimiento público

---

## Referencias Cruzadas

**Ver también:**
- [Arquitectura de Datos del CPII](02-arquitectura-datos-cpii.md)
- [Flujos de Procesos](03-flujos-procesos-cpii.md)
- [Modelos Financieros](04-modelos-financieros-cpii.md)
- [Guía de Graduación](05-guia-graduacion-gestor.md)

---

## Metadatos para Vibecoding

```json
{
  "entidades_principales": [
    "Club", "Inversor", "Prescriptor", "Agente", "Gestor", "Fundador",
    "Activo", "Ventana", "FondoSostenibilidad", "RevenuShare"
  ],
  "relaciones_clave": [
    {"tipo": "invita", "de": "Prescriptor", "a": "Inversor"},
    {"tipo": "capta", "de": "Agente", "a": "Activo"},
    {"tipo": "gestiona", "de": "Gestor", "a": "Seccion"},
    {"tipo": "gobierna", "de": "DuenosOriginales", "a": "Club"},
    {"tipo": "invierte_en", "de": "Inversor", "a": "Ventana"}
  ],
  "metricas_kpi": [
    "patrimonio_acumulado", "volumen_gestionado", "comisiones_red",
    "rendimiento_apy", "beneficio_neto", "tasa_autofinanciacion"
  ],
  "eventos_temporales": [
    "apertura_ventana", "cierre_inversion", "liquidacion_comisiones",
    "graduacion_gestor", "hito_autofinanciacion"
  ]
}
```

---

*Documento generado por Sistema de Arquitectura de Información CPII v1.0*
*Última actualización: 2026-02-15*
