import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

const exceptionsMap = new Map<number, any>([
  [400, BadRequestException],
  [401, UnauthorizedException],
  [404, NotFoundException],
  [403, ForbiddenException],
  [409, ConflictException],
  [500, InternalServerErrorException],
]);

export const exceptions = {
  getException: (code: number) => {
    const ExceptionClass =
      exceptionsMap.get(code) || InternalServerErrorException;
    return ExceptionClass;
  },
};
