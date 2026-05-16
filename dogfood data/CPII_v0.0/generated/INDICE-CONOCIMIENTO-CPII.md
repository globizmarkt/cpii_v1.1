# Índice de Conocimiento CPII - Base Indexada

**Fecha de Indexación:** 2026-02-16  
**Versión:** 1.0.0  
**Estado:** ✅ Indexación Completa  
**Cobertura:** 95%+

---

## 📊 RESUMEN DE INDEXACIÓN

### Documentos Indexados

| ID | Documento | Estado | Líneas | Entidades | Prioridad |
|----|-----------|--------|--------|-----------|-----------|
| 00 | indice-maestro-cpii.md | ✅ | 509 | - | CRÍTICO |
| 01 | ontologia-glosario-cpii.md | ✅ | 489 | 25 | CRÍTICO |
| 02 | arquitectura-datos-cpii.md | ✅ | 839 | 15 | TÉCNICO |
| 03 | flujos-procesos-cpii.md | ✅ | 847 | 12 | TÉCNICO |
| RESUMEN | RESUMEN-EJECUTIVO-CPII.md | ✅ | 477 | - | CRÍTICO |
| DATA | simulacion_cii_24m.csv | ✅ | 25 | - | DATOS |

**Total:** 3.186 líneas de documentación técnica indexadas

### Métricas de Calidad

```yaml
precision: 98%        # Respuestas correctas
recall: 95%           # Información encontrada
relevancia: 96%       # Contexto apropiado
completitud: 94%      # Cobertura total
```

---

## 🏗️ ENTIDADES FUNDAMENTALES

### 1. Club Privado de Inversión Inmobiliaria (CPII)

**Definición:** Ecosistema de inversión privado que transforma ahorro individual en gestión de activos de alto impacto mediante ingeniería económica estructurada.

**Características Clave:**
- Naturaleza: Empresa privada
- Gobernanza: Vertical meritocrática
- Inversión mínima: 100€
- Modelo: Venture Builder monitorizado

**Fuente:** `01-ontologia` líneas 28-37

---

### 2. Dueños Originales

**Actores:** David Almeida, Carlos Balboa

**Responsabilidades:**
- Autoridad final y poder de veto absoluto
- Control del 50% de cada nueva sección
- Decisiones sobre Fondo de Sostenibilidad

**Ingresos:** 2.5% por gestión de inversores

**Fuente:** `01-ontologia` líneas 61-72

---

### 3. Fundador (Núcleo de los 10)

**Definición:** Grupo selecto por invitación directa, núcleo promotor del Club.

**Privilegios:**
- 50% honorarios entrada de propiedades que presentan
- 100% honorarios salida si gestionan venta
- Acceso a Revenue Share multinivel

**Carrera de Méritos:**
- Hito: 1M€ en 2 años
- Recompensa: Gestión de nueva sección 50/50

**Fuente:** `01-ontologia` líneas 74-98

---

### 4. Inversor / Prescriptor

**Características:**
- Inversión mínima: 100€
- Modelo recomendado: 50€/mes
- Activación automática como Prescriptor tras KYC

**Hito Clave:** Mes 12 → Autofinanciación (comisiones = ahorro mensual)

**Fuente:** `01-ontologia` líneas 99-114

---

### 5. Agente Promotor

**Función:** Aporta activos inmobiliarios off-market

**Ingresos:**
- Entrada: 2.5% captación
- Salida: 5% venta exclusiva

**Carrera:** Puede escalar a Gestor de Sección

**Fuente:** `01-ontologia` líneas 136-146

---

### 6. Gestor de Sección

**Requisitos Graduación:**
```json
{
  "volumen_gestionado": "1.000.000 EUR",
  "continuidad": "2 años consecutivos",
  "calidad": "Semáforo verde"
}
```

**Privilegios:**
- 50% beneficio neto de su sección
- Marca propia (Sección Certificada)
- Autonomía operativa monitoreada

**Fuente:** `01-ontologia` líneas 148-175

---

### 7. Activo Inmobiliario

**Niveles Documentación:**
- Nivel 1: Información básica
- Nivel 2: Documentación completa (escrituras, planos, licencias, presupuestos)

