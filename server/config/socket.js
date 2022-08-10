const socketIo = require('socket.io');
const mongo = require('../mongo.js');
const col = mongo.col('chat');

module.exports = function (server) {
  const io = socketIo(server);
  io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('sendMessage', (message) => {
      console.log('Message has been sent: ', message);
      col.insertOne({msg:message});
      // 'receiveMessage' というイベントを発火、受信したメッセージを全てのクライアントに対して送信する
      io.emit('receiveMessage', message);
    });
  });

};
