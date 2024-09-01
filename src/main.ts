import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './app.config';
import AddData from './common/bulckData/data/set-data';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApp(app);
  await app.listen(process.env.PORT);
  // ====== Precarga de datos ======= //
  await AddData.setData();
}
bootstrap();