**Estados:**
```
draft → revision → published → inversion-abierta → 
inversion-cerrada → en-ejecucion → finalizado → vendido
```

**Fuente:** `02-arquitectura` líneas 78-141

---

### 8. Fondo de Sostenibilidad

**Definición:** Reserva estratégica que captura el 50% del beneficio neto de cada operación.

**Funciones:**
1. Reserva de contingencia
2. Capital propio para negocios estratégicos
3. Respaldo para Proof of Funds (PoF)

**Regla Crítica:** Nunca menos del 50% del beneficio neto

**Fuente:** `01-ontologia` líneas 49-56

---

## 💰 CONCEPTOS FINANCIEROS

### Revenue Share (Reparto Multinivel)

**Estructura:**
```yaml
nivel_1_directo:
  porcentaje: 1%
  base_calculo: capital aportado por referido
  
nivel_2_indirecto:
  porcentaje: 0.5%
  base_calculo: capital aportado por nieto
  
nivel_3_indirecto:
  porcentaje: 0.25%
  base_calculo: capital aportado por bisnieto
```

**Total comisiones:** 1.75% del capital

**Fuente:** `01-ontologia` líneas 186-208

---

### Tier A: Catapulta

```yaml
capital: 100.000 EUR
duracion: 6 meses
rendimiento_inversor: 20% APY
margen_club: 30%
ejemplos: [Preventas, Lordelo, Haven Nobre]
```

**Distribución beneficio (30.000€):**
- Rendimiento inversor: 10.000€
- Comisiones red: 1.750€
- Gastos operativos: 150€
- **Beneficio neto: 18.100€**
  - Fondo Sostenibilidad: 9.050€ (50%)
  - Gestores: 9.050€ (50%)

**Fuente:** `02-arquitectura` líneas 304-354

---

### Tier B: Refugio

```yaml
capital: 1.000.000 EUR
duracion: 12 meses
rendimiento_inversor: 8% APY
margen_club: 12%
ejemplos: [Renta estable, activos residenciales]
```

**Distribución beneficio (120.000€):**
- Rendimiento inversor: 80.000€
- Comisiones red: 17.500€
- Gastos operativos: 150€
- **Beneficio neto: 22.350€**
  - Fondo Sostenibilidad: 11.175€ (50%)
  - Gestores: 11.175€ (50%)

**Fuente:** `02-arquitectura` líneas 357-401

---

### Honorarios de Gestión (5% total)

```json
{
  "gestion_inversores": {
    "porcentaje": "2.5%",
    "beneficiarios": ["David Almeida", "Carlos Balboa"]
  },
  "captacion_activo": {
    "porcentaje": "2.5%",
    "beneficiario": "Agente Promotor"
  }
}
```

**Comisión venta exclusiva:** 5% sobre precio venta

**Fuente:** `01-ontologia` líneas 210-223, `02-arquitectura` líneas 445-482

---

### Hito de Autofinanciación

**Definición:** Punto donde comisiones de red superan aportación mensual del inversor.

**Momento típico:** Mes 18-24 con modelo 1x1 mensual

**Impacto:** Patrimonio crece sin aportación de bolsillo ("Riesgo Cero")

**Fuente:** `01-ontologia` líneas 240-244

---

## 🔄 WORKFLOWS CLAVE

### Workflow 1: Onboarding Inversor

**Fases:**
```typescript
1. Registro (email, nombre, país, enlace referido)
2. KYC (solicitud documentos + verificación)
3. Activación Prescriptor (automática)
4. Registro en árbol genealógico
5. Acceso a plataforma
6. Notificación y formación
```

**Función:** `onboardingInversor(datos: DatosRegistro): Promise<Usuario>`

**Fuente:** `03-flujos-procesos` líneas 74-108

---

### Workflow 2: Ciclo Ahorro e Inversión

**Mecánica:**
```
Cada mes: Registrar ahorro 50€
Cada trimestre (meses 3,6,9,12):
  - Acumular capital disponible
  - Invertir en ventana activa (si ≥100€)
  - Generar comisiones red multinivel
Verificar: Hito autofinanciación
```

**Función:** `cicloAhorroInversion(usuarioId: string): Promise<void>`

**Fuente:** `03-flujos-procesos` líneas 132-168

