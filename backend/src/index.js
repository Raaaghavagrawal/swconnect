import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config();

// Basic env validation (avoid logging secrets)
if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
  // eslint-disable-next-line no-console
  console.error('Missing Firebase Admin credentials in .env');
}

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN?.split(',') || '*' }));
app.use(morgan('dev'));

let db;
try {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
  db = getFirestore();
} catch (err) {
  // eslint-disable-next-line no-console
  console.error('Firebase Admin init failed:', err?.message || err);
}

app.get('/health', (_req, res) => res.json({ ok: true }));

// Quick connectivity check (does not require existing docs)
app.get('/debug/firestore', async (_req, res) => {
  try {
    await db.collection('healthcheck').doc('ping').set({ t: Date.now() }, { merge: true });
    const doc = await db.collection('healthcheck').doc('ping').get();
    res.json({ ok: true, exists: doc.exists });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Firestore check failed:', e?.message || e);
    res.status(500).json({ ok: false, error: e?.message || 'firestore-error' });
  }
});

app.post('/api/patients', async (req, res) => {
  try {
    const patient = { ...req.body, createdAt: Date.now() };
    const ref = await db.collection('patients').add(patient);
    res.status(201).json({ id: ref.id, ...patient });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('POST /api/patients error:', e?.message || e);
    res.status(500).json({ error: e?.message || 'Failed to create patient' });
  }
});

app.get('/api/patients', async (_req, res) => {
  try {
    const snapshot = await db.collection('patients').orderBy('createdAt', 'desc').get();
    res.json(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('GET /api/patients error:', e?.message || e);
    res.status(500).json({ error: e?.message || 'Failed to list patients' });
  }
});

app.post('/api/prescriptions', async (req, res) => {
  try {
    const prescription = { ...req.body, createdAt: Date.now(), dispensed: false };
    const ref = await db.collection('prescriptions').add(prescription);
    res.status(201).json({ id: ref.id, ...prescription });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('POST /api/prescriptions error:', e?.message || e);
    res.status(500).json({ error: e?.message || 'Failed to create prescription' });
  }
});

app.get('/api/prescriptions', async (req, res) => {
  try {
    const { pharmacyId, patientId } = req.query;
    let query = db.collection('prescriptions');
    if (pharmacyId) query = query.where('pharmacyId', '==', pharmacyId);
    if (patientId) query = query.where('patientId', '==', patientId);
    const snapshot = await query.orderBy('createdAt', 'desc').get();
    res.json(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('GET /api/prescriptions error:', e?.message || e);
    res.status(500).json({ error: e?.message || 'Failed to list prescriptions' });
  }
});

app.patch('/api/prescriptions/:id/dispense', async (req, res) => {
  try {
    await db.collection('prescriptions').doc(req.params.id).update({ dispensed: true, dispensedAt: Date.now() });
    res.json({ ok: true });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('PATCH /api/prescriptions/:id/dispense error:', e?.message || e);
    res.status(500).json({ error: e?.message || 'Failed to update prescription' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on :${port}`));

