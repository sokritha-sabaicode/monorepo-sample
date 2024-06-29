import app from "@/src/app"
import MongoDBConnector from "@/src/database/connector"
import configs from "@/src/utils/config";

async function run() {
  try {
    // Activate MongoDB
    const mongodb = MongoDBConnector.getInstance();
    await mongodb.connect({ url: configs.mongodbUrl });

    app.listen(configs.port, () => {
      console.log(`User Service running on Port:`, configs.port)
    })

    // TODO:
    // 1. If server exist, close the database & process 
    // const exitHandler = async (exitCode = 0) => {
    //   console.log("Initiating graceful shutdown...");
    //   if (server) {
    //     server.close(async () => {
    //       await mongodb.disconnect();
    //       process.exit(exitCode);
    //     })
    //   } else {
    //     await mongodb.disconnect();
    //     process.exit(exitCode)
    //   }
    // }

    // // Protected Not Properly Handle Error In Promise
    // process.on("uncaughtException", () => exitHandler(1));
    // process.on("unhandledRejection", () => exitHandler(1));

    // // Signal Terminate: A signal that cause a program to stop usually come from unix-based system
    // process.on("SIGTERM", exitHandler);
  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1); // Exit with failure code
  }
}

run();