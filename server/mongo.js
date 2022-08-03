const MongoClient = require('mongodb').MongoClient;
const username = 'username';
const password = 'password';

module.exports = {
  'db' : function () {
    try {
      const URL = `mongodb://${username}:${password}@mongo/sns?authSource=admin`;
      const client = new MongoClient(URL);
      client.connect();
      console.log('Succesfully connected to mongo');
      return client.db();
    } catch (e) {
      console.error(e);
    }
  },
  'col' : function(db,col){
    return db.collection(col);
  }
};