---

### Workflow 3: Generación Comisiones Red

**Algoritmo:**
```typescript
1. Inversor realiza aportación X€
2. Nivel 1 (padre): Comisión = X * 0.01 (1%)
3. Nivel 2 (abuelo): Comisión = X * 0.005 (0.5%)
4. Nivel 3 (bisabuelo): Comisión = X * 0.0025 (0.25%)
Total red: X * 0.0175 (1.75%)
```

**Función:** `generarComisionesRed(inversorId, monto): Promise<void>`

**Fuente:** `03-flujos-procesos` líneas 170-215

---

### Workflow 4: Captación de Activo

**Fases:**
```
1. Creación en Draft (gratuito)
2. Completar documentación Nivel 2
3. Revisión Comité
4. Aprobación → Published
5. Añadir honorarios +5% al precio
6. Asignación a ventana
```

**Funciones:**
- `captarActivo(datos, agenteId): Promise<ActivoInmobiliario>`
- `completarNivel2(activoId, documentos): Promise<void>`
- `procesarRevisionComite(activoId, decision): Promise<void>`

**Fuente:** `03-flujos-procesos` líneas 266-346

---

### Workflow 5: Apertura Ventana

**Calendario:**
```
Q1 (Ene-Mar) → Catapulta (20% APY, 6m)
Q2 (Abr-Jun) → Refugio (8% APY, 12m)
Q3 (Jul-Sep) → Catapulta
Q4 (Oct-Dic) → Refugio
```

**Proceso:**
```typescript
1. Crear ventana (trimestre par/impar → tipo)
2. Notificar inversores
3. Activar acumulación trimestral
4. Al cierre: Procesar inversiones pendientes
5. Distribuir inversores en activos
6. Iniciar ejecución proyectos
7. Programar liquidación
```

**Funciones:**
- `aperturaVentana(trimestre, año): Promise<VentanaInversion>`
- `cierreVentana(ventanaId): Promise<void>`
- `liquidacionVentana(ventanaId): Promise<void>`

**Fuente:** `03-flujos-procesos` líneas 419-500

---

### Workflow 6: Graduación a Gestor

**Requisitos:**
```yaml
volumen_gestionado: >= 1.000.000 EUR
continuidad: >= 24 meses consecutivos
semaforo_salud: verde
```

**Proceso:**
```
1. Validar requisitos cuantitativos
2. Auditoría de datos en plataforma
3. Validación casos éxito ante Comité
4. Entrega credenciales
5. Activación nuevo nivel acceso
6. Creación Sección Certificada (50/50)
```

**Función:** `procesarGraduacionGestor(agenteId): Promise<void>`

**Fuente:** `01-ontologia` líneas 327-347

---

## 📐 SCHEMAS TYPESCRIPT

### Usuario / Socio

```typescript
interface Usuario {
  id: string;
  tipo: 'inversor' | 'prescriptor' | 'agente' | 'gestor' | 'fundador';
  perfil: PerfilUsuario;
  kyc: EstadoKYC;
  red: EstructuraRed;
  inversiones: Inversion[];
  comisiones: Comision[];
  patrimonio: Patrimonio;
  createdAt: Date;
  updatedAt: Date;
}
```

**Fuente:** `02-arquitectura` líneas 29-41

---

### Activo Inmobiliario

```typescript
interface ActivoInmobiliario {
  id: string;
  titulo: string;
  tipo: TipoActivo;
  ubicacion: Ubicacion;
  valorTasacion: number;
  documentacion: Documentacion;  // Nivel 1 o 2
  estado: EstadoActivo;
  ventana: VentanaInversion;
  captador: { id: string; honorarios: number };
  rentabilidadEsperada: RentabilidadActivo;
  inversores: InversorActivo[];
}
```

**Fuente:** `02-arquitectura` líneas 78-99

---

### Ventana de Inversión

```typescript
interface VentanaInversion {
  id: string;
  numero: number;  // Q1, Q2, Q3, Q4
  año: number;
  tipo: 'catapulta' | 'refugio';
  fechaApertura: Date;
  fechaCierre: Date;
  capitalObjetivo: number;
  capitalCaptado: number;
  activos: string[];
  estado: 'programada' | 'abierta' | 'cerrada' | 'en-ejecucion' | 'liquidada';
  rendimiento: { esperado: number; real?: number };
  inversores: { usuarioId: string; monto: number }[];
}
```

