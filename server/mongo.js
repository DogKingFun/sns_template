const MongoClient = require('mongodb').MongoClient;
const username = 'username';
const password = 'password';

module.exports = {
  'col' : function(col){
    try {
      const URL = `mongodb://${username}:${password}@mongo/sns?authSource=admin`;
      const client = new MongoClient(URL);
      client.connect();
      const db = client.db();
      console.log('Succesfully connected to mongo');
      return db.collection(col);
    } catch (e) {
      console.error(e);
    }
  }
};
