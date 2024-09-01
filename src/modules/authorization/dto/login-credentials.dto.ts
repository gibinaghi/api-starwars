import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import genericsDoc from '../../../common/documentation/modules/gererics/dto/generic.dto';
import { emailRegex } from '@app/common/helper/email-regex';
import { passwordRegex } from '@app/common/helper/password-regex';

export class LoginCredentialsDto {
  @IsString()
  @Matches(emailRegex, {
    message: 'El email no es valido',
  })
  @ApiProperty(genericsDoc.loginCredentialsDto.email)
  email: string;

  @IsString()
  @Matches(passwordRegex, {
    message: 'Contraseña no valida',
  })
  @ApiProperty(genericsDoc.loginCredentialsDto.password)
  password: string;
}