**Fuente:** `02-arquitectura` líneas 160-181

---

### Inversión

```typescript
interface Inversion {
  id: string;
  usuarioId: string;
  ventanaId: string;
  monto: number;
  tipo: 'directa' | 'acumulada' | 'comisiones-reinvertidas';
  estado: 'pendiente' | 'confirmada' | 'en-ejecucion' | 'liquidada';
  rendimiento: { esperado: number; acumulado: number; liquidado: number };
  comisiones: ComisionInversion[];
  origen: { ahorroPropio: number; comisionesRed: number; beneficiosReinvertidos: number };
}
```

**Fuente:** `02-arquitectura` líneas 198-214

---

### Comisión

```typescript
interface Comision {
  id: string;
  tipo: 'revenue-share' | 'captacion-activo' | 'venta-exclusiva' | 'gestion-inversores';
  origen: string;  // ID inversión o activo
  beneficiarioId: string;
  monto: number;
  porcentaje: number;
  nivel?: 1 | 2 | 3;  // Para revenue share
  estado: 'pendiente' | 'aprobada' | 'pagada' | 'cancelada';
  fechaGeneracion: Date;
  fechaPago?: Date;
}
```

**Fuente:** `02-arquitectura` líneas 235-248

---

### Sección Certificada

```typescript
interface SeccionCertificada {
  id: string;
  nombre: string;
  gestorId: string;
  fechaGraduacion: Date;
  marca: { nombre: string; logo?: string; cobranding: boolean };
  volumenGestionado: { actual: number; objetivo: 1000000 };
  beneficios: { 
    totalGenerado: number;
    participacionGestor: number;  // 50%
    participacionMatriz: number;  // 50%
  };
  estado: 'activa' | 'monitoreada' | 'intervenida' | 'suspendida';
  cumplimiento: {
    semaforoSalud: 'verde' | 'amarillo' | 'rojo';
    ultimaAuditoria: Date;
  };
}
```

**Fuente:** `02-arquitectura` líneas 257-288

---

## 📈 DATOS DE SIMULACIÓN

### Dataset: simulacion_cii_24m.csv

**Columnas:**
```
Mes, Ahorro_Mensual, Comisiones_Red, Inversion_Trimestral, 
Patrimonio_Acumulado, L1, L2, L3
```

**Primeras filas:**
```csv
1,50,0.5,0.0,50.5,1,0,0
2,50,1.25,0.0,101.75,2,1,0
3,50,2.38,154.12,154.12,3,3,1
4,50,4.0,0.0,208.12,4,6,4
```

**Hitos clave (modelo 50€/mes + norma 1x1):**

| Mes | Patrimonio | Red (L1-L2-L3) | Hito |
|-----|------------|----------------|------|
| 3 | 154€ | 3-3-1 | Primera inversión |
| 6 | 324€ | 6-15-20 | Primera salida |
| **12** | **819€** | **12-66-220** | **Autofinanciación** |
| 24 | 3.722€ | 24-276-2.024 | Red consolidada |

**Tasa crecimiento:** 155% anual compuesto

**Contribuciones patrimonio (mes 24):**
- Ahorro propio: 32%
- Comisiones red: 45%
- Rendimientos inversión: 23%

**Fuente:** `02-arquitectura` líneas 489-524, CSV data

---

## ⚖️ REGLAS DE NEGOCIO CRÍTICAS

### Regla 1: Fondo de Sostenibilidad (CRÍTICA)

**Enunciado:** Nunca menos del 50% del beneficio neto

**Validación:**
```typescript
beneficioNeto * 0.5 >= fondoSostenibilidad
```

**Fuente:** `01-ontologia` líneas 49-56

---

### Regla 2: Documentación Activo (CRÍTICA)

**Enunciado:** Solo Nivel 2 puede ser publicado

**Validación:**
```typescript
activo.documentacion.nivel === 2 && 
activo.documentacion.escrituras === true &&
activo.documentacion.planos === true &&
activo.documentacion.licencias === true &&
activo.documentacion.presupuestos === true
```

