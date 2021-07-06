import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  options: [
    {
      title: 'Apalit',
      insideSourceTown: true,
      distanceFromSourceTown: 0,
      baseRate: 40.00,
      perKm: 10.00,
    },
    {
      title: 'WingShots',
      insideSourceTown: false,
      distanceFromSourceTown: 3.4,
      baseRate: 50.00,
      perKm: 15.00,
    }
  ],
  selectedOption: null,
  actualKm: 0.0,
  finalDf: 0.0
}

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setSelectedOptions: (state, action) => {
      state.selectedOption = action.payload
    },
    setActualKm: (state, action) => {
      state.actualKm = parseFloat(action.payload)
    },
    setFinalDf: (state, action) => {
      state.finalDf = action.payload
    },
    reset: state => initialState
  }
});

export const { setSelectedOptions, setActualKm, setFinalDf, reset } = calculatorSlice.actions;
export const selectCalculator = (state) => state.calculator;
export default calculatorSlice.reducer;
