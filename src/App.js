import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import {
  selectCalculator,
  setSelectedOptions,
  setActualKm,
  setFinalDf,
  reset
} from "./features/calculator/calculatorSlice";
import {Button} from "@material-ui/core";

const App = () => {
  const calculator = useSelector(selectCalculator);
  const dispatch = useDispatch();

  const calculate = () => {
    const { selectedOption, actualKm } = calculator;
    const {
      insideSourceTown,
      distanceFromSourceTown,
      baseRate,
      perKm
    } = selectedOption;

    let finalDf;
    if (insideSourceTown) {
      finalDf = (perKm * (actualKm-1)) + baseRate;
    } else {
      let additionalDf = 0.0;
      if (actualKm <= 2.9) {
        additionalDf = ((distanceFromSourceTown - actualKm) / 2) * 10;
      }
      finalDf = (perKm * (actualKm-1)) + baseRate + additionalDf;
    }
    dispatch(setFinalDf(finalDf));
  }
  return (
    <div className="App">
      <Autocomplete
          value={calculator.selectedOption}
          onChange={(event, newValue) =>
            dispatch(setSelectedOptions(newValue))
          }
          id="store-codes"
          options={calculator.options}
          getOptionLabel={(option) => option.title}
          style={{ minWidth: 300, maxWidth: 400, marginTop: '2rem' }}
          renderInput={(params) => <TextField {...params} label="Store Code" variant="outlined" />}
      />
      <TextField
        id="outlined-basic"
        label="Actual KM"
        variant="outlined"
        style={{ minWidth: 300, maxWidth: 400, marginTop: '1.5rem' }}
        type={"number"}
        onChange={event => dispatch(setActualKm(event.target.value))}
        value={parseFloat(calculator.actualKm) === 0.0 ? '' : parseFloat(calculator.actualKm)}
        disabled={!calculator.selectedOption}
      />
      <TextField
        id="outlined-basic"
        label="Final DF"
        variant="outlined"
        style={{ minWidth: 300, maxWidth: 400,  marginTop: '1.5rem', fontWeight: 'bold' }}
        type={"number"}
        value={calculator.finalDf}
        disabled={true}
      />
      <div className="buttonWrapper">
        <Button
          color="primary"
          variant="contained"
          style={{
            minWidth: 140, maxWidth: 180,  marginRight: 10, fontWeight: 'bold', color: '#fff'
          }}
          onClick={calculate}
          disabled={!calculator.selectedOption || calculator.actualKm === 0.0}
        >
          Calculate
        </Button>
        <Button
          color="primary"
          variant="outlined"
          style={{ minWidth: 140, maxWidth: 180, fontWeight: 'bold' }}
          onClick={() => dispatch(reset())}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

export default App;
