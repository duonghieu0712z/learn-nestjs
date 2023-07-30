export default () => ({
  mongoUri: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/sale',
  port: parseInt(process.env.PORT ?? '3000'),
});
