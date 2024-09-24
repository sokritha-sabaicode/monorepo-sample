import app from "@/src/app";
import configs from "@/src/config";
import MongoDBConnector from "@/src/database/connector";
import agenda from "@/src/utils/agenda";

async function run() {
  try {
    // Activate MongoDB!
    const mongodb = MongoDBConnector.getInstance(configs.env);
    await mongodb.connect({ url: configs.mongodbUrl });

    // Activate Agenda Scheduler
    await agenda.start();

    app.listen(configs.port, () => {
      console.log(`User Service running on Port:`, configs.port)
    })
  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1); // Exit with failure code
  }
}

run();