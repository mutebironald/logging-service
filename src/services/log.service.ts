import { AppDataSource } from '../config/data-source';
import { Log, LogLevel } from '../entities/log.entity';
import { User } from '../entities/user.entity';

type LogMessage = {
  timestamp: string;
  level: LogLevel;
  text: string;
};

type SendLogRequest = LogMessage[];

type ReportingRequest = {
  startDate?: string;
  endDate?: string;
};

type ReportingResponse = {
  startDate?: string;
  endDate?: string;
  warningCount: number;
  errorCount: number;
  messageWithUrlCount: number;
};



export class LogService {
  static async saveLogs(user: User, logs: SendLogRequest) {
    const logRepository = AppDataSource.getRepository(Log);

    const logsToSave = logs.map((log) => ({
      userId: user.id,
      timestamp: new Date(log.timestamp),
      level: log.level,
      text: log.text,
      hasLocalhostUrl: /http:\/\/localhost/.test(log.text), // Check for localhost URLs
    }));

    await logRepository.save(logsToSave);
    return { message: 'Logs saved successfully' };
  }

  static async generateReport(user: User, request: ReportingRequest): Promise<ReportingResponse> {
    if (user.role !== 'admin') {
      throw new Error('Unauthorized to access report generation');
    }

    const { startDate, endDate } = request;
    if (!startDate || !endDate) {
      throw new Error('Both startDate and endDate must be provided');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Ensure endDate is greater than startDate
    if (end <= start) {
        throw new Error('endDate must be greater than startDate');
    }

    const logRepository = AppDataSource.getRepository(Log);
    const query = logRepository.createQueryBuilder('log')
      .where('log.userId = :userId', { userId: user.id });

    if (startDate) {
      query.andWhere('log.timestamp >= :startDate', { startDate: start });
    }

    if (endDate) {
      query.andWhere('log.timestamp <= :endDate', { endDate: end });
    }

    const [warningCount, errorCount, messageWithUrlCount] = await Promise.all([
      query.andWhere('log.level = :level', { level: 'warning' }).getCount(),
      query.andWhere('log.level = :level', { level: 'error' }).getCount(),
      query.andWhere('log.hasLocalhostUrl = :hasLocalhostUrl', { hasLocalhostUrl: true }).getCount(),
    ]);

    return {
      startDate,
      endDate,
      warningCount,
      errorCount,
      messageWithUrlCount,
    };
  }
}
