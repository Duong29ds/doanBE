var dbConfig = {
  synchronize: false,
  //where migrations look for to run pending
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign (dbConfig, {
      type: 'postgres',
      database: {},
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign (dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    Object.assign (dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['**/*.entity.ts'],
      ssl: {
        rejectUnauthorized: false,
      },
    });
  default:
    throw new Error ('have no enviroment');
}

module.exports = dbConfig;
