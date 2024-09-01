import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import Logger from '../../../configurations/configLogs/winston.logs';
import { MovieService } from './movie.service';

@Injectable()
export class CronService {
  constructor(private _movieService: MovieService) {}

  /**
   * Cron Job: cron geta and create movies
   * default frequency: every 2 minutes
   */
  @Cron('0 */2 * * * *', {
    timeZone: 'America/Argentina/Buenos_Aires',
  })
  async cronMovieJob() {
    Logger.info('Job started...');
    try {
      const response = await this.getMoviesAndInsertJob();

      if (response.error) {
        throw new Error(response.message);
      }
    } catch (e: any) {
      Logger.error(`ERROR: ${e.message}`);
    }
  }

  /**
   * Method get movies from api star wars and insert in db
   * This method is executed from job.
   */
  async getMoviesAndInsertJob(): Promise<{ error: boolean; message: string }> {
    try {
      const result = await this._movieService.syncWithStarWarsAPI();
      if (result.error) {
        throw new Error(result.message);
      }
      Logger.info('Job finished.');
      return { error: false, message: 'Ok' };
    } catch (e: any) {
      Logger.error(`ERROR: ${e.message}`);
      return { error: true, message: e.message };
    }
  }
}
