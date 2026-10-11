import mongoose from "mongoose";

declare global {
  // Reuse the connection while the development server hot-reloads modules.
  // eslint-disable-next-line no-var
  var mongooseConnection: Promise<typeof mongoose> | undefined;
}

export function validateMongoUri(uri: string): { valid: boolean; reason?: string } {
  if (!uri || !uri.trim()) {
    return {
      valid: false,
      reason: "MONGODB_URI is not configured. Add your MongoDB connection string to .env.local.",
    };
  }
  if (uri.includes("cluster0....") || uri.includes("....")) {
    return {
      valid: false,
      reason:
        "Incomplete MongoDB Atlas Hostname: The MONGODB_URI in .env.local contains 'cluster0....'. In MongoDB Atlas, clusters have a unique domain such as 'cluster0.abcde.mongodb.net'. Please copy your full connection string from MongoDB Atlas (Database -> Connect -> Drivers) and update .env.local.",
    };
  }
  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    return {
      valid: false,
      reason: "Invalid MONGODB_URI format: The connection string must start with 'mongodb://' or 'mongodb+srv://'.",
    };
  }
  return { valid: true };
}

export async function connectToDatabase() {
  const uri = process.env["MONGODB_URI"];
  const check = validateMongoUri(uri || "");

  if (!check.valid) {
    throw new Error(check.reason);
  }

  if (mongoose.connection.readyState === 1) return mongoose;

  if (!globalThis.mongooseConnection) {
    globalThis.mongooseConnection = mongoose.connect(uri!, {
      serverSelectionTimeoutMS: 5_000,
    });
  }

  try {
    return await globalThis.mongooseConnection;
  } catch (error: any) {
    globalThis.mongooseConnection = undefined;
    const msg = error?.message || "Connection failed";
    if (msg.includes("querySrv EBADNAME") || msg.includes("EBADNAME")) {
      throw new Error(
        "MongoDB Atlas DNS Lookup Failed (EBADNAME): The hostname in MONGODB_URI is not a valid DNS domain. Verify your cluster address in MongoDB Atlas (e.g. cluster0.xxxxx.mongodb.net).",
      );
    }
    if (msg.includes("querySrv ENOTFOUND") || msg.includes("ENOTFOUND")) {
      throw new Error(
        "MongoDB Atlas Host Not Found (ENOTFOUND): The cluster hostname could not be resolved. Please check your internet connection or verify the cluster name in MongoDB Atlas.",
      );
    }
    if (msg.includes("bad auth") || msg.includes("Authentication failed")) {
      throw new Error(
        "MongoDB Authentication Failed: The username or password in MONGODB_URI is incorrect. Verify Database Users in MongoDB Atlas (Security -> Database Access).",
      );
    }
    throw error;
  }
}
