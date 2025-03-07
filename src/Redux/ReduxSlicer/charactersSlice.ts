import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Results from '../../Interfaces/Api-result';

type ResultsState = {
  allCharacters: Results[];
  detailsCharacter: Results | null;
};

const initialState: ResultsState = {
  allCharacters: [],
  detailsCharacter: null,
};

export const resultSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<ResultsState[]>) => {
      state.allCharacters = action.payload;
    },
    setDetails: (state, action: PayloadAction<ResultsState | null>) => {
      state.detailsCharacter = action.payload;
    },
  },
});

export const { setCharacters, setDetails } = resultSlice.actions;
export const characters = (state: RootState) => state.characters;
export default charactersSlice.reducer;
