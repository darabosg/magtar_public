const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const jwt = require('jsonwebtoken')

let mongoServer

exports.dbConnect = async () => {
  mongoServer = await MongoMemoryServer.create();

  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  await mongoose.connect(uri, mongooseOpts);

  return mongoServer;
};

exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

exports.dbClearCollections = async (models) => {
  const deletions = models.map((model) => model.deleteMany({}));

  await Promise.all(deletions);
};


const toJwt = { SUB: '006548', email: 'asd@gmail.com' }
exports.token = jwt.sign(toJwt, process.env.JWT_SECRET, { expiresIn: '16h' })