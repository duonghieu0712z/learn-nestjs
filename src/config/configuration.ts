export default () => ({
  mongoUri: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/',
  dbName: process.env.DB_NAME ?? 'sale',
  port: parseInt(process.env.PORT ?? '3000'),
});
