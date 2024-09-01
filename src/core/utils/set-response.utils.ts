import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { exceptions } from './set-exceptions.utis';

export class ResponseDto {
  @IsBoolean()
  error: boolean;
  @IsString()
  message: string;
  @IsOptional()
  data: any;
  @IsOptional()
  code: any;
}

export default class ResponseUtil {
  public error: boolean;
  public data: any;
  public message: string;
  public code: number;
  constructor() {
    this.error = false;
    this.data = null;
    this.message = '';
    this.code = null;
    this.setSend = this.setSend.bind(this);
    this.setError = this.setError.bind(this);
    this.setSuccess = this.setSuccess.bind(this);
    this.throwExcept = this.throwExcept.bind(this);
  }

  setError(code: number, message?: string) {
    this.code = code || 409;
    this.error = true;
    this.message = message || 'failed';
    this.data = null;
    this.throwExcept();
  }

  throwExcept(code?: number, message?: string) {
    this.error = true;
    if (!this.code) {
      this.code = code || 500;
    }
    if (!this.message) {
      this.message = message || 'failed';
    }
    const ExceptionClass = exceptions.getException(this.code);
    throw new ExceptionClass(this.message);
  }

  setSuccess(code: number, message: string, data?: any): void {
    this.error = false;
    this.code = code;
    this.message = message || 'ok';
    this.data = data;
  }

  setSend() {
    return {
      code: this.code,
      error: this.error,
      message: this.message,
      data: this.data,
    };
  }

  async returnResponse(callback: any, data?: any): Promise<ResponseDto> {
    try {
      await callback(data);
    } catch (e: any) {
      this.throwExcept(e);
    }
    return this.setSend();
  }
}
