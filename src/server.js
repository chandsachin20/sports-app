const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes');
const path = require("path")
const cors = require("cors");
const http = require('http');
const socketio = require('socket.io')
const app = express();

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('user is connected', socket.id);
})

const userController = require("./controllers/UserController");

const PORT = process.env.PORT || 8001;



app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
 

try {
  mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("mongo db connected succesfully");
    } catch (error) {
  console.log(error);
}


app.use('/files', express.static(path.resolve(__dirname,"..","..","files")));
app.use(routes);

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
