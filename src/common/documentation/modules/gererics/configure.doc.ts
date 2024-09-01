import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from '../../../..//modules/authorization/auth.module';
import { GenericsModule } from '../../../..//modules/generics/generics.module';
import { MovieModule } from '../../../../modules/movies/movie.module';
import { UserModule } from '../../../..//modules/users/user.module';

const optionsGenerics = new DocumentBuilder()
  .setTitle('StarWars - Generic Module.')
  .setDescription('Generic Module.')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();

export function genericsDoc(app) {
  const document = SwaggerModule.createDocument(app, optionsGenerics, {
    include: [GenericsModule, AuthModule, UserModule, MovieModule],
  });
  return SwaggerModule.setup('api/v1/docs/generic', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
}
