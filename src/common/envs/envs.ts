import setEnviroments from './set.envs';

setEnviroments();

export const envs = {
  // Db
  db_user: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_database: process.env.DB_DATABASE,
  db_database_port: process.env.DB_PORT,
  db_database_host: process.env.DB_HOST,
  // Server
  mode_server: process.env.MODE_DEV,
  base_path: process.env.SERVER_BASE_PATH,
  // Jwt
  jwt_secret: process.env.JWT_SECRET,
  // SuperAdmin
  super_admin_password: process.env.SUPERADMIN_PASSWORD,
  super_admin_email: process.env.SUPERADMIN_EMAIL,
  super_admin_name: process.env.SUPERADMIN_NAME,
};
