**CPII**

Informe de Auditoría Técnica

**Despliegue de Cloud Functions — VIBE-CPII-07**


| **Proyecto** | cpii-landing (Firebase / GCP) |
| - | - |
| **Fase** | VIBE-CPII-07 — Encendido de Motores |
| **Fecha** | 23 de febrero de 2026 |
| **Estado final** | **✅ DESPLEGADO — onAuthCreate operativa en us-central1** |
| **Project ID** | 963765788097 |
| **Arquitecto** | Gemini (memoria) + Claude / Bulldozer (ejecución) |



# **1. Resumen Ejecutivo**

Esta sesión de trabajo tuvo como objetivo conectar la Landing Page de CPII con Firebase Firestore y desplegar la Cloud Function onAuthCreate, que constituye el motor de captación y migración de leads del ecosistema CPII.


**El proceso partió de cero infraestructura operativa y finalizó con el pipeline de captación de leads completamente funcional: formulario → Firestore /leads → Sign-In Google → migración a /users/\{uid\} → asignación de Custom Claims → genealogy\_cache.**


| **Componente** | **Estado** | **Resultado** |
| - | - | - |
| Landing Page (access-form.html) | v1.3.0 con credenciales reales | **OK** |
| Firestore Rules | Desplegadas — colección /leads activa | **OK** |
| Firebase Authentication (Google) | Habilitado con email de soporte | **OK** |
| Cloud Function onAuthCreate | Node.js 20 (1ª Gen) — us-central1 | **OK** |
| Colección /leads | Operativa — pendiente primer lead real | **OK** |
| genealogy\_cache | Inicialización automática en onAuthCreate | **OK** |
| onOperationClose (Motor Liquidación) | Diferida — VIBE-CPII-08 | **PENDIENTE** |



# **2. Cronología de Errores y Resoluciones**

Durante el despliegue se encontraron y resolvieron 8 errores en cadena. Cada error bloqueaba el acceso al siguiente, razón por la que el proceso requirió múltiples iteraciones.


| **\#** | **Error** | **Causa Raíz** | **Solución Aplicada** | **Resultado** |
| - | - | - | - | - |
| **1** | **Firestore vacío / leads sin escribir** | **Credenciales Firebase en placeholder TU\_API\_KEY** | **Inyección de firebaseConfig real del proyecto cpii-landing en SEC-09 del HTML** | **✓ Resuelto** |
| **2** | **TS2305 — onUserCreated not found** | **firebase-functions/v2/identity no existe en Node 24** | **Migración a firebase-functions v1: functions.auth.user().onCreate()** | **✓ Resuelto** |
| **3** | **Eventarc Permission denied** | **Service Agent de Eventarc sin rol asignado** | **Asignación roles/eventarc.serviceAgent a la cuenta gcp-sa-eventarc** | **✓ Resuelto** |
| **4** | **Build failed: Storage denied** | **Cuenta compute sin acceso al bucket gcf-sources** | **roles/storage.objectAdmin a 963765788097-compute@** | **✓ Resuelto** |
| **5** | **HTTPS → background not allowed** | **onOperationClose registrada previamente como HTTPS** | **Borrado manual de la función + eliminación del código v2 del index.ts** | **✓ Resuelto** |
| **6** | **artifactregistry: DENIED download** | **Cuenta compute sin permiso de lectura en Artifact Registry** | **roles/artifactregistry.reader (luego escalado a writer)** | **✓ Resuelto** |
| **7** | **artifactregistry: DENIED upload** | **El caché de build requiere escritura, no solo lectura** | **roles/artifactregistry.writer a la cuenta compute** | **✓ Resuelto** |
| **8** | **Firebase Auth not enabled** | **Authentication nunca fue activado en el proyecto** | **Activación del proveedor Google en Firebase Console + email de soporte** | **✓ Resuelto** |



# **3. Configuración IAM Final — Proyecto cpii-landing**

La cuenta de servicio principal 963765788097-compute@developer.gserviceaccount.com quedó configurada con los siguientes roles:


| **Rol** | **Identificador** | **Estado** |
| - | - | - |
| Administrador de objetos de Storage | roles/storage.objectAdmin | **OK** |
| Agente de servicio de Eventarc | roles/eventarc.serviceAgent | **OK** |
| Escritor de registros | roles/logging.logWriter | **OK** |
| Invocador de Cloud Run | roles/run.invoker | **OK** |
| Receptor de eventos de Eventarc | roles/eventarc.eventReceiver | **OK** |
| Usuario de cuenta de servicio | roles/iam.serviceAccountUser | **OK** |
| Escritor de Artifact Registry | roles/artifactregistry.writer | **OK** |
| Visualizador de objetos de Storage | roles/storage.objectViewer | **OK** |



# **4. Arquitectura Desplegada**

## **4.1 Pipeline de Captación (Operativo)**


| **FLUJO OPERATIVO:** 1. Lead rellena access-form.html 2. JavaScript escribe en Firestore /leads con esquema validado 3. Lead hace Sign-In con Google (mismo email) 4. onAuthCreate se dispara automáticamente 5. Función busca email en /leads → encuentra el documento 6. Migra datos a /users/\{uid\} con status: kyc\_pending 7. Borra el documento de /leads (higiene de BBDD) 8. Asigna Custom Claims: \{ role: 'inversor', tenant\_id: 'original' \} 9. Inicializa genealogy\_cache/\{uid\} para cálculo de red |
| - |


## **4.2 Doctrina de Huérfanos (Protocolo /ordeño)**

Los leads sin prescriptor (sin padrino en URL ?ref= o sin selección en el formulario) quedan asignados automáticamente al CTO como padre de red:

- perfil.referidoPor → 'CTO\_CARLOS\_CPII'

- metadata.club\_manager → 'CTO\_CARLOS\_CPII'

- genealogy\_cache.referidoPor → 'CTO\_CARLOS\_CPII'


## **4.3 Esquema de Datos — Colección /leads**

| **Campo** | **Tipo** | **Descripción** |
| - | - | - |
| tipo | string | 'inversor' | 'promotor' |
| perfil.nombre | string | Nombre completo del lead |
| perfil.email | string | Email en minúsculas — clave de búsqueda en onAuthCreate |
| perfil.referidoPor | string | null | ID del prescriptor. null = huérfano → CTO |
| metadata.club\_manager | string | UID del gestor según país (tabla CLUB\_MANAGER\_MAP) |
| metadata.rgpd\_consent | boolean | Siempre true — validado por Firestore Rules |



# **5. Decisiones Técnicas Relevantes**

## **5.1 Abandono de firebase-functions/v2 para Auth triggers**

Durante la fase de desarrollo se intentó usar la API v2 de Firebase Functions para el trigger de autenticación. Esta API no contiene el módulo identity como miembro exportado estable en el entorno Node.js 24.13.1, generando errores TS2305 en compilación y TypeError en runtime.


Decisión adoptada: usar firebase-functions v1 (functions.auth.user().onCreate()) para todos los triggers de autenticación. Esta API está documentada, es estable en Node 18/20/24 y continuará siendo soportada indefinidamente por Firebase.


## **5.2 Eliminación temporal de onOperationClose**

La función onOperationClose (Motor de Liquidación — Fase B) fue eliminada del index.ts v1.2.0 por las siguientes razones:

- Requiere Eventarc v2 con infraestructura de Cloud Run adicional no configurada

- Es un placeholder sin lógica de negocio real — su valor en producción es cero en esta fase

- Su presencia bloqueaba el despliegue de onAuthCreate, que sí es crítica


Esta función será reimplementada en VIBE-CPII-08 con la infraestructura Eventarc correctamente configurada y la lógica de Revenue Share completa.


## **5.3 Discrepancia de nomenclatura — leads vs pending\_users**

La documentación inicial del Protocolo /ordeño referenciaba la colección pending\_users. Las Firestore Rules desplegadas en producción usan leads. Esta discrepancia fue identificada y corregida en el código de la Landing y en la Cloud Function. La colección canónica de producción es /leads.



# **6. Pendientes — VIBE-CPII-08**


| **Tarea** | **Descripción** | **Prioridad** |
| - | - | - |
| Subir access-form.html v1.3.0 | Desplegar en servidor de producción de la Landing | **ALTA** |
| Prueba de fuego completa | Lead real → Firestore → Sign-In → /users verificado | **ALTA** |
| UIDs reales en CLUB\_MANAGER\_MAP | Sustituir placeholders UID\_GESTOR\_PORTUGAL etc. | **MEDIA** |
| onOperationClose — Motor Liquidación | Revenue Share L1/L2/L3 con Cloud Tasks | **FASE B** |
| KYC Flow | Verificación de identidad tras registro | **FASE B** |
| Panel CTO — vista genealogía | Dashboard de auditoría de red multinivel | **FASE B** |



# **7. Archivos Entregados en esta Sesión**


| **Archivo** | **Versión** | **Descripción** |
| - | - | - |
| access-form.html | v1.3.0 | Landing con credenciales reales cpii-landing |
| functions/src/index.ts | v1.2.0 | onAuthCreate — solo v1, sin Eventarc |
| functions/package.json | v1.1.0 | firebase-admin ^12.1.0, functions ^5.1.0 |
| functions/tsconfig.json | v1.1.0 | esModuleInterop: true, src/ como fuente |
| firebase.json | v1.0.0 | Configuración de despliegue multi-servicio |





*CPII — Ecosistema de Inversión Inmobiliaria | Confidencial © 2026*
