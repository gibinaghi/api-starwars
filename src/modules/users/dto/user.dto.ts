import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import genericsDoc from '../../../common/documentation/modules/gererics/dto/generic.dto';
import { emailRegex } from '../../../common/helper/email-regex';
import { passwordRegex } from '../../../common/helper/password-regex';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty(genericsDoc.createUserDto.password)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(emailRegex, {
    message: 'El email no es valido',
  })
  @ApiProperty(genericsDoc.createUserDto.email)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordRegex, {
    message:
      'El password no es valido: Debe tener minimo 8 caracteres, mayuscula, minuscula y un numero',
  })
  @ApiProperty(genericsDoc.createUserDto.password)
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(genericsDoc.createUserDto.rol_id)
  rol_id: number;
}
