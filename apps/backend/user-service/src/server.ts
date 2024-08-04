import app from "@/src/app"
import MongoDBConnector from "@/src/database/connector"
import configs from "@/src/config";

async function run() {
  try {
    // Activate MongoDB!
    const mongodb = MongoDBConnector.getInstance(process.env.NODE_ENV);
    await mongodb.connect({ url: configs.mongodbUrl });

    app.listen(configs.port, () => {
      console.log(`User Service running on Port:`, configs.port)
    })
  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1); // Exit with failure code
  }
}

run();