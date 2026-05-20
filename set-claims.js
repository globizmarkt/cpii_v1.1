const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// 1. Inicializar el SDK de Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 2. Definir tu usuario y el poder que vas a recibir
const targetEmail = 'global.business.marketplace@gmail.com';
const customClaims = {
  tenant_id: 'cpii_v1.1',
  role: 'admin'
};

// 3. Ejecutar la inyección
console.log(`Buscando a ${targetEmail} en Firebase...`);
admin.auth().getUserByEmail(targetEmail)
  .then((user) => {
    console.log(`Usuario encontrado (UID: ${user.uid}). Inyectando poder...`);
    return admin.auth().setCustomUserClaims(user.uid, customClaims);
  })
  .then(() => {
    console.log(`\n¡ÉXITO TOTAL! 🚀`);
    console.log(`El usuario ${targetEmail} ahora es ADMIN del tenant cpii_v1.1`);
    console.log(`Ya puedes borrar este archivo (set-claims.js) si lo deseas.`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error en la matriz:', error.message);
    process.exit(1);
  });