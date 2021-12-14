const { checkWifiConnection } = require('../wifiObserver');
const { exceptionStatus } = require('../Clients/errorTreatment');
const io = require('socket.io')(process.env.SOCKET_PORT, {
  cors: {
    origin: '*',
  },
});

async function treatSocketError() {
  const status = await checkWifiConnection();
  if (!status) { io.emit('notConnected'); return; }
  io.emit('wifiStatus', true);
}

const socket = { connection: null };
const socketListener = () => socket.connection;

io.on('connection', (socket_) => {
  console.log('Socket on'); socket.connection = socket_;
  socket_.on('renewConnection', async () => { treatSocketError(); });
});

module.exports = { io, socketListener };
