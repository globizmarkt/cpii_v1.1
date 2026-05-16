***CPII · CLUB DE PROPIETARIOS E INVERSORES INMOBILIARIOS**

EMAIL AUTOMÁTICO DE BIENVENIDA + FLUJO GOOGLE AUTH


***Email Automático de Bienvenida**

***& Flujo de Google Authentication Pre-Armado***

***Skeleton Factory · Trigger: formulario landing · Versión ES**

**Parte I — Email Automático de Bienvenida**


***Este email se dispara en el momento exacto en que Skeleton registra el payload de la landing. Es la primera comunicación oficial del Club con el lead. El tono es carta de aceptación preliminar, no newsletter.**

**1.1  Asunto del Email**


**Asunto principal (recomendado)**

| **Asunto: **Tu acceso al CPII está siendo revisado, **\{\{contact.name\}\}** |
| - |


**Alternativas de asunto (A/B testing)**

***A:  Bienvenido al Club. Próximo paso: validación de identidad.**

***B:  Hemos recibido tu solicitud · CPII · Acceso Privado**

***C:  \[CPII\] Tu plaza está reservada. Acción requerida en 48h.**

*⚙  El asunto C crea urgencia sin alarmar. Recomendado para leads fríos (sin referral\_id).*


**1.2  Cuerpo del Email (con variables dinámicas)**


***A continuación el email completo tal como se envía. Las etiquetas **

| **CPII** Club de Propietarios e Inversores Inmobiliarios  Estimado/a **\{\{contact.name\}\}**, Hemos recibido tu solicitud de acceso al CPII. Tu ficha ha sido registrada en nuestro sistema y tu plaza está en estado de **revisión preliminar**. ***Este no es un email de confirmación automático. Es la primera comunicación del Comité de Dirección del Club contigo. Leemos cada solicitud antes de activar una cuenta.**  *Bloque dinámico · se muestra según ***\{\{intent\_role\}\}** **SI  intent\_role = inversor** *Tu objetivo es claro: hacer que tu capital trabaje con inteligencia. En el CPII operamos con un modelo de ahorro progresivo desde 50€/mes, con reinversión de rentas y distribución automática de beneficios. Una vez completada tu verificación, tendrás acceso a tu panel de seguimiento de operaciones en tiempo real.* **SI  intent\_role = agente** *Como agente o promotor, tu valor en el Club es estratégico. Los activos que incorpores al ecosistema CPII serán analizados bajo nuestro protocolo de Intervención Quirúrgica. Si aprueban el diagnóstico, pasarán a formar parte del portafolio activo del Club, con retribución directa a tu cuenta.* **SI  intent\_role = prescriptor** *Como prescriptor del Club, cada persona que incorpores a través de tu red activa un flujo de Revenue Share directo hacia tu cuenta (modelo L1/L2/L3). Tu código de prescriptor estará activo en cuanto completemos tu verificación de identidad.*  **Tu siguiente paso obligatorio**  ***Por normativas internas del Club y requisitos de seguridad patrimonial, antes de activar tu cuenta necesitamos completar un proceso de verificación de identidad (KYC).** ***Es un proceso sencillo que puedes completar desde tu móvil en menos de 5 minutos.**  **\[ COMPLETAR MI VERIFICACIÓN KYC \]** ***(Botón enlaza a: plataforma.cpii.club/kyc?uid=\{\{user.uid\}\}&territory=\{\{territory\}\})**  Tu Gestor Territorial (**\{\{territory\}\}**) se pondrá en contacto contigo en un plazo máximo de 48 horas para la llamada de validación.    ***Comité de Dirección** ***David Almeida & Carlos Balboa** ***CPII · Club de Propietarios e Inversores Inmobiliarios** ***Este mensaje es confidencial. Ha sido generado automáticamente para uso exclusivo del destinatario.*** |
| :-: |


**1.3  Mapa Completo de Variables Dinámicas**


| **Variable** | **Fuente en Skeleton** | **Descripción** |
| - | - | - |
| \{\{contact.name\}\} | payload.contact.name | Nombre completo. Personaliza el saludo. |
| \{\{intent\_role\}\} | payload.intent\_role | Activa el bloque de texto correcto (inversor / agente / prescriptor). |
| \{\{territory\}\} | payload.territory | Muestra ES o PT. Define qué gestor territorial llama al lead. |
| \{\{user.uid\}\} | Firebase Auth UID | Generado por Skeleton al crear la cuenta. Enlaza el botón KYC a la sesión correcta. |
| \{\{referral\_id\}\} | payload.referral\_id | Si existe, Skeleton puede añadir: 'Has sido invitado por \[Nombre\]'. |



**Parte II — Flujo de Google Authentication Pre-Armado**


***El problema clásico: el usuario llega desde la landing, rellena el formulario, y luego en la plataforma Skeleton le vuelve a pedir que cree una cuenta. Esa fricción mata la conversión.**

***La solución: la landing pre-arma la identidad Google del lead antes de que llegue a la plataforma. Cuando abra la pantalla de login de Skeleton, el sistema lo reconoce y solo le pide confirmar.**


**2.1  Reglas de Skeleton sobre Google Auth**


***Skeleton Factory gestiona la autenticación mediante Firebase Authentication con el proveedor Google. Las reglas fundamentales son:**

| **\#** | **Regla** | **Implicación para la landing** |
| :-: | - | - |
| **R1** | **El UID de Firebase es la llave maestra** | Todas las colecciones de Skeleton (users, genealogy, revenue) están indexadas por uid. Hay que generar o linkear el uid en el momento del formulario. |
| **R2** | **Un email solo puede tener UN proveedor de auth activo a la vez** | Si el lead ya tiene cuenta Google con ese email, Skeleton debe linkearlo, no crear uno nuevo. De lo contrario se produce un auth/email-already-in-use. |
| **R3** | **La cuenta se considera 'activa' solo tras el primer signIn** | Skeleton puede crear la ficha en Firestore con el email, pero la cuenta Firebase Auth no existe hasta que el usuario hace el primer sign-in con Google. |
| **R4** | **Los Custom Claims se asignan tras el signIn** | El rol (inversor / agente / prescriptor) y el territorio (ES / PT) se inyectan como Custom Claims después del primer login, no antes. |


**2.2  Flujo Pre-Armado: Landing → Auth → Skeleton**


***El flujo tiene 4 momentos. Cada uno tiene un actor, una acción y un resultado en Firestore/Auth.**


| **Paso** | **Actor** | **Acción** | **Resultado en Skeleton/Firebase** |
| - | - | - | - |
| **01** | **Landing** | Usuario rellena el formulario con su email personal | La landing envía el payload JSON a un Cloud Function de Skeleton (createPendingUser). |
| **02** | **Skeleton CF** | createPendingUser() crea documento pendiente | Se crea /pending\_users/\{email\} con todo el payload + status: 'awaiting\_google\_auth'. Sin Firebase Auth UID todavía. |
| **03** | **Email auto.** | El email de bienvenida se dispara con el CTA de KYC | El botón KYC lleva al usuario a la pantalla de Google Sign-In de la plataforma (Firebase Auth). URL con parámetro ?pending=email\_hash. |
| **04** | **Usuario** | Hace Sign In con Google en la plataforma | Firebase crea el UID. Cloud Function onAuthCreate() detecta el pending\_user, migra el documento a /users/\{uid\} y asigna Custom Claims (role + territory). |


**2.3  Cloud Function: createPendingUser()**


***Esta función es la pieza clave. Se llama desde la landing en el momento del submit. Recibe el payload completo y crea el documento pendiente en Firestore.**


| *JavaScript · Firebase Cloud Functions* // Cloud Function · Skeleton Factory // Trigger: HTTP POST desde la landing page  exports.createPendingUser = functions.https.onRequest(async (req, res) =\> \{   const payload = req.body;    // Validar campos obligatorios   const \{ contact, intent\_role, territory, referral\_id \} = payload;   if (!contact?.email || !intent\_role || !territory) \{     return res.status(400).json(\{ error: 'Payload incompleto' \});   \}    // Comprobar si ya existe un pending\_user con ese email   const emailHash = Buffer.from(contact.email).toString('base64');   const ref = db.collection('pending\_users').doc(emailHash);   const existing = await ref.get();    if (existing.exists) \{     // El lead ya existe · reenviar email sin duplicar el documento     await resendWelcomeEmail(contact.email, payload);     return res.json(\{ status: 'already\_exists', action: 'email\_resent' \});   \}    // Crear documento pendiente   await ref.set(\{     ...payload,     status:     'awaiting\_google\_auth',     created\_at:  admin.firestore.FieldValue.serverTimestamp(),     kyc\_url:    \`https://plataforma.cpii.club/kyc?pending=$\{emailHash\}\`,   \});    // Disparar email de bienvenida (Trigger email en Firestore)   await db.collection('mail').add(\{     to: contact.email,     template: \{       name: 'cpii\_welcome',       data: \{ ...payload, kyc\_url: ref.data()?.kyc\_url \}     \}   \});    return res.json(\{ status: 'pending\_created', email\_sent: true \}); \}); |
| - |


**2.4  Cloud Function: onAuthCreate() — La migración del pendiente al usuario real**


***Esta función se dispara automáticamente cada vez que alguien hace Sign In con Google en la plataforma. Busca si existe un pending\_user con el mismo email y, si lo encuentra, lo migra a /users/\{uid\} con todos sus datos + Custom Claims.**


| *JavaScript · Firebase Cloud Functions* // Cloud Function · Skeleton Factory // Trigger: Firebase Auth · onCreate (cada nuevo signIn)  exports.onAuthCreate = functions.auth.user().onCreate(async (user) =\> \{   const emailHash = Buffer.from(user.email).toString('base64');   const pendingRef = db.collection('pending\_users').doc(emailHash);   const pending = await pendingRef.get();    if (!pending.exists) \{     // Login directo sin pasar por landing · crear perfil mínimo     await db.collection('users').doc(user.uid).set(\{       email: user.email,       displayName: user.displayName,       status: 'direct\_signup',       created\_at: admin.firestore.FieldValue.serverTimestamp(),     \});     return;   \}    const data = pending.data();    // Migrar datos del pending a /users/\{uid\}   await db.collection('users').doc(user.uid).set(\{     uid:         user.uid,     ...data.contact,     intent\_role: data.intent\_role,     territory:   data.territory,     referral\_id: data.referral\_id || null,     source:      data.source,     status:      'kyc\_pending',     created\_at:  admin.firestore.FieldValue.serverTimestamp(),   \});    // Construir genealogía si viene referral\_id   if (data.referral\_id) \{     await db.collection('cpii\_genealogy').doc(user.uid).set(\{       uid:       user.uid,       padrino\_l1: data.referral\_id,       // L2 y L3 se resuelven en cascade desde el uid de L1     \});   \}    // Asignar Custom Claims (rol + territorio)   await admin.auth().setCustomUserClaims(user.uid, \{     role:      data.intent\_role,   // inversor | agente | prescriptor     territory: data.territory,     // ES | PT     kyc:       false,              // bloqueado hasta validación   \});    // Limpiar pending\_user (ya no necesario)   await pendingRef.delete();    // Notificar al gestor territorial   await notifyTerritorialManager(data.territory, user.uid, data.contact); \}); |
| - |


**2.5  Diagrama de Estado del Lead**


***Cada lead pasa por 5 estados posibles en Skeleton. El campo status en el documento /users/\{uid\} refleja siempre el estado actual.**


| **N** | **status** | **Descripción** | **Acceso a plataforma** |
| - | - | - | - |
| **1** | **awaiting\_google\_auth** | Lead en pending\_users. Formulario enviado, aún no hizo login. | **Sin acceso** |
| **2** | **kyc\_pending** | Hizo Google Sign In. Pending migrado a /users. KYC no completado. | **Pantalla KYC solo** |
| **3** | **kyc\_in\_review** | KYC enviado. Gestor territorial revisando. | **Pantalla de espera** |
| **4** | **active** | KYC aprobado. Custom Claim kyc: true activado. | **Acceso completo según rol** |
| **5** | **rejected** | KYC rechazado o lead no válido. | **Acceso denegado** |


**Resumen Ejecutivo — Qué construir ahora**


| **\#** | **Tarea** | **Responsable / Plataforma** |
| - | - | - |
| **1** | **CF createPendingUser()** | Dev backend · Firebase Cloud Functions |
| **2** | **CF onAuthCreate() con migración y Custom Claims** | Dev backend · Firebase Cloud Functions |
| **3** | **Plantilla de email 'cpii\_welcome' en Firebase Extensions (Trigger Email)** | Dev backend + copy ya definido en Parte I |
| **4** | **Pantalla KYC en la plataforma (ruta /kyc?pending=hash)** | Dev frontend · Skeleton Factory UI |
| **5** | **Notificación automática al gestor territorial cuando status → kyc\_pending** | Dev backend · Firestore trigger o Cloud Function |
| **6** | **Traducción del email de bienvenida a PT** | Próxima sesión con Claude |


*CPII · Club de Propietarios e Inversores Inmobiliarios · Documento interno confidencial · Skeleton Factory Integration*
