import mongoose from "mongoose";

declare global {
  // Reuse the connection while the development server hot-reloads modules.
  // eslint-disable-next-line no-var
  var mongooseConnection: Promise<typeof mongoose> | undefined;
}

export async function connectToDatabase() {
  const uri = process.env["MONGODB_URI"];

  if (!uri) {
    throw new Error("MONGODB_URI is not configured. Add it to your server environment before using the admin page.");
  }

  if (mongoose.connection.readyState === 1) return mongoose;

  if (!globalThis.mongooseConnection) {
    globalThis.mongooseConnection = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5_000,
    });
  }

  try {
    return await globalThis.mongooseConnection;
  } catch (error) {
    globalThis.mongooseConnection = undefined;
    throw error;
  }
}
