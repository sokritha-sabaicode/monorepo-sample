import app from '@/src/app';
import configs from '@/src/config';
import connectToMongoDB from '@/src/database/connection';

async function run() {
  try {
    await connectToMongoDB()
    app.listen(configs.port, () => {
      console.log(`Job Server is running port ${configs.port}`);
    })
  } catch (error) {
    console.error(error);
    process.exit(1)
  }
}

run();