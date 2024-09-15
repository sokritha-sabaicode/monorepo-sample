import configs from "@/src/config";

import app from "@/src/app"
import createLogger from "@/src/utils/logger";

export const gatewayLogger = createLogger({ service: 'api-gateway', level: 'info', logGroupName: configs.awsCloudwatchLogsGroupName });

async function run() {
  try {
    app.listen(configs.port, () => {
      console.log(`Gateway Service running on Port:`, configs.port)
    })
  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1); // Exit with failure code
  }
}

run();