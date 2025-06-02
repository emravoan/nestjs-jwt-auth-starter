import { ConfigService } from '@nestjs/config';
import { LoggerModuleAsyncParams } from 'nestjs-pino';
import pino from 'pino';
import * as fs from 'fs';
import * as path from 'path';
import * as rfs from 'rotating-file-stream';
import { RequestMethod } from '@nestjs/common';

export const LoggerFactory: LoggerModuleAsyncParams = {
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const isProd = config.get<string>('app.env') === 'production';
    const logDir = path.resolve('./logs');

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const stream = rfs.createStream(
      (time) => {
        if (!time) return 'app.log';
        const date = new Date(time);
        return `app-${date.toISOString().slice(0, 10)}.log.gz`;
      },
      {
        path: logDir,
        maxFiles: 30,
        interval: '1m',
        compress: 'gzip',
      },
    );

    return {
      pinoHttp: {
        autoLogging: false,
        timestamp: pino.stdTimeFunctions.isoTime,
        customProps: () => ({}),
        customLogLevel: (req, res, err) => {
          console.log(res.statusCode);
          if (res.statusCode >= 500 || err) return 'error';
          if (res.statusCode >= 400) return 'warn';
          return 'info';
        },
        ...(isProd
          ? { stream }
          : {
              transport: {
                target: 'pino-pretty',
                options: {
                  destination: './logs/app.log',
                  mkdir: true,
                  sync: false,
                  translateTime: 'yyyy-mm-dd HH:MM:ss',
                  ignore: 'pid,hostname,req,res,responseTime',
                  messageFormat: '{method} {url} from {ip} - {msg}',
                  colorize: false,
                  singleLine: true,
                },
              },
            }),
      },
      forRoutes: [{ method: RequestMethod.ALL, path: '*path' }],
      exclude: [],
    };
  },
};
