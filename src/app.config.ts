import { INestApplication, ValidationPipe } from '@nestjs/common';
import morganMiddleware from './configurations/configLogs/morgan.logs';
import { HttpExceptionFilter } from './core/exceptions/http.exceptions';
import { genericsDoc } from './common/documentation/modules/gererics/configure.doc';
import { envs } from './common/envs/envs';

export const setupApp = (app: INestApplication): void => {
  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  };
  app.enableCors(corsOptions);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ====== Base API Path ======= //
  app.setGlobalPrefix(envs.base_path);

  // ====== Logs - console ======= //
  app.use(morganMiddleware);

  // ====== Global exception catch ======= //
  app.useGlobalFilters(new HttpExceptionFilter());

  // ====== Documentation ======= //
  genericsDoc(app);
};
