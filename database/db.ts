import mongoose from "mongoose";

const mongoConnection = {
  isConnected: 0,
};

export type logs = "DB CONNECTED" | "DB DISCONNECTED";

export const connect = async () => {
  if (mongoConnection.isConnected === 1) {
    console.log("DB PREVIOUS CONNECTED");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
      console.log("USING PREVIOUS CONNECTION");
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || "");
  mongoConnection.isConnected = 1;

  console.log("DB CONNECTED");
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === "development") return;

  if (mongoConnection.isConnected === 0) return;
  await mongoose.disconnect();
  console.log("DB DISCONNECTED");
};
