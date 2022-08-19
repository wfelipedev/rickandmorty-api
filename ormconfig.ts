module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  migrations: ['dist/src/migration/*.js'],
  entities: ['dist/**/**.entity.js'],
  cli: {
    migrationsDir: 'src/migration',
    entitiesDir: 'src/**'
  },
  synchronize: false,
  logging: false
}
