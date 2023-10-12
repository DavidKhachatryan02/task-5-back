import { initApp } from './app';

const APP_PORT = process.env.APP_PORT || 3000;

async function main() {
  try {
    const app = await initApp();
    await app.listen(APP_PORT, () =>
      console.log(
        ` [server]: Server is running at http://localhost:${APP_PORT}`,
      ),
    );
  } catch (e) {
    console.error(`[server]: Error on initializing server => ${e}`);
  }
}

main().then();
