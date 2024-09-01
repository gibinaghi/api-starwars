import * as dotenv from 'dotenv';
import * as path from 'path';

export const setPath = (): string => {
  let dir = null;
  switch (process.env.MODE_DEV) {
    case 'local':
      dir = path.join(__dirname, '.env.local');
      break;
    default:
      dir = path.join(__dirname, '.env.local');
      break;
  }
  return dir;
};

const setEnviroments = () => {
  return dotenv.config({
    path: setPath(),
  });
};

export default setEnviroments;
