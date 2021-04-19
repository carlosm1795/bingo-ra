const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const apiPort = process.env.PORT || 5000;
const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/carton", (req, res) => {
  res.send(createCarton());
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    req.sendFile(path.resolved(__dirname, "build", "index.html"));
  });
}
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
