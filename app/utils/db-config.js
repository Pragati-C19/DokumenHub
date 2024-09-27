const dbConfig = {
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  mongodb : {
    uri: process.env.MONGODB_URI
  }
};

export default dbConfig;
