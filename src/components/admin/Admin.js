import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "./admin.css";
import axios from "axios";

const Admin = () => {
  const [numeros, setNumeros] = useState([]);

  const addNewNumber = () => {
    const max = 75;
    const min = 1;
    const newNumber = Math.round(Math.random() * (max - min) + min);
    setNumeros([...numeros, newNumber]);
  };
  const sendNewNumber = () => {
    axios
      .get(`/sendNewNumber`)
      .then((res) => setNumeros([...numeros, res.data.response]));
  };
  const [value, setValue] = React.useState("");
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper>
            Lista de Numeros
            <div className="listaNumeros">
              {numeros.map((num) => (
                <div>{num}</div>
              ))}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Permitir Nuevos usuarios
                </Typography>
                <RadioGroup
                  aria-label="quiz"
                  name="quiz"
                  value={value}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="Y"
                    control={<Radio />}
                    label="Yes!"
                  />
                  <FormControlLabel value="N" control={<Radio />} label="No." />
                </RadioGroup>
              </CardContent>
              <Button size="small">Actualizar</Button>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Ultimo Numero
                </Typography>
                <Typography color="textSecondary">
                  <h1>{numeros[numeros.length - 1]}</h1>
                </Typography>
              </CardContent>
              <Button size="small" color="primary" onClick={sendNewNumber}>
                Generar Nuevo Numero
              </Button>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
