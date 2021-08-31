require('dotenv').config();
const mongoose = require('mongoose');

module.exports = () => {
  const connect = () => {
    const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_COLLECTION } = process.env;
    mongoose.connect(
      `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_COLLECTION}?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      err => {
        if (err) console.log(err);
        else console.log('mongoDB connection success');
      },
    );
  };
  connect();
  /* error 발생 시에 Error 생성 */
  mongoose.connection.on('error', err => {
    throw new Error(err);
  });
  mongoose.connection.on('disconnected', connect);
  require('./pcs');
};
