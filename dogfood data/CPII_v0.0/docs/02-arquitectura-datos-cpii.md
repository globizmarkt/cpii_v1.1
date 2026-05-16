---
tipo: arquitectura-datos
dominio: club-privado-inversion-inmobiliaria
version: 1.0.0
fecha: 2026-02-15
tags: [cpii, datos, modelos, schemas, entidades]
dependencias: ["01-ontologia-glosario-cpii.md"]
metadatos:
  proposito: "Definir estructuras de datos y schemas para vibecoding"
  formato_salida: "JSON/TypeScript compatible"
---

# Arquitectura de Datos del CPII

## Tabla de Contenidos

1. [Schemas de Entidades Core](#schemas-de-entidades-core)
2. [Modelos de Negocio](#modelos-de-negocio)
3. [Estructuras de Datos Financieros](#estructuras-de-datos-financieros)
4. [Modelos de Relaciones](#modelos-de-relaciones)
5. [Datos de Simulación](#datos-de-simulación)

---

## Schemas de Entidades Core

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

interface PerfilUsuario {
  nombre: string;
  email: string;
  telefono?: string;
  pais: string;
  idioma: 'es' | 'pt' | 'en';
  referidoPor?: string; // ID del prescriptor
  enlaceInvitacion: string;
}

interface EstadoKYC {
  verificado: boolean;
  documentos: Documento[];
  fechaVerificacion?: Date;
  nivelVerificacion: 1 | 2 | 3;
}

interface EstructuraRed {
  nivel1: string[]; // IDs de hijos directos
  nivel2: string[]; // IDs de nietos
  nivel3: string[]; // IDs de bisnietos
  totalRed: number;
  activos: number; // miembros activos en la red
}

interface Patrimonio {
  capitalAportado: number;
  beneficiosAcumulados: number;
  comisionesRecibidas: number;
  patrimonioTotal: number;
  ultimaActualizacion: Date;
}
```

### Activo Inmobiliario

```typescript
interface ActivoInmobiliario {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: TipoActivo;
  ubicacion: Ubicacion;
  valorTasacion: number;
  documentacion: Documentacion;
  estado: EstadoActivo;
  ventana: VentanaInversion;
  captador: {
    id: string;
    nombre: string;
    honorarios: number; // 2.5%
  };
  rentabilidadEsperada: RentabilidadActivo;
  inversores: InversorActivo[];
  createdAt: Date;
  publishedAt?: Date;
}

type TipoActivo = 
  | 'preventa'
  | 'flip'
  | 'renta-estable'
  | 'multifamiliar'
  | 'residencia-estudiantes'
  | 'comercial'
  | 'terreno';

interface Ubicacion {
  pais: 'ES' | 'PT';
  ciudad: string;
  region: string;
  direccion?: string;
  coordenadas?: {
    lat: number;
    lng: number;
  };
}

interface Documentacion {
  nivel: 1 | 2;
  escrituras: boolean;
  planos: boolean;
  licencias: boolean;
  presupuestos: boolean;
  estudoMercado: boolean;
  contratoHonorarios: boolean;
  documentos: Documento[];
}

type EstadoActivo = 
  | 'draft'
  | 'revision'
  | 'published'
  | 'inversion-abierta'
  | 'inversion-cerrada'
  | 'en-ejecucion'
  | 'finalizado'
  | 'vendido';

interface RentabilidadActivo {
  tipo: 'catapulta' | 'refugio';
  rendimientoInversor: number; // % APY
  margenClub: number; // %
  duracion: number; // meses
  proyeccionBeneficio: number;
}

interface InversorActivo {
  usuarioId: string;
  capitalInvertido: number;
  fraccion: number; // % del total
  fechaInversion: Date;
  rendimientoEsperado: number;
}
```

### Ventana de Inversión

```typescript
interface VentanaInversion {
  id: string;
  numero: number; // Q1, Q2, Q3, Q4
  año: number;
  tipo: 'catapulta' | 'refugio';
  fechaApertura: Date;
  fechaCierre: Date;
  capitalObjetivo: number;
  capitalCaptado: number;
  activos: string[]; // IDs de activos
  estado: 'programada' | 'abierta' | 'cerrada' | 'en-ejecucion' | 'liquidada';
  rendimiento: {
    esperado: number; // % APY
    real?: number; // % APY final
  };
  inversores: {
    usuarioId: string;
    monto: number;
  }[];
}

// Calendario de Ventanas
interface CalendarioVentanas {
  año: number;
  ventanas: {
    Q1: VentanaInversion; // Catapulta
    Q2: VentanaInversion; // Refugio
    Q3: VentanaInversion; // Catapulta
    Q4: VentanaInversion; // Refugio
  };
}
```

### Inversión

```typescript
interface Inversion {
  id: string;
  usuarioId: string;
  ventanaId: string;
  activoId?: string;
  monto: number;
  tipo: 'directa' | 'acumulada' | 'comisiones-reinvertidas';
  fechaInversion: Date;
  estado: 'pendiente' | 'confirmada' | 'en-ejecucion' | 'liquidada' | 'cancelada';
  rendimiento: {
    esperado: number;
    acumulado: number;
    liquidado: number;
  };
  comisiones: ComisionInversion[];
  origen: OrigenCapital;
}

interface OrigenCapital {
  ahorroPropio: number;
  comisionesRed: number;
  beneficiosReinvertidos: number;
}

interface ComisionInversion {
  beneficiarioId: string;
  nivel: 1 | 2 | 3;
  porcentaje: number; // 1%, 0.5%, 0.25%
  monto: number;
  estado: 'pendiente' | 'pagada';
  fechaPago?: Date;
}
```

### Comisión

```typescript
interface Comision {
  id: string;
  tipo: 'revenue-share' | 'captacion-activo' | 'venta-exclusiva' | 'gestion-inversores';
  origen: string; // ID de inversión o activo
  beneficiarioId: string;
  pagadorId?: string;
  monto: number;
  porcentaje: number;
  baseCalculo: number;
  nivel?: 1 | 2 | 3; // para revenue share
  estado: 'pendiente' | 'aprobada' | 'pagada' | 'cancelada';
  fechaGeneracion: Date;
  fechaPago?: Date;
  metadata: {
    concepto: string;
    detalles: Record<string, any>;
  };
}
```

### Sección Certificada

```typescript
interface SeccionCertificada {
  id: string;
  nombre: string;
  gestorId: string;
  fechaGraduacion: Date;
  marca: {
    nombre: string;
    logo?: string;
    cobranding: boolean; // siempre true
  };
  volumenGestionado: {
    actual: number;
    historico: HistorialVolumen[];
    objetivo: number; // 1M EUR
  };
  beneficios: {
    totalGenerado: number;
    participacionGestor: number; // 50%
    participacionMatriz: number; // 50%
  };
  equipo: {
    agentes: string[];
    agentesJunior: string[];
  };
  estado: 'activa' | 'monitoreada' | 'intervenida' | 'suspendida';
  cumplimiento: {
    semaforoSalud: 'verde' | 'amarillo' | 'rojo';
    ultimaAuditoria: Date;
    observaciones: string[];
  };
}

interface HistorialVolumen {
  mes: number;
  año: number;
  volumen: number;
  activos: string[];
}
```

---

## Modelos de Negocio

### Modelo Tier A: Catapulta (100K EUR)

```json
{
  "nombre": "Ciclo Catapulta",
  "codigo": "TIER_A",
  "capital_gestionado": 100000,
  "duracion_meses": 6,
  "rendimientos": {
    "margen_bruto_club": {
      "porcentaje": 30,
      "monto": 30000
    },
    "rendimiento_inversor": {
      "porcentaje_apy": 20,
      "monto_6m": 10000,
      "equivalente_anual": 20
    }
  },
  "gastos_operativos": {
    "comisiones_red": {
      "porcentaje": 1.75,
      "monto": 1750,
      "desglose": {
        "nivel_1": 1000,
        "nivel_2": 500,
        "nivel_3": 250
      }
    },
    "gestion_plataforma": {
      "porcentaje": 1,
      "monto": 1000,
      "desglose": {
        "leirum": 500,
        "tecnologia_propia": 500
      }
    },
    "gestion_administrativa": 100,
    "marketing": 50,
    "total": 2900
  },
  "flujo_beneficios": {
    "beneficio_bruto": 20000,
    "menos_gastos": 2900,
    "beneficio_neto": 17100,
    "fondo_sostenibilidad": {
      "porcentaje": 50,
      "monto": 8550
    },
    "beneficio_disponible_gestores": 8550
  }
}
```

### Modelo Tier B: Refugio (1M EUR)

```json
{
  "nombre": "Ciclo Refugio",
  "codigo": "TIER_B",
  "capital_gestionado": 1000000,
  "duracion_meses": 12,
  "rendimientos": {
    "margen_bruto_club": {
      "porcentaje": 12,
      "monto": 120000
    },
    "rendimiento_inversor": {
      "porcentaje_apy": 8,
      "monto_anual": 80000
    }
  },
  "gastos_operativos": {
    "comisiones_red": {
      "porcentaje": 1.75,
      "monto": 17500
    },
    "gestion_plataforma": {
      "porcentaje": 1,
      "monto": 10000,
      "desglose": {
        "leirum": 5000,
        "tecnologia_propia": 5000
      }
    },
    "gestion_administrativa": 100,
    "marketing": 50,
    "total": 27650
  },
  "flujo_beneficios": {
    "beneficio_bruto": 40000,
    "menos_gastos": 27650,
    "beneficio_neto": 12350,
    "fondo_sostenibilidad": {
      "porcentaje": 50,
      "monto": 6175
    },
    "beneficio_disponible_gestores": 6175
  }
}
```

### Modelo de Revenue Share

```json
{
  "nombre": "Sistema Multinivel 1x1",
  "estructura": {
    "nivel_1_hijo": {
      "porcentaje": 1.0,
      "base_calculo": "capital_invertido_por_referido",
      "relacion": "directo",
      "ejemplo_100eur": 1.0
    },
    "nivel_2_nieto": {
      "porcentaje": 0.5,
      "base_calculo": "capital_invertido_por_referido_nivel_2",
      "relacion": "indirecto",
      "ejemplo_100eur": 0.5
    },
    "nivel_3_bisnieto": {
      "porcentaje": 0.25,
      "base_calculo": "capital_invertido_por_referido_nivel_3",
      "relacion": "indirecto",
      "ejemplo_100eur": 0.25
    }
  },
  "liquidacion": {
    "momento": ["cierre_inversion", "reparto_beneficios_anual"],
    "automatica": true,
    "trazabilidad": "enlace_invitacion_digital"
  },
  "norma_prescripcion": {
    "frecuencia": "mensual",
    "objetivo": "1_nuevo_inversor_por_mes",
    "minimo": 1,
    "recomendado": 1
  }
}
```

### Modelo de Honorarios

```json
{
  "honorarios_operacion_inmobiliaria": {
    "porcentaje_total": 5,
    "incluido_en_precio": true,
    "desglose": {
      "gestion_inversores": {
        "porcentaje": 2.5,
        "beneficiarios": ["David Almeida", "Carlos Balboa"],
        "responsabilidad": "Acompañamiento y seguridad del capital"
      },
      "captacion_activo": {
        "porcentaje": 2.5,
        "beneficiario": "Agente Promotor",
        "responsabilidad": "Estructuración documental y validación del activo"
      }
    }
  },
  "comision_venta_exclusiva": {
    "porcentaje": 5,
    "beneficiario": "Agente que captó el activo",
    "condiciones": [
      "Ser agente de venta en exclusiva",
      "Seguir directrices del Club",
      "Periodo definido de exclusividad"
    ],
    "momento_pago": "cierre_venta_final"
  },
  "gasto_plataforma": {
    "porcentaje": 1,
    "obligatorio": true,
    "momento": "financiacion_activo",
    "desglose": {
      "leirum": 0.5,
      "tecnologia_propia": 0.5
    }
  }
}
```

---

## Estructuras de Datos Financieros

### Simulación de Crecimiento (Modelo 50 EUR/mes)

```typescript
interface SimulacionCrecimiento {
  mes: number;
  ahorro_mensual: number; // 50 EUR constante
  comisiones_red: number; // Variable según crecimiento
  inversion_trimestral: number; // 0 o 150+ cuando hay ventana
  patrimonio_acumulado: number;
  estructura_red: {
    L1: number; // Nivel 1 - Hijos
    L2: number; // Nivel 2 - Nietos
    L3: number; // Nivel 3 - Bisnietos
  };
}

// Datos de simulación reales (24 meses)
const simulacion24meses: SimulacionCrecimiento[] = [
  {mes: 1, ahorro_mensual: 50, comisiones_red: 0.5, inversion_trimestral: 0, patrimonio_acumulado: 50.5, estructura_red: {L1: 1, L2: 0, L3: 0}},
  {mes: 2, ahorro_mensual: 50, comisiones_red: 1.25, inversion_trimestral: 0, patrimonio_acumulado: 101.75, estructura_red: {L1: 2, L2: 1, L3: 0}},
  {mes: 3, ahorro_mensual: 50, comisiones_red: 2.38, inversion_trimestral: 154.12, patrimonio_acumulado: 154.12, estructura_red: {L1: 3, L2: 3, L3: 1}},
  // ... [resto de datos del CSV]
  {mes: 12, ahorro_mensual: 50, comisiones_red: 50.00, inversion_trimestral: 271.12, patrimonio_acumulado: 818.68, estructura_red: {L1: 12, L2: 66, L3: 220}},
  // ... [continúa hasta mes 24]
  {mes: 24, ahorro_mensual: 50, comisiones_red: 334.00, inversion_trimestral: 1041.38, patrimonio_acumulado: 3721.57, estructura_red: {L1: 24, L2: 276, L3: 2024}}
];
```

### Proyecciones Patrimoniales

```typescript
interface ProyeccionPatrimonial {
  horizonte: number; // años
  escenario: 'conservador' | 'realista' | 'optimista';
  capital_aportado: number;
  patrimonio_estimado: number;
  tasa_crecimiento_anual: number; // %
  contribucion_ahorro: number; // %
  contribucion_comisiones: number; // %
  contribucion_rendimientos: number; // %
  hitos: Hito[];
}

interface Hito {
  mes: number;
  descripcion: string;
  patrimonio: number;
  significado: string;
}

const proyecciones: Record<string, ProyeccionPatrimonial> = {
  "1_año": {
    horizonte: 1,
    escenario: 'realista',
    capital_aportado: 600,
    patrimonio_estimado: 684,
    tasa_crecimiento_anual: 14,
    contribucion_ahorro: 87.7,
    contribucion_comisiones: 7.3,
    contribucion_rendimientos: 5.0,
    hitos: [
      {mes: 3, descripcion: "Primera inversión trimestral", patrimonio: 154.12, significado: "Ingreso al ciclo"},
      {mes: 6, descripcion: "Primera salida catapulta", patrimonio: 323.62, significado: "Validación del modelo"},
      {mes: 12, descripcion: "Hito de autofinanciación", patrimonio: 818.68, significado: "Comisiones cubren ahorro"}
    ]
  },
  "5_años": {
    horizonte: 5,
    escenario: 'realista',
    capital_aportado: 3000,
    patrimonio_estimado: 5200,
    tasa_crecimiento_anual: 73.3,
    contribucion_ahorro: 57.7,
    contribucion_comisiones: 22.3,
    contribucion_rendimientos: 20.0,
    hitos: []
  },
  "10_años": {
    horizonte: 10,
    escenario: 'realista',
    capital_aportado: 6000,
    patrimonio_estimado: 18500,
    tasa_crecimiento_anual: 208.3,
    contribucion_ahorro: 32.4,
    contribucion_comisiones: 37.6,
    contribucion_rendimientos: 30.0,
    hitos: []
  },
  "15_años": {
    horizonte: 15,
    escenario: 'realista',
    capital_aportado: 9000,
    patrimonio_estimado: 54000,
    tasa_crecimiento_anual: 500.0,
    contribucion_ahorro: 16.7,
    contribucion_comisiones: 48.3,
    contribucion_rendimientos: 35.0,
    hitos: []
  }
};
```

### Cálculos de Comisiones

```typescript
interface CalculoComisiones {
  inversion_base: number;
  red: EstructuraRed;
  comisiones_generadas: {
    nivel_1: {
      inversores: number;
      monto_por_inversor: number;
      total: number;
    };
    nivel_2: {
      inversores: number;
      monto_por_inversor: number;
      total: number;
    };
    nivel_3: {
      inversores: number;
      monto_por_inversor: number;
      total: number;
    };
    total_comisiones: number;
  };
}

function calcularComisionesRed(
  inversionBase: number,
  estructuraRed: EstructuraRed
): CalculoComisiones {
  const nivel1 = estructuraRed.nivel1.length * inversionBase * 0.01;
  const nivel2 = estructuraRed.nivel2.length * inversionBase * 0.005;
  const nivel3 = estructuraRed.nivel3.length * inversionBase * 0.0025;
  
  return {
    inversion_base: inversionBase,
    red: estructuraRed,
    comisiones_generadas: {
      nivel_1: {
        inversores: estructuraRed.nivel1.length,
        monto_por_inversor: inversionBase * 0.01,
        total: nivel1
      },
      nivel_2: {
        inversores: estructuraRed.nivel2.length,
        monto_por_inversor: inversionBase * 0.005,
        total: nivel2
      },
      nivel_3: {
        inversores: estructuraRed.nivel3.length,
        monto_por_inversor: inversionBase * 0.0025,
        total: nivel3
      },
      total_comisiones: nivel1 + nivel2 + nivel3
    }
  };
}
```

---

## Modelos de Relaciones

### Grafo de Relaciones

```typescript
interface GrafoRelaciones {
  nodos: Nodo[];
  aristas: Arista[];
}

interface Nodo {
  id: string;
  tipo: 'usuario' | 'activo' | 'ventana' | 'seccion' | 'comision';
  datos: any;
}

interface Arista {
  id: string;
  tipo: TipoRelacion;
  origen: string; // ID del nodo
  destino: string; // ID del nodo
  metadata: Record<string, any>;
  timestamp: Date;
}

type TipoRelacion =
  | 'invita' // Prescriptor → Inversor
  | 'refiere' // Inversor → Inversor (alias de invita)
  | 'invierte_en' // Inversor → Ventana/Activo
  | 'capta' // Agente → Activo
  | 'gestiona' // Gestor → Sección
  | 'gobierna' // Dueños → Club
  | 'pertenece_a' // Activo → Ventana
  | 'genera_comision' // Inversión → Comisión
  | 'recibe_comision' // Usuario → Comisión
  | 'forma_parte' // Agente → Sección
  | 'supervisa' // Gestor Senior → Agente Junior
  | 'audita'; // Comité → Sección/Activo

// Ejemplo de consulta de grafo
interface ConsultaGrafo {
  encontrarRed(usuarioId: string, profundidad: number): Nodo[];
  calcularInfluencia(usuarioId: string): number;
  trazarComisiones(inversionId: string): Arista[];
  validarCiclos(): boolean;
}
```

### Árbol Genealógico (Revenue Share)

```typescript
interface ArbolGenealogico {
  raiz: string; // ID del prescriptor original
  generaciones: Generacion[];
  profundidad: number;
  totalDescendientes: number;
}

interface Generacion {
  nivel: 1 | 2 | 3;
  miembros: MiembroGeneracion[];
  comision_porcentaje: number;
}

interface MiembroGeneracion {
  id: string;
  padre: string;
  fechaIngreso: Date;
  estado: 'activo' | 'inactivo';
  contribucionCapital: number;
  comisionesGeneradas: number;
}

// Función para construir árbol
function construirArbolGenealogico(raizId: string): ArbolGenealogico {
  // Implementación que recorre el grafo de relaciones
  // y construye el árbol de 3 niveles
}
```

---

## Datos de Simulación

### Dataset Completo 24 Meses

```json
{
  "metadata": {
    "modelo": "Ahorro 50 EUR/mes + Prescripción 1x1",
    "supuestos": {
      "ahorro_mensual_constante": 50,
      "ventanas_inversion": "trimestral",
      "alternancia_ciclos": ["catapulta_20%", "refugio_8%"],
      "prescripcion": "1_nuevo_inversor_por_mes",
      "replica_red": "todos_prescriben_1x1"
    },
    "hitos_clave": [
      {"mes": 3, "evento": "Primera inversión trimestral"},
      {"mes": 6, "evento": "Primera salida catapulta"},
      {"mes": 12, "evento": "Autofinanciación alcanzada"},
      {"mes": 24, "evento": "Red consolidada"}
    ]
  },
  "datos": [
    {"mes": 1, "ahorro": 50, "comisiones": 0.5, "inversion_trim": 0, "patrimonio": 50.5, "red": {"L1": 1, "L2": 0, "L3": 0}},
    {"mes": 2, "ahorro": 50, "comisiones": 1.25, "inversion_trim": 0, "patrimonio": 101.75, "red": {"L1": 2, "L2": 1, "L3": 0}},
    {"mes": 3, "ahorro": 50, "comisiones": 2.38, "inversion_trim": 154.12, "patrimonio": 154.12, "red": {"L1": 3, "L2": 3, "L3": 1}},
    {"mes": 4, "ahorro": 50, "comisiones": 4.0, "inversion_trim": 0, "patrimonio": 208.12, "red": {"L1": 4, "L2": 6, "L3": 4}},
    {"mes": 5, "ahorro": 50, "comisiones": 6.25, "inversion_trim": 0, "patrimonio": 264.38, "red": {"L1": 5, "L2": 10, "L3": 10}},
    {"mes": 6, "ahorro": 50, "comisiones": 9.25, "inversion_trim": 169.5, "patrimonio": 323.62, "red": {"L1": 6, "L2": 15, "L3": 20}},
    {"mes": 7, "ahorro": 50, "comisiones": 13.12, "inversion_trim": 0, "patrimonio": 386.75, "red": {"L1": 7, "L2": 21, "L3": 35}},
    {"mes": 8, "ahorro": 50, "comisiones": 18.0, "inversion_trim": 0, "patrimonio": 454.75, "red": {"L1": 8, "L2": 28, "L3": 56}},
    {"mes": 9, "ahorro": 50, "comisiones": 24.0, "inversion_trim": 547.55, "patrimonio": 547.55, "red": {"L1": 9, "L2": 36, "L3": 84}},
    {"mes": 10, "ahorro": 50, "comisiones": 31.25, "inversion_trim": 0, "patrimonio": 628.8, "red": {"L1": 10, "L2": 45, "L3": 120}},
    {"mes": 11, "ahorro": 50, "comisiones": 39.88, "inversion_trim": 0, "patrimonio": 718.68, "red": {"L1": 11, "L2": 55, "L3": 165}},
    {"mes": 12, "ahorro": 50, "comisiones": 50.0, "inversion_trim": 271.12, "patrimonio": 818.68, "red": {"L1": 12, "L2": 66, "L3": 220}},
    {"mes": 13, "ahorro": 50, "comisiones": 61.75, "inversion_trim": 0, "patrimonio": 930.43, "red": {"L1": 13, "L2": 78, "L3": 286}},
    {"mes": 14, "ahorro": 50, "comisiones": 75.25, "inversion_trim": 0, "patrimonio": 1055.68, "red": {"L1": 14, "L2": 91, "L3": 364}},
    {"mes": 15, "ahorro": 50, "comisiones": 90.62, "inversion_trim": 1256.48, "patrimonio": 1256.48, "red": {"L1": 15, "L2": 105, "L3": 455}},
    {"mes": 16, "ahorro": 50, "comisiones": 108.0, "inversion_trim": 0, "patrimonio": 1414.48, "red": {"L1": 16, "L2": 120, "L3": 560}},
    {"mes": 17, "ahorro": 50, "comisiones": 127.5, "inversion_trim": 0, "patrimonio": 1591.98, "red": {"L1": 17, "L2": 136, "L3": 680}},
    {"mes": 18, "ahorro": 50, "comisiones": 149.25, "inversion_trim": 534.75, "patrimonio": 1791.23, "red": {"L1": 18, "L2": 153, "L3": 816}},
    {"mes": 19, "ahorro": 50, "comisiones": 173.38, "inversion_trim": 0, "patrimonio": 2014.61, "red": {"L1": 19, "L2": 171, "L3": 969}},
    {"mes": 20, "ahorro": 50, "comisiones": 200.0, "inversion_trim": 0, "patrimonio": 2264.61, "red": {"L1": 20, "L2": 190, "L3": 1140}},
    {"mes": 21, "ahorro": 50, "comisiones": 229.25, "inversion_trim": 2680.2, "patrimonio": 2680.2, "red": {"L1": 21, "L2": 210, "L3": 1330}},
    {"mes": 22, "ahorro": 50, "comisiones": 261.25, "inversion_trim": 0, "patrimonio": 2991.45, "red": {"L1": 22, "L2": 231, "L3": 1540}},
    {"mes": 23, "ahorro": 50, "comisiones": 296.12, "inversion_trim": 0, "patrimonio": 3337.57, "red": {"L1": 23, "L2": 253, "L3": 1771}},
    {"mes": 24, "ahorro": 50, "comisiones": 334.0, "inversion_trim": 1041.38, "patrimonio": 3721.57, "red": {"L1": 24, "L2": 276, "L3": 2024}}
  ]
}
```

---

## Referencias Cruzadas

**Ver también:**
- [Ontología y Glosario](01-ontologia-glosario-cpii.md)
- [Flujos de Procesos](03-flujos-procesos-cpii.md)
- [Modelos Financieros Detallados](04-modelos-financieros-cpii.md)

---

## Metadatos de Integración

```json
{
  "schemas_typescript": [
    "Usuario", "ActivoInmobiliario", "VentanaInversion",
    "Inversion", "Comision", "SeccionCertificada"
  ],
  "relaciones_principales": [
    "Usuario.red → Usuario[]",
    "Usuario.inversiones → Inversion[]",
    "Inversion.comisiones → Comision[]",
    "ActivoInmobiliario.inversores → Usuario[]",
    "SeccionCertificada.gestor → Usuario",
    "VentanaInversion.activos → ActivoInmobiliario[]"
  ],
  "indices_recomendados": [
    "Usuario.id",
    "Usuario.enlaceInvitacion",
    "Usuario.referidoPor",
    "ActivoInmobiliario.estado",
    "VentanaInversion.estado",
    "Comision.beneficiarioId",
    "Comision.estado"
  ],
  "eventos_sistema": [
    "usuario.registrado",
    "usuario.kyc_completado",
    "inversion.creada",
    "inversion.confirmada",
    "ventana.abierta",
    "ventana.cerrada",
    "comision.generada",
    "comision.pagada",
    "activo.publicado",
    "gestor.graduado"
  ]
}
```

---

*Documento generado por Sistema de Arquitectura de Información CPII v1.0*
*Última actualización: 2026-02-15*
