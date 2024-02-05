const mongoose = require('mongoose');

module.exports = async (modelName, collectionName) => {
  try {
    const connection = mongoose.connection;
    const collections = await connection.db.listCollections().toArray();

    const collectionExists = collections.some((coll) => coll.name === collectionName);

    if (collectionExists) {
      await connection.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};
