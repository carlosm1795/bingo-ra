import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from "axios";
import socketIOClient from "socket.io-client";
const Carton = () => {
  const [response, setReponse] = useState("");
  const [carton, setCarton] = useState({ B: [] });
  const getCarton = () => {
    axios.get(`/carton`).then((res) => setCarton(res.data));
  };
  const [colors, setColors] = useState({
    B0: "",
    B1: "",
    B2: "",
    B3: "",
    B4: "",
    I0: "",
    I1: "",
    I2: "",
    I3: "",
    I4: "",
    N0: "",
    N1: "",
    N2: "",
    N3: "",
    N4: "",
    G0: "",
    G1: "",
    G2: "",
    G3: "",
    G4: "",
    O0: "",
    O1: "",
    O2: "",
    O3: "",
    O4: "",
  });
  const changeColor = (value) => {
    console.log("Me dieron click");
    let newColor = "";
    if (colors[value] === "") {
      newColor = "primary";
    } else {
      newColor = "";
    }
    setColors({
      ...colors,
      [value]: newColor,
    });
  };

  useEffect(() => {
    getCarton();
  }, []);

  useEffect(() => {
    const socket = socketIOClient("/");
    socket.on("FromAPI", (data) => {
      setReponse(data);
    });
  }, []);
  return (
    <div>
      <h1>Bienvenidos al Bingo y mucha Suerte!!</h1>
      {response ? <h1>Number is {response}</h1> : null}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">B</TableCell>
              <TableCell align="center">I</TableCell>
              <TableCell align="center">N</TableCell>
              <TableCell align="center">G</TableCell>
              <TableCell align="center">O</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carton["B"].map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => changeColor(`B${index}`)}
                    color={colors[`B${index}`]}
                  >
                    {row}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => changeColor(`I${index}`)}
                    color={colors[`I${index}`]}
                  >
                    {carton["I"][index]}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => changeColor(`N${index}`)}
                    color={colors[`N${index}`]}
                  >
                    {carton["N"][index]}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => changeColor(`G${index}`)}
                    color={colors[`G${index}`]}
                  >
                    {carton["G"][index]}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => changeColor(`O${index}`)}
                    color={colors[`O${index}`]}
                  >
                    {carton["O"][index]}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => console.log({ carton })}>Mostrar info</Button>
    </div>
  );
};

export default Carton;
