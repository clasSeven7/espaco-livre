const SERVER = {
  port: process.env.PORT || 3001,
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://espaco-livre.vercel.app'
        : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  },
};

export default SERVER;
