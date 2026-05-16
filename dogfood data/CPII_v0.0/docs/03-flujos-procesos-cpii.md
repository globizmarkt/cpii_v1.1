---
tipo: flujos-procesos
dominio: club-privado-inversion-inmobiliaria
version: 1.0.0
fecha: 2026-02-15
tags: [cpii, workflows, procesos, operaciones]
dependencias: ["01-ontologia-glosario-cpii.md", "02-arquitectura-datos-cpii.md"]
metadatos:
  proposito: "Documentar flujos operativos y workflows del CPII"
  formato: "Diagramas textuales + Pseudocódigo"
---

# Flujos de Procesos del CPII

## Tabla de Contenidos

1. [Ciclo de Vida del Inversor](#ciclo-de-vida-del-inversor)
2. [Ciclo de Vida del Activo](#ciclo-de-vida-del-activo)
3. [Proceso de Ventanas de Inversión](#proceso-de-ventanas-de-inversión)
4. [Flujo de Revenue Share](#flujo-de-revenue-share)
5. [Proceso de Graduación a Gestor](#proceso-de-graduación-a-gestor)
6. [Workflows de Gobernanza](#workflows-de-gobernanza)

---

## Ciclo de Vida del Inversor

### Diagrama de Estados

```
┌─────────────┐
│  Anónimo    │
└──────┬──────┘
       │ registro
       ▼
┌─────────────┐
│ Registrado  │
└──────┬──────┘
       │ KYC
       ▼
┌─────────────┐
│ Verificado  │──┐
└──────┬──────┘  │
       │         │ activación automática
       │         ▼
       │    ┌─────────────┐
       │    │ Prescriptor │◄──┐
       │    └──────┬──────┘   │
       │           │          │ crecimiento red
       │           │          │
       ▼           ▼          │
┌─────────────────────┐       │
│ Inversor Activo     │───────┘
└──────┬──────────────┘
       │ acumula patrimonio
       ▼
┌─────────────────────┐
│ Autofinanciado      │ (mes 12-24)
└──────┬──────────────┘
       │ opcional: escalado profesional
       ▼
┌─────────────────────┐
│ Agente Promotor     │
└──────┬──────────────┘
       │ hito 1M EUR en 2 años
       ▼
┌─────────────────────┐
│ Gestor de Sección   │
└─────────────────────┘
```

### Workflow Detallado: Onboarding Inversor

```typescript
async function onboardingInversor(datos: DatosRegistro): Promise<Usuario> {
  // FASE 1: Registro
  const usuario = await crearUsuario({
    email: datos.email,
    nombre: datos.nombre,
    pais: datos.pais,
    referidoPor: datos.enlaceInvitacion ? extraerReferidorId(datos.enlaceInvitacion) : null
  });
  
  // FASE 2: KYC
  await solicitarDocumentosKYC(usuario.id);
  await esperarVerificacionKYC(usuario.id);
  
  // FASE 3: Activación como Prescriptor (automática)
  const enlaceInvitacion = await generarEnlaceInvitacion(usuario.id);
  await actualizarUsuario(usuario.id, {
    tipo: 'prescriptor',
    enlaceInvitacion
  });
  
  // FASE 4: Registro en árbol genealógico
  if (usuario.referidoPor) {
    await registrarEnRed(usuario.id, usuario.referidoPor);
  }
  
  // FASE 5: Acceso a plataforma
  await concederAccesoPlataforma(usuario.id, ['dashboard', 'ventanas', 'red']);
  
  // FASE 6: Notificación y formación
  await enviarBienvenida(usuario.id);
  await asignarFormacionInicial(usuario.id);
  
  return await obtenerUsuario(usuario.id);
}

async function registrarEnRed(usuarioId: string, referidorId: string): Promise<void> {
  // Determinar nivel en la red
  const referidor = await obtenerUsuario(referidorId);
  
  // Actualizar nivel 1 del referidor
  await agregarANivel(referidorId, 1, usuarioId);
  
  // Propagar a niveles superiores
  if (referidor.referidoPor) {
    const abuelo = referidor.referidoPor;
    await agregarANivel(abuelo, 2, usuarioId);
    
    const abueloData = await obtenerUsuario(abuelo);
    if (abueloData.referidoPor) {
      const bisabuelo = abueloData.referidoPor;
      await agregarANivel(bisabuelo, 3, usuarioId);
    }
  }
}
```

### Workflow: Ciclo de Ahorro e Inversión

```typescript
async function cicloAhorroInversion(usuarioId: string): Promise<void> {
  const AHORRO_MENSUAL = 50;
  
  while (true) {
    // Cada mes
    await registrarAhorro(usuarioId, AHORRO_MENSUAL);
    
    const mes = obtenerMesActual();
    
    // Cada trimestre (meses 3, 6, 9, 12...)
    if (mes % 3 === 0) {
      const capitalDisponible = await calcularCapitalDisponible(usuarioId);
      const ventanaActiva = await obtenerVentanaActiva();
      
      if (ventanaActiva && capitalDisponible >= 100) {
        await realizarInversion({
          usuarioId,
          ventanaId: ventanaActiva.id,
          monto: capitalDisponible
        });
        
        // Generar comisiones para la red
        await generarComisionesRed(usuarioId, capitalDisponible);
      }
    }
    
    // Verificar hito de autofinanciación
    const comisionesMensuales = await calcularComisionesMensuales(usuarioId);
    if (comisionesMensuales >= AHORRO_MENSUAL) {
      await notificarHitoAutofinanciacion(usuarioId);
    }
    
    await esperarProximoMes();
  }
}

async function generarComisionesRed(inversorId: string, monto: number): Promise<void> {
  const inversor = await obtenerUsuario(inversorId);
  
  if (!inversor.referidoPor) return;
  
  // Nivel 1: 1%
  await crearComision({
    beneficiarioId: inversor.referidoPor,
    origen: inversorId,
    tipo: 'revenue-share',
    nivel: 1,
    porcentaje: 1.0,
    monto: monto * 0.01,
    baseCalculo: monto
  });
  
  const padre = await obtenerUsuario(inversor.referidoPor);
  
  if (padre.referidoPor) {
    // Nivel 2: 0.5%
    await crearComision({
      beneficiarioId: padre.referidoPor,
      origen: inversorId,
      tipo: 'revenue-share',
      nivel: 2,
      porcentaje: 0.5,
      monto: monto * 0.005,
      baseCalculo: monto
    });
    
    const abuelo = await obtenerUsuario(padre.referidoPor);
    
    if (abuelo.referidoPor) {
      // Nivel 3: 0.25%
      await crearComision({
        beneficiarioId: abuelo.referidoPor,
        origen: inversorId,
        tipo: 'revenue-share',
        nivel: 3,
        porcentaje: 0.25,
        monto: monto * 0.0025,
        baseCalculo: monto
      });
    }
  }
}
```

---

## Ciclo de Vida del Activo

### Diagrama de Estados

```
┌──────────────┐
│   Draft      │ (Gratuito, trabajo en curso)
└──────┬───────┘
       │ validación Nivel 2
       ▼
┌──────────────┐
│  Revisión    │ (Comité evalúa)
└──────┬───────┘
       │ aprobación
       ▼
┌──────────────┐
│  Published   │ (Visible, sin inversión activa)
└──────┬───────┘
       │ asignación a ventana
       ▼
┌───────────────────┐
│ Inversión Abierta │
└──────┬────────────┘
       │ capital objetivo alcanzado
       ▼
┌───────────────────┐
│ Inversión Cerrada │
└──────┬────────────┘
       │ inicio proyecto
       ▼
┌───────────────────┐
│  En Ejecución     │
└──────┬────────────┘
       │ proyecto completo
       ▼
┌───────────────────┐
│   Finalizado      │ (reparto beneficios)
└──────┬────────────┘
       │ mandato venta exclusiva
       ▼
┌───────────────────┐
│     Vendido       │
└───────────────────┘
```

### Workflow: Captación de Activo

```typescript
async function captarActivo(datos: DatosActivo, agenteId: string): Promise<ActivoInmobiliario> {
  // FASE 1: Creación en Draft
  const activo = await crearActivo({
    ...datos,
    estado: 'draft',
    captador: {
      id: agenteId,
      honorarios: datos.valorTasacion * 0.025 // 2.5%
    },
    documentacion: {
      nivel: 1,
      escrituras: false,
      planos: false,
      licencias: false,
      presupuestos: false,
      estudoMercado: false
    }
  });
  
  // FASE 2: Notificación al agente
  await notificarAgente(agenteId, {
    tipo: 'activo_creado',
    mensaje: 'Completa documentación Nivel 2 para revisión'
  });
  
  return activo;
}

async function completarNivel2(activoId: string, documentos: Documento[]): Promise<void> {
  // Validar documentación obligatoria
  const requeridos = ['escrituras', 'planos', 'licencias', 'presupuestos', 'estudoMercado', 'contratoHonorarios'];
  
  for (const doc of requeridos) {
    if (!documentos.find(d => d.tipo === doc)) {
      throw new Error(`Falta documento: ${doc}`);
    }
  }
  
  // Actualizar activo
  await actualizarActivo(activoId, {
    'documentacion.nivel': 2,
    'documentacion.escrituras': true,
    'documentacion.planos': true,
    'documentacion.licencias': true,
    'documentacion.presupuestos': true,
    'documentacion.estudoMercado': true,
    'documentacion.contratoHonorarios': true,
    'documentacion.documentos': documentos,
    estado: 'revision'
  });
  
  // Notificar al Comité
  await notificarComite(activoId);
}

async function procesarRevisionComite(activoId: string, decision: Decision): Promise<void> {
  if (decision.aprobado) {
    await actualizarActivo(activoId, {
      estado: 'published',
      publishedAt: new Date()
    });
    
    // Añadir honorarios al precio
    const activo = await obtenerActivo(activoId);
    const precioConHonorarios = activo.valorTasacion * 1.05; // +5%
    
    await actualizarActivo(activoId, {
      precioFinal: precioConHonorarios
    });
    
    await notificarPublicacion(activoId);
  } else {
    await actualizarActivo(activoId, {
      estado: 'draft'
    });
    
    await notificarRechazo(activoId, decision.observaciones);
  }
}
```

### Workflow: Asignación a Ventana

```typescript
async function asignarActivoAVentana(activoId: string, ventanaId: string): Promise<void> {
  const activo = await obtenerActivo(activoId);
  const ventana = await obtenerVentana(ventanaId);
  
  // Validaciones
  if (activo.estado !== 'published') {
    throw new Error('Activo debe estar publicado');
  }
  
  if (ventana.estado !== 'abierta') {
    throw new Error('Ventana debe estar abierta');
  }
  
  // Verificar coherencia tipo activo - tipo ventana
  if (!esCompatible(activo.rentabilidadEsperada.tipo, ventana.tipo)) {
    throw new Error('Tipo de activo incompatible con ventana');
  }
  
  // Asignar
  await actualizarActivo(activoId, {
    ventana: {
      id: ventanaId,
      tipo: ventana.tipo
    },
    estado: 'inversion-abierta'
  });
  
  await agregarActivoAVentana(ventanaId, activoId);
  
  // Notificar inversores
  await notificarInversores({
    tipo: 'nuevo_activo_disponible',
    ventanaId,
    activoId
  });
}
```

---

## Proceso de Ventanas de Inversión

### Calendario Anual

```
Año 2026:
├── Q1 (Ene-Mar) → Catapulta (20% / 6 meses)
│   ├── Apertura: 01-Ene-2026
│   ├── Cierre: 31-Mar-2026
│   └── Liquidación esperada: 30-Jun-2026
│
├── Q2 (Abr-Jun) → Refugio (8% / 12 meses)
│   ├── Apertura: 01-Abr-2026
│   ├── Cierre: 30-Jun-2026
│   └── Liquidación esperada: 30-Jun-2027
│
├── Q3 (Jul-Sep) → Catapulta (20% / 6 meses)
│   ├── Apertura: 01-Jul-2026
│   ├── Cierre: 30-Sep-2026
│   └── Liquidación esperada: 31-Dic-2026
│
└── Q4 (Oct-Dic) → Refugio (8% / 12 meses)
    ├── Apertura: 01-Oct-2026
    ├── Cierre: 31-Dic-2026
    └── Liquidación esperada: 31-Dic-2027
```

### Workflow: Apertura de Ventana

```typescript
async function aperturaVentana(trimestre: number, año: number): Promise<VentanaInversion> {
  const tipo = (trimestre % 2 === 1) ? 'catapulta' : 'refugio';
  
  const ventana = await crearVentana({
    numero: trimestre,
    año,
    tipo,
    fechaApertura: obtenerFechaInicioTrimestre(trimestre, año),
    fechaCierre: obtenerFechaFinTrimestre(trimestre, año),
    capitalObjetivo: tipo === 'catapulta' ? 100000 : 1000000,
    estado: 'abierta',
    rendimiento: {
      esperado: tipo === 'catapulta' ? 20 : 8
    }
  });
  
  // Notificar a todos los inversores
  await notificarAperturaVentana(ventana);
  
  // Activar sistema de acumulación trimestral
  await activarAcumulacionTrimestral(ventana.id);
  
  return ventana;
}

async function cierreVentana(ventanaId: string): Promise<void> {
  const ventana = await obtenerVentana(ventanaId);
  
  // Procesar inversiones pendientes
  await procesarInversionesPendientes(ventanaId);
  
  // Cambiar estado
  await actualizarVentana(ventanaId, {
    estado: 'cerrada',
    capitalCaptado: await calcularCapitalTotal(ventanaId)
  });
  
  // Asignar inversores a activos
  await distribuirInversoresEnActivos(ventanaId);
  
  // Iniciar ejecución de proyectos
  await iniciarEjecucionProyectos(ventanaId);
  
  // Programar liquidación
  const fechaLiquidacion = calcularFechaLiquidacion(ventana);
  await programarLiquidacion(ventanaId, fechaLiquidacion);
}

async function liquidacionVentana(ventanaId: string): Promise<void> {
  const ventana = await obtenerVentana(ventanaId);
  
  // Calcular rendimientos reales
  const rendimientoReal = await calcularRendimientoReal(ventanaId);
  
  // Distribuir beneficios a inversores
  for (const inv of ventana.inversores) {
    const beneficio = inv.monto * (rendimientoReal / 100);
    await acreditarBeneficio(inv.usuarioId, beneficio);
  }
  
  // Liquidar comisiones de red
  await liquidarComisionesRed(ventanaId);
  
  // Calcular beneficio neto del Club
  const beneficioNeto = await calcularBeneficioNeto(ventanaId);
  
  // Dotar Fondo de Sostenibilidad (50%)
  await dotarFondoSostenibilidad(beneficioNeto * 0.5);
  
  // Distribuir beneficio a gestores (50%)
  await distribuirBeneficioGestores(ventanaId, beneficioNeto * 0.5);
  
  // Actualizar estado
  await actualizarVentana(ventanaId, {
    estado: 'liquidada',
    'rendimiento.real': rendimientoReal
  });
  
  // Notificar inversores
  await notificarLiquidacion(ventanaId);
}
```

---

## Flujo de Revenue Share

### Diagrama de Propagación

```
Inversor Original (100 EUR)
│
├─[1%]─→ Padre (Nivel 1) = 1 EUR
│        │
│        └─[0.5%]─→ Abuelo (Nivel 2) = 0.5 EUR
│                   │
│                   └─[0.25%]─→ Bisabuelo (Nivel 3) = 0.25 EUR
│
Total Comisiones Red: 1.75 EUR (1.75%)
```

### Workflow: Cálculo y Liquidación

```typescript
async function calcularYLiquidarComisiones(inversionId: string): Promise<void> {
  const inversion = await obtenerInversion(inversionId);
  const inversor = await obtenerUsuario(inversion.usuarioId);
  
  const comisiones: Comision[] = [];
  
  // Nivel 1
  if (inversor.referidoPor) {
    comisiones.push(await crearComision({
      tipo: 'revenue-share',
      origen: inversionId,
      beneficiarioId: inversor.referidoPor,
      nivel: 1,
      porcentaje: 1.0,
      baseCalculo: inversion.monto,
      monto: inversion.monto * 0.01,
      estado: 'pendiente'
    }));
    
    // Nivel 2
    const padre = await obtenerUsuario(inversor.referidoPor);
    if (padre.referidoPor) {
      comisiones.push(await crearComision({
        tipo: 'revenue-share',
        origen: inversionId,
        beneficiarioId: padre.referidoPor,
        nivel: 2,
        porcentaje: 0.5,
        baseCalculo: inversion.monto,
        monto: inversion.monto * 0.005,
        estado: 'pendiente'
      }));
      
      // Nivel 3
      const abuelo = await obtenerUsuario(padre.referidoPor);
      if (abuelo.referidoPor) {
        comisiones.push(await crearComision({
          tipo: 'revenue-share',
          origen: inversionId,
          beneficiarioId: abuelo.referidoPor,
          nivel: 3,
          porcentaje: 0.25,
          baseCalculo: inversion.monto,
          monto: inversion.monto * 0.0025,
          estado: 'pendiente'
        }));
      }
    }
  }
  
  // Vincular comisiones a inversión
  await actualizarInversion(inversionId, {
    comisiones: comisiones.map(c => c.id)
  });
  
  // Programar pago (al cierre o reparto anual)
  for (const comision of comisiones) {
    await programarPagoComision(comision.id);
  }
}

async function liquidarComisionProgramada(comisionId: string): Promise<void> {
  const comision = await obtenerComision(comisionId);
  
  if (comision.estado !== 'pendiente') {
    throw new Error('Comisión ya procesada');
  }
  
  // Acreditar en cuenta del beneficiario
  await acreditarComision(comision.beneficiarioId, comision.monto);
  
  // Actualizar estado
  await actualizarComision(comisionId, {
    estado: 'pagada',
    fechaPago: new Date()
  });
  
  // Notificar beneficiario
  await notificarPagoComision(comision.beneficiarioId, comision);
  
  // Registrar en blockchain (opcional)
  await registrarEnBlockchain({
    tipo: 'comision_pagada',
    comisionId,
    monto: comision.monto,
    timestamp: new Date()
  });
}
```

---

## Proceso de Graduación a Gestor

### Workflow Completo

```typescript
async function procesarGraduacionGestor(candidatoId: string): Promise<void> {
  // FASE 1: Verificación de Requisitos
  const cumpleRequisitos = await verificarRequisitosGestor(candidatoId);
  
  if (!cumpleRequisitos.valido) {
    throw new Error(`No cumple requisitos: ${cumpleRequisitos.razones.join(', ')}`);
  }
  
  // FASE 2: Auditoría de Datos
  const auditoria = await auditarHistorialCandidato(candidatoId);
  
  // FASE 3: Presentación ante Comité
  const presentacion = await programarPresentacionComite(candidatoId);
  
  // FASE 4: Decisión del Comité
  const decision = await esperarDecisionComite(presentacion.id);
  
  if (!decision.aprobado) {
    await notificarRechazoGraduacion(candidatoId, decision.observaciones);
    return;
  }
  
  // FASE 5: Creación de Sección Certificada
  const seccion = await crearSeccionCertificada({
    nombre: `${auditoria.candidato.nombre} - Sección`,
    gestorId: candidatoId,
    fechaGraduacion: new Date(),
    marca: {
      nombre: decision.nombreMarca,
      cobranding: true
    },
    estado: 'activa'
  });
  
  // FASE 6: Actualización de Usuario
  await actualizarUsuario(candidatoId, {
    tipo: 'gestor',
    seccionId: seccion.id
  });
  
  // FASE 7: Configuración de Beneficios
  await configurarBeneficiosGestor(seccion.id, {
    participacion: 0.5, // 50%
    cuentaBancaria: decision.datosBancarios
  });
  
  // FASE 8: Acreditación y Comunicación
  await entregarCredenciales(candidatoId, seccion.id);
  await notificarGraduacionExitosa(candidatoId);
  await publicarGraduacionEnClub(seccion);
}

async function verificarRequisitosGestor(usuarioId: string): Promise<{valido: boolean, razones: string[]}> {
  const usuario = await obtenerUsuario(usuarioId);
  const razones: string[] = [];
  
  // Requisito 1: Volumen gestionado
  const volumen = await calcularVolumenGestionado(usuarioId);
  if (volumen.total < 1000000) {
    razones.push(`Volumen insuficiente: ${volumen.total} EUR (requiere 1M EUR)`);
  }
  
  // Requisito 2: Continuidad 2 años
  const continuidad = await verificarContinuidad(usuarioId, 24); // 24 meses
  if (!continuidad.cumple) {
    razones.push(`Continuidad insuficiente: ${continuidad.mesesConsecutivos} meses (requiere 24)`);
  }
  
  // Requisito 3: Semáforo de salud
  const salud = await obtenerSemaforoSalud(usuarioId);
  if (salud !== 'verde') {
    razones.push(`Semáforo en ${salud} (requiere verde)`);
  }
  
  // Requisito 4: KYC actualizado
  const kyc = usuario.kyc;
  if (!kyc.verificado || kyc.nivelVerificacion < 2) {
    razones.push('KYC no actualizado o nivel insuficiente');
  }
  
  return {
    valido: razones.length === 0,
    razones
  };
}

async function calcularVolumenGestionado(usuarioId: string): Promise<{total: number, activos: string[]}> {
  // Obtener todos los activos captados por el agente
  const activos = await obtenerActivosPorCaptador(usuarioId);
  
  const activosElegibles = activos.filter(a => 
    a.estado === 'finalizado' || a.estado === 'vendido'
  );
  
  const total = activosElegibles.reduce((sum, a) => sum + a.valorTasacion, 0);
  
  return {
    total,
    activos: activosElegibles.map(a => a.id)
  };
}
```

---

## Workflows de Gobernanza

### Proceso de Toma de Decisiones

```typescript
interface Decision {
  id: string;
  tipo: 'aprobacion-activo' | 'graduacion-gestor' | 'intervencion-seccion' | 'otro';
  solicitante: string;
  fecha: Date;
  comite: string[]; // IDs de miembros del comité
  votos: Voto[];
  decision: 'pendiente' | 'aprobada' | 'rechazada';
  observaciones: string[];
}

async function procesarDecisionComite(decisionId: string): Promise<void> {
  const decision = await obtenerDecision(decisionId);
  
  // Notificar al Comité (David, Carlos, Edmundo)
  await notificarComite({
    tipo: decision.tipo,
    detalles: decision,
    accion: 'revision-requerida'
  });
  
  // Esperar votos (poder de veto de David y Carlos)
  await esperarVotos(decisionId);
  
  // Evaluar decisión
  const resultado = evaluarDecision(decision);
  
  // Ejecutar acción según resultado
  if (resultado.aprobada) {
    await ejecutarAccionAprobada(decision);
  } else {
    await notificarRechazo(decision.solicitante, resultado.razones);
  }
}

function evaluarDecision(decision: Decision): {aprobada: boolean, razones: string[]} {
  const david = decision.votos.find(v => v.miembroId === 'david');
  const carlos = decision.votos.find(v => v.miembroId === 'carlos');
  
  // Poder de veto absoluto
  if (david?.voto === 'rechazar' || carlos?.voto === 'rechazar') {
    return {
      aprobada: false,
      razones: [david?.observaciones, carlos?.observaciones].filter(Boolean)
    };
  }
  
  // Ambos deben aprobar
  if (david?.voto === 'aprobar' && carlos?.voto === 'aprobar') {
    return {
      aprobada: true,
      razones: []
    };
  }
  
  return {
    aprobada: false,
    razones: ['Decisión pendiente de voto completo']
  };
}
```

### Proceso de Intervención (Takeover)

```typescript
async function intervenirSeccion(seccionId: string, motivo: string): Promise<void> {
  const seccion = await obtenerSeccion(seccionId);
  
  // Registrar incidente
  await registrarIncidente({
    tipo: 'intervencion',
    seccionId,
    motivo,
    fecha: new Date()
  });
  
  // Suspender operaciones
  await actualizarSeccion(seccionId, {
    estado: 'intervenida',
    'cumplimiento.semaforoSalud': 'rojo'
  });
  
  // Notificar al gestor
  await notificarIntervencion(seccion.gestorId, {
    motivo,
    plazoCorreccion: '30 días'
  });
  
  // Tomar control de activos críticos
  const activosCriticos = await identificarActivosCriticos(seccionId);
  for (const activo of activosCriticos) {
    await reasignarGestion(activo.id, 'comite-temporal');
  }
  
  // Proteger inversores
  await asegurarLiquidezInversores(seccionId);
  
  // Programar auditoría completa
  await programarAuditoriaSeccion(seccionId);
}
```

---

## Referencias Cruzadas

**Ver también:**
- [Ontología y Glosario](01-ontologia-glosario-cpii.md)
- [Arquitectura de Datos](02-arquitectura-datos-cpii.md)
- [Modelos Financieros](04-modelos-financieros-cpii.md)

---

*Documento generado por Sistema de Arquitectura de Información CPII v1.0*
*Última actualización: 2026-02-15*