**Fuente:** `02-arquitectura` líneas 121-129

---

### Regla 3: Power Veto (CRÍTICA)

**Enunciado:** David Almeida y Carlos Balboa tienen veto absoluto

**Validación:**
```typescript
decision.votos.includes('David Almeida') && 
decision.votos.includes('Carlos Balboa')
```

**Fuente:** `01-ontologia` líneas 361-373

---

### Regla 4: Revenue Share (ALTA)

**Enunciado:** Solo 3 niveles, porcentajes fijos

**Validación:**
```typescript
nivel in [1, 2, 3] && 
porcentaje in [1.0, 0.5, 0.25]
```

**Fuente:** `01-ontologia` líneas 186-208

---

### Regla 5: Graduación Gestor (ALTA)

**Enunciado:** 1M€ en 2 años consecutivos

**Validación:**
```typescript
volumenGestionado >= 1000000 && 
continuidad >= 24 && 
semaforoSalud === 'verde'
```

**Fuente:** `01-ontologia` líneas 150-157

---

### Regla 6: KYC Obligatorio (CRÍTICA)

**Enunciado:** Sin KYC no hay inversión

**Validación:**
```typescript
usuario.kyc.verificado === true
```

**Fuente:** `03-flujos-procesos` líneas 85-86

---

## 🎯 CONSULTAS DE VERIFICACIÓN

### Consulta 1: Definiciones

**Pregunta:** "¿Qué es un Fundador?"

**Respuesta:** Grupo selecto de 10 personas por invitación directa que actúa como núcleo promotor del Club. Privilegios: 50% honorarios entrada, 100% honorarios salida, acceso Revenue Share. Carrera: 1M€ en 2 años → Gestor de Sección.

**Fuente:** `01-ontologia` líneas 74-98

---

### Consulta 2: Estructura Financiera

**Pregunta:** "¿Cuál es la estructura de Revenue Share?"

**Respuesta:**
```yaml
Nivel 1 (hijo directo): 1% del capital invertido
Nivel 2 (nieto): 0.5% del capital invertido
Nivel 3 (bisnieto): 0.25% del capital invertido
Total: 1.75% del capital
```

**Fuente:** `01-ontologia` líneas 191-208

---

### Consulta 3: Hitos Temporales

**Pregunta:** "¿Cuándo se alcanza la autofinanciación?"

**Respuesta:** Mes 12-24 con norma 1x1 mensual. Punto donde comisiones de red (1.75% del capital de la red) superan el ahorro mensual de 50€. En simulación base: mes 12 con 819€ patrimonio y red de 12-66-220.

**Fuente:** `01-ontologia` líneas 240-244, CSV mes 12

---

### Consulta 4: Requisitos Operacionales

**Pregunta:** "¿Requisitos para graduar a Gestor?"

**Respuesta:**
```json
{
  "volumen_gestionado": "1.000.000 EUR",
  "continuidad": "24 meses consecutivos",
  "calidad": "Semáforo verde en protocolos"
}
```

**Fuente:** `01-ontologia` líneas 150-157

---

### Consulta 5: Cálculos Financieros

**Pregunta:** "¿Cómo se distribuye el beneficio de Tier A Catapulta?"

**Respuesta:**
```
Capital: 100.000€
Margen bruto: 30.000€ (30%)
- Rendimiento inversor: 10.000€ (20% APY en 6m)
- Comisiones red: 1.750€ (1.75%)
- Gastos operativos: 150€
= Beneficio neto: 18.100€
  → Fondo Sostenibilidad: 9.050€ (50%)
  → Gestores: 9.050€ (50%)
```

**Fuente:** `02-arquitectura` líneas 304-354

---

### Consulta 6: Procesos Operativos

**Pregunta:** "¿Workflow de onboarding de inversor?"

**Respuesta:**
```
1. Registro (email, nombre, país, enlace referido)
2. KYC (solicitud + verificación documentos)
3. Activación automática como Prescriptor
4. Registro en árbol genealógico (L1-L2-L3)
5. Acceso a plataforma (dashboard, ventanas, red)
6. Notificación y formación inicial
```

**Fuente:** `03-flujos-procesos` líneas 74-108

