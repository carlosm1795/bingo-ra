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
const Carton = () => {
  //   let colors = {
  //     B: ["", "", "", "", ""],
  //     I: ["", "", "", "", ""],
  //     N: ["", "", "", "", ""],
  //     G: ["", "", "", "", ""],
  //     O: ["", "", "", "", ""],
  //   };
  const [carton, setCarton] = useState("");
  const getCarton = () => {
    axios
      .get(`http://localhost:3000/carton`)
      .then((res) => setCarton(res.data));
  };
  const [colors, setColors] = useState({
    B0: "",
    B1: "",
    B2: "",
    B3: "",
    B4: "",
  });
  const changeColor = (value) => {
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
    console.log(carton);
  }, []);
  return (
    <div>
      <table>
        <tr>
          <th>B</th>
          <th>I</th>
          <th>N</th>
          <th>G</th>
          <th>O</th>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
        </tr>
      </table>
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
