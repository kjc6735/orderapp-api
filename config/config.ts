export default () => ({
  cookie_secret: process.env.COOKIE_SECRET || 'cookiesecret',
  jwt_secret: process.env.JWT_SECRET || 'jwtsecret',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '1234',
    database: process.env.DATABASE_DATABASE || 'api-server',
  },
});
