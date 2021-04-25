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
//app.use(index);

const server = http.createServer(app);
const io = socketIo(server);
let interval;
let clients = [];
let numbersList = [];

const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    "postgres://kkiwkplfgucgck:e4987186c0e9c1308bea2856f283160ed110287d0a022ec47b4d27728451cf73@ec2-52-1-115-6.compute-1.amazonaws.com:5432/ddjtf8vtcufvmk",
  ssl: {
    rejectUnauthorized: false,
  },
});

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
  let number = "";
  let toSend = true;
  while (toSend) {
    number = Math.round(Math.random() * (75 - 1) + 1);
    if (!numbersList.includes(number)) {
      for (let conection of clients) {
        conection.emit("FromAPI", number);
      }
      numbersList = [...numbersList, number];
      toSend = false;
    }
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

app.get("/", function (req, res) {
  res.sendFile(buildPath + "index.html");
});
app.get("/sendNewNumber", (req, res) => {
  let newNumber = sayRandomNumber(clients);
  res.send({ response: newNumber }).status(200);
});

app.get("/carton", (req, res) => {
  res.send(createCarton());
});

app.get("/db", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM bingo");
    const results = { results: result ? result.rows : null };
    res.send({ response: results }).status(200);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

server.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
