import { MenuItem, Select } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../App.css";
import axios from "axios";

const Container = styled.div`
  background-color: darkseagreen;
  margin: 20px;
  width: 200px;
`;

const Main = () => {
  const [items, setItems] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD"); //hook
  const [coefficient, setCoefficient] = useState();

  const handleFromCurrencyChange = (event) => {
    const from = event.target.value;
    setFromCurrency(from);

    setToAmount(
      (fromAmount * coefficient[toCurrency]) / coefficient[fromCurrency]
    );
  };
  const [toCurrency, setToCurrency] = useState("CAD");
  const handleToCurrencyChange = (event) => {
    const to = event.target.value;
    setToCurrency(to);
    setToAmount(
      (fromAmount * coefficient[toCurrency]) / coefficient[fromCurrency]
    );
  };

  const [fromAmount, setFromAmount] = useState();
  const [toAmount, setToAmount] = useState(0);

  const handleFromAmountChange = (event) => {
    const from = Number(event.target.value);
    setFromAmount(from);
    setToAmount((from * coefficient[toCurrency]) / coefficient[fromCurrency]);
  };

  useEffect(() => {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}`)
      .then((result) => {
        console.log("App -> result", result);
        console.log(Object.keys(result.data.rates));
        setItems(Object.keys(result.data.rates));
        console.log(result.data.rates.CAD);
        console.log(result.data.rates["CAD"]);
        setCoefficient(result.data.rates);
        // setItems(result.map((response) => response.data.rates));
        // setCoefficient();
      });
  }, [fromCurrency, toCurrency]);

  // const getCurrencyColor = () => {
  //   if (fromCurrency === "usd") return "green";
  //   if (fromCurrency === "cad") return "gold";
  //   if (fromCurrency === "eur") return "white";
  //   return "blue;";
  // };

  return (
    <div className="App">
      <h2>Home</h2>
      <header className="App-header">
        <form autoComplete="off">
          <Container>
            <InputLabel id="from-currency-label">From</InputLabel>
            <Select
              labelId="from-currency-label"
              id="from-currency"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              label="From"
            >
              {items.map((apiData) => (
                <MenuItem key={apiData.keys} value={apiData}>
                  {apiData}
                </MenuItem>
              ))}
            </Select>
          </Container>
          <Container>
            <InputLabel id="to-currency-label">To</InputLabel>
            <Select
              labelId="to-currency-label"
              id="to-currency"
              value={toCurrency}
              onChange={handleToCurrencyChange}
              label="To"
            >
              {items.map((apiData) => (
                <MenuItem key={apiData.keys} value={apiData}>
                  {apiData}
                </MenuItem>
              ))}
            </Select>
          </Container>
          <Container>
            <TextField
              id="from-amount"
              label="Amount"
              variant="outlined"
              value={fromAmount}
              type="number"
              onChange={handleFromAmountChange}
            />
          </Container>
          <Container>
            <TextField
              id="to-amount"
              label="Converted"
              variant="outlined"
              disabled
              value={toAmount}
            />
          </Container>
        </form>
      </header>
    </div>
  );
};

export default Main;
