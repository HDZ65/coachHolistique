// Titre principal : Gestion de la connexion à la base de données MongoDB
// Ce fichier gère la connexion à MongoDB de manière optimisée pour éviter les connexions multiples inutiles.

import mongoose, { Connection, ConnectOptions } from 'mongoose';

// Utilisation de l'assertion de type non-null pour MONGODB_URI
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Veuillez définir la variable d\'environnement MONGODB_URI');
}

interface CachedConnection {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

/**
 * Variable globale pour stocker la connexion
 * Cela permet de réutiliser la connexion existante plutôt que d'en créer une nouvelle à chaque fois
 */
let cached: CachedConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

/**
 * Fonction pour établir la connexion à MongoDB
 * @returns Une promesse résolue avec l'instance de connexion Mongoose
 */
async function connect(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
      dbName: 'elisabethcoachholistique',
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connect;