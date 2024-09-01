import Logger from '../../../configurations/configLogs/winston.logs';
import roles from './data-insert/roles';
import { insertRoles, insertSuperUser } from './scripts/create.scripts';
import { InternalServerErrorException } from '@nestjs/common';

class SetDefaultData {
  async setData(): Promise<void> {
    Logger.info(`Data insert started...`);
    await this.setRoles();
    Logger.info(`Inserting Roles...`);
    await this.setSuperUser();
    Logger.info(`Inserting SuperUser...`);
  }

  /**
   * Insert roles
   */
  async setRoles(): Promise<void> {
    try {
      for (const rol of roles) {
        await insertRoles(rol.description);
      }
    } catch (e: any) {
      Logger.error(e.message);
      throw new InternalServerErrorException(e.stack);
    }
  }

  /**
   * Insert superuser
   */
  async setSuperUser(): Promise<void> {
    try {
      await insertSuperUser();
    } catch (e: any) {
      Logger.error(e.message);
      throw new InternalServerErrorException(e.stack);
    }
  }
}

export default (function AddData() {
  return new SetDefaultData();
})();
