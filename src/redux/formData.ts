import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FormType = {
  terms: boolean;
  picture: string;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

const initialState: FormType[] = [];

const formData = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormType>) => {
      state.push(action.payload);
    },
  },
});

export const { addFormData } = formData.actions;
export default formData.reducer;
