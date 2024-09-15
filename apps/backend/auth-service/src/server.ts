import app from "@/src/app";
import configs from "@/src/config";


async function run() {
  try {
    app.listen(configs.port, () => {
      console.log(`Auth Service running on Port:`, configs.port)
    })
  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1); // Exit with failure code!
  }
}

run();