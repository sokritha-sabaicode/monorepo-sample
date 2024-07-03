import app from '@/src/app';
import connectToMongoDB from '@/src/database/connection';

async function run() {
  try {
    await connectToMongoDB()
    app.listen(3000, () => {
      console.log('server running port 3000');
    })
  } catch (error) {
    console.error(error);
    process.exit(1)
  }
}

run();