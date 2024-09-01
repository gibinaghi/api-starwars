import fetchData from './fetch-service';
import setEnviroments from '../common/envs/set.envs';
setEnviroments;

export class ApiService {
  static apiGetMovies = async () =>
    fetchData('GET', `https://swapi.dev/api/films`);
}