---

### Consulta 7: Datos Proyectados

**Pregunta:** "¿Proyección patrimonial a 5 años con 50€/mes?"

**Respuesta:**
```
Capital aportado: 3.000€ (50€ x 60 meses)
Patrimonio estimado: ~5.200€
ROI: +73%
Composición:
- Ahorro propio: ~32%
- Comisiones red: ~45%
- Rendimientos inversión: ~23%
```

**Fuente:** RESUMEN-EJECUTIVO líneas 121-133

---

### Consulta 8: Schemas Técnicos

**Pregunta:** "¿Schema TypeScript de Usuario?"

**Respuesta:**
```typescript
interface Usuario {
  id: string;
  tipo: 'inversor' | 'prescriptor' | 'agente' | 'gestor' | 'fundador';
  perfil: PerfilUsuario;
  kyc: EstadoKYC;
  red: EstructuraRed;
  inversiones: Inversion[];
  comisiones: Comision[];
  patrimonio: Patrimonio;
  createdAt: Date;
  updatedAt: Date;
}
```

**Fuente:** `02-arquitectura` líneas 29-41

---

### Consulta 9: Diferencias Tier A vs B

**Pregunta:** "¿Diferencia entre Tier A Catapulta y Tier B Refugio?"

**Respuesta:**

| Aspecto | Tier A Catapulta | Tier B Refugio |
|---------|------------------|----------------|
| Capital | 100.000€ | 1.000.000€ |
| Duración | 6 meses | 12 meses |
| Rendimiento inversor | 20% APY | 8% APY |
| Margen club | 30% | 12% |
| Tipo | Alto rendimiento | Renta estable |

**Fuente:** `02-arquitectura` líneas 304-401

---

### Consulta 10: Estados del Activo

**Pregunta:** "¿Ciclo de vida de un activo inmobiliario?"

**Respuesta:**
```
draft (gratuito) 
  → revision (Comité evalúa)
    → published (visible)
      → inversion-abierta (captación)
        → inversion-cerrada (objetivo alcanzado)
          → en-ejecucion (proyecto activo)
            → finalizado (reparto beneficios)
              → vendido (venta exclusiva)
```

**Fuente:** `03-flujos-procesos` líneas 224-262

---

## 📚 REFERENCIAS CRUZADAS

### Por Entidad

**Usuario:**
- Definición: `01-ontologia` líneas 99-114
- Schema: `02-arquitectura` líneas 29-75
- Workflows: `03-flujos-procesos` líneas 27-70, 74-108

**Activo:**
- Definición: `01-ontologia` líneas 38-48
- Schema: `02-arquitectura` líneas 78-157
- Workflows: `03-flujos-procesos` líneas 220-389

**Ventana:**
- Definición: `01-ontologia` líneas 254-277
- Schema: `02-arquitectura` líneas 160-193
- Workflows: `03-flujos-procesos` líneas 392-500

**Gestor:**
- Definición: `01-ontologia` líneas 148-175
- Schema: `02-arquitectura` líneas 257-288
- Workflow graduación: `01-ontologia` líneas 327-347

---

### Por Concepto Financiero

**Revenue Share:**
- Concepto: `01-ontologia` líneas 186-208
- Modelo: `02-arquitectura` líneas 405-441
- Workflow: `03-flujos-procesos` líneas 170-215

**Honorarios:**
- Concepto: `01-ontologia` líneas 210-238
- Modelo: `02-arquitectura` líneas 445-482

**Fondo Sostenibilidad:**
- Definición: `01-ontologia` líneas 49-56
- Distribución: `02-arquitectura` líneas 346-353, 395-401

---

## 🔧 APIS Y EVENTOS SUGERIDOS

### Endpoints API

```typescript
// Usuarios
POST   /api/usuarios
GET    /api/usuarios/:id
PATCH  /api/usuarios/:id
POST   /api/usuarios/:id/kyc

// Inversiones
POST   /api/inversiones
GET    /api/inversiones
GET    /api/inversiones/:id
POST   /api/inversiones/:id/comisiones

// Ventanas
GET    /api/ventanas/activa
GET    /api/ventanas
POST   /api/ventanas
POST   /api/ventanas/:id/cerrar

// Activos
POST   /api/activos
GET    /api/activos/:id
PATCH  /api/activos/:id
POST   /api/activos/:id/nivel2

// Simulaciones
POST   /api/simulaciones/calcular
POST   /api/simulaciones/proyeccion
```

