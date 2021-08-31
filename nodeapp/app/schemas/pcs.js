const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: ObjectId } = Schema;

const pcsSchema = new Schema({
  name: {
    type: String
  },
  mac: {
    type: String,
  },
  port: {
    type: Number
  }
});

module.exports = mongoose.model('PCS', pcsSchema);
