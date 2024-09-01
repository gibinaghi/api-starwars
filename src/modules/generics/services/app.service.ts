import { Injectable } from '@nestjs/common';
import ResponseUtil from '../../../core/utils/set-response.utils';
import * as version from '../../../configurations/apiVersion.json';
import { ResponseDto } from '../../../core/utils/set-response.utils';

@Injectable()
export class AppService extends ResponseUtil {
  constructor() {
    super();
    this.getVersionService = this.getVersionService.bind(this);
  }

  /* Version */
  async getVersionService(): Promise<ResponseDto> {
    try {
      this.setSuccess(200, 'Version API', version);
    } catch (e: any) {
      this.throwExcept();
    }
    return this.setSend();
  }
}
