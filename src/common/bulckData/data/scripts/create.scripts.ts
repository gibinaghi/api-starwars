import { Client } from 'pg';
import { connection } from './config.scripts';
import Query from './queries.scripts';
import Logger from 'src/configurations/configLogs/winston.logs';
import { InternalServerErrorException } from '@nestjs/common';
import { envs } from 'src/common/envs/envs';
import EncryptData from 'src/core/utils/encrypt.utils';

export const insertRoles = async (description: string) => {
  /** ===== Connection =====  */
  const client = new Client(connection);
  await client.connect();
  const query = new Query(client);

  try {
    const role = await query.selectData('roles', 'description', description);

    if (role && role.rowCount === 0) {
      await query.insertRole(description);
    }

    /** ===== Close Connection =====  */
    return true;
  } catch (e: any) {
    Logger.error(e.stack);
    throw new InternalServerErrorException(e.message);
  } finally {
    await client.end();
  }
};

export const insertSuperUser = async () => {
  /** ===== Connection =====  */
  const client = new Client(connection);
  await client.connect();
  const query = new Query(client);

  try {
    // SUPER ADMIN
    const user = await query.selectData(
      'users',
      'email',
      envs.super_admin_email,
    );

    const encryp = new EncryptData(process.env.JWT_SECRET);
    if (user && user.rowCount === 0) {
      await query.insertUser(
        'users',
        envs.super_admin_name,
        envs.super_admin_email,
        encryp.encrypt(envs.super_admin_password),
      );
    }

    /** ===== Close Connection =====  */
    return true;
  } catch (e: any) {
    Logger.error(e.stack);
    throw new InternalServerErrorException(e.message);
  } finally {
    await client.end();
  }
};
