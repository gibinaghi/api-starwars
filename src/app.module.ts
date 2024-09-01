import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './modules/generics/controllers/app.controller';
import { AppService } from './modules/generics/services/app.service';
import { setPath } from './common/envs/set.envs';
import { typeOrmAsyncConfig } from './configurations/database/eviroment';
import { GenericsModule } from './modules/generics/generics.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/authorization/auth.module';
import { UserModule } from './modules/users/user.module';
import { ApiModule } from './api/api.module';
import { MovieModule } from './modules/movies/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: setPath(),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    GenericsModule,
    AuthModule,
    UserModule,
    ApiModule,
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: 'generics/version', method: RequestMethod.ALL },
        { path: 'auth/login', method: RequestMethod.POST },
      );
  }
}
