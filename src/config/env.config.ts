export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    jwtSecret: process.env.JWT_SECRET || 'secret_key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    
    // MongoDB configuration for Sham Airport
    mongodb: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
      database: process.env.MONGODB_DATABASE || 'sham_airport',
    },
    
    // PostgreSQL configuration for Emirates Airport
    postgres: {
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USERNAME || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DATABASE || 'emirates_airport',
      synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true',
    },
    
    // MySQL configuration for Qatar Airport
    mysql: {
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
      username: process.env.MYSQL_USERNAME || 'root',
      password: process.env.MYSQL_PASSWORD || '1234',
      database: process.env.MYSQL_DATABASE || 'qatar_airport',
      synchronize: process.env.MYSQL_SYNCHRONIZE === 'true',
    },
  });