import mongoose from "mongoose";

export default class MongoDBConnector {
  private static instances: Map<string, MongoDBConnector> = new Map();
  private mongoUrl: string = "";
  private db = mongoose.connection;

  // Private constructor to enforce singleton pattern differently
  private constructor() {
    this.setupEventListeners();
  }

  public static getInstance(env: string = 'development'): MongoDBConnector {
    if (!MongoDBConnector.instances.has(env)) {
      MongoDBConnector.instances.set(env, new MongoDBConnector());
    }
    return MongoDBConnector.instances.get(env)!;
  }

  private setupEventListeners(): void {
    this.db.on("connected", () => {
      console.log("MongoDB connected");
    });

    this.db.on("error", (error) => {
      console.log("Error in MongoDB connection", { error });
    });

    this.db.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
  }

  public async connect({ url }: { url: string }): Promise<void> {
    this.mongoUrl = url;
    try {
      await mongoose.connect(this.mongoUrl);
      console.log("Successfully connected to MongoDB");
    } catch (error) {
      console.log("Initial MongoDB connection error", { error });
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.db.removeAllListeners();
    console.log("MongoDB disconnected and listeners removed");
  }
}