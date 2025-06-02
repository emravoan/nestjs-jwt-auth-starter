declare global {
  type Nullable<T> = T | null;
  type Recordable<T = any> = Record<string, T>;
  type ReadonlyRecordable<T = any> = Readonly<Record<string, T>>;

  type NumberArray = number[];
  type StringArray = string[];
  type RecordableArray<T = any> = Record<string, T>[];

  type StrictPartial<T> = {
    [P in keyof T]: T[P];
  };

  declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';

      JWT_SECRET: string;
      JWT_EXPIRED: string;

      TYPEORM_TYPE: any;
      TYPEORM_HOST: string;
      TYPEORM_PORT: number;
      TYPEORM_USERNAME: string;
      TYPEORM_PASSWORD: string;
      TYPEORM_DATABASE: string;
    }
  }
}

export {};
