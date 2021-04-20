const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiPort = process.env.PORT || 5000;
const path = require("path");

const http = require("http");
const socketIo = require("socket.io");
const index = require("./routes/index");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);
let interval;
let clients = [];
io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);
  if (interval) {
    clearInterval(interval);
  }
  //interval = setInterval(() => getApiAndEmit(socket), 1000);

  clients = [...clients, socket];
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    clearInterval(interval);

    clients = clients.filter((conection) => conection.id != socket.id);
  });
});

const sayRandomNumber = (socketList) => {
  let number = Math.round(Math.random() * (75 - 1) + 1);
  for (let conection of clients) {
    conection.emit("FromAPI", number);
  }
  return number;
};

const getRandomNumbers = (minNumber, topNumber) => {
  let numbers = [];
  let toInsert = true;
  let newNumber = 0;
  for (let index = 0; index < 5; index++) {
    newNumber = Math.floor(Math.random() * (topNumber - minNumber) + minNumber);
    while (numbers.includes(newNumber)) {
      newNumber = Math.floor(
        Math.random() * (topNumber - minNumber) + minNumber
      );
    }
    numbers = [...numbers, newNumber];
  }
  return numbers;
};

const createCarton = () => {
  const carton = {
    B: [],
    I: [],
    N: [],
    G: [],
    O: [],
  };

  for (let index = 0; index < 5; index++) {
    carton["B"] = getRandomNumbers(1, 15);
    carton["I"] = getRandomNumbers(16, 30);
    carton["N"] = getRandomNumbers(31, 45);
    carton["G"] = getRandomNumbers(46, 60);
    carton["O"] = getRandomNumbers(61, 75);
  }
  return carton;
};

const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

app.get("/sendNewNumber", (req, res) => {
  let newNumber = sayRandomNumber(clients);
  res.send({ response: newNumber }).status(200);
});

app.get("/carton", (req, res) => {
  res.send(createCarton());
});

server.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