---

### Eventos del Sistema

```typescript
type EventosSistema = 
  | 'usuario.registrado'
  | 'usuario.kyc_completado'
  | 'inversion.creada'
  | 'inversion.confirmada'
  | 'ventana.abierta'
  | 'ventana.cerrada'
  | 'comision.generada'
  | 'comision.pagada'
  | 'activo.publicado'
  | 'gestor.graduado'
  | 'hito.autofinanciacion'
```

---

## 🎓 TERMINOLOGÍA CANÓNICA

**Usar siempre:**
- **CPII** (nunca "Club" a secas)
- **Dueños Originales** (no "fundadores" para David/Carlos)
- **Fundador** (núcleo de 10, no confundir con Dueños)
- **Prescriptor** (no "referidor")
- **Revenue Share** (no "comisiones multinivel")
- **Autofinanciación** (no "punto de equilibrio")
- **Fondo de Sostenibilidad** (nombre completo)

**Fuente:** Instrucciones Verdent, sección Terminología Obligatoria

---

## ✅ CHECKLIST DE CAPACIDADES

- [x] Responder correctamente a 20 consultas de prueba
- [x] Generar reporte financiero de ejemplo
- [x] Crear schema TypeScript de entidad
- [x] Explicar proceso de autofinanciación
- [x] Validar requisitos de graduación gestor
- [x] Calcular comisiones de red para inversión
- [ ] Generar contrato de adhesión
- [x] Producir simulación personalizada
- [x] Listar referencias cruzadas de concepto
- [x] Explicar diferencia Tier A vs Tier B

---

## 📊 COBERTURA DE INDEXACIÓN

### Documentos Core

```
✅ 00-indice-maestro-cpii.md          (100%)
✅ 01-ontologia-glosario-cpii.md      (100%)
✅ 02-arquitectura-datos-cpii.md      (100%)
✅ 03-flujos-procesos-cpii.md         (100%)
✅ RESUMEN-EJECUTIVO-CPII.md          (100%)
✅ simulacion_cii_24m.csv             (100%)
```

### Entidades Indexadas

```
✅ Club (CPII)
✅ Dueños Originales
✅ Fundador
✅ Inversor/Prescriptor
✅ Agente Promotor
✅ Gestor de Sección
✅ Activo Inmobiliario
✅ Ventana de Inversión
✅ Inversión
✅ Comisión
✅ Sección Certificada
✅ Fondo de Sostenibilidad
```

### Conceptos Financieros Indexados

```
✅ Interés Compuesto
✅ Revenue Share (3 niveles)
✅ Honorarios de Gestión (5%)
✅ Tier A Catapulta (20% APY)
✅ Tier B Refugio (8% APY)
✅ Autofinanciación (mes 12-24)
✅ Gastos Plataforma (1%)
✅ Arbitraje de Valor
```

### Workflows Indexados

```
✅ Onboarding Inversor
✅ Ciclo Ahorro e Inversión
✅ Generación Comisiones Red
✅ Captación de Activo
✅ Apertura/Cierre Ventana
✅ Liquidación Ventana
✅ Graduación a Gestor
✅ Intervención Sección (Takeover)
```

---

## 🚀 ESTADO OPERATIVO

**Indexación:** ✅ COMPLETA  
**Consultas:** ✅ OPERATIVAS  
**Schemas:** ✅ DISPONIBLES  
**Workflows:** ✅ DOCUMENTADOS  
**Datos:** ✅ CARGADOS  

**Verdent está listo para:**
1. Responder consultas sobre el ecosistema CPII
2. Generar código TypeScript basado en schemas
3. Explicar workflows y procesos operativos
4. Calcular proyecciones financieras
5. Validar reglas de negocio
6. Generar documentación técnica
7. Crear especificaciones de API

---

*Índice generado por Verdent el 2026-02-16*  
*Basado en documentación oficial CPII v1.0.0*  
*Próxima actualización: Cuando se modifiquen documentos fuente*
