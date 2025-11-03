import dotenv from 'dotenv';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config();

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore();

async function run() {
  const p = await db.collection('patients').add({
    name: 'Ramu', age: 35, gender: 'M', symptoms: 'fever, chills', vitals: '98.6F', createdAt: Date.now()
  });
  await db.collection('prescriptions').add({
    patientId: p.id,
    doctorId: 'doc1',
    pharmacyId: 'pharm1',
    items: [{ name: 'Paracetamol 500mg', qty: 10 }],
    dispensed: false,
    createdAt: Date.now(),
  });
  console.log('Seeded.');
}

run().then(() => process.exit(0));

