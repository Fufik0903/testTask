import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllData } from '../api/api';
import { Coordinates, listItem } from '../interfaces';

interface State {
  currentItem: listItem;
  list: listItem[];
  isLoading: boolean;
}

const initialState: State = {
  list: [],
  currentItem: {
    id: '',
    logo: '',
    address: '',
    companyName: '',
    dateStartByCity: '',
    timeStartByCity: '',
    timeEndByCity: '',
    currentWorkers: '',
    planWorkers: '',
    workTypes: [],
    priceWorker: '',
    customerFeedbacksCount: '',
    customerRating: '',
  },
  isLoading: false,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    getCurrentItem: (state, action) => {
      const { id } = action.payload;
      const currentItem = state.list.find(item => item.id === id);
      if (currentItem) state.currentItem = currentItem;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(allData.fulfilled, (state, action) => {
        const data = action.payload;
        state.list = data;
        state.isLoading = false;
      })
      .addCase(allData.pending, state => {
        state.isLoading = true;
      });
  },
});
export const allData = createAsyncThunk(
  'allData',
  async (coords: Coordinates, thunkAPI) => {
    try {
      const { latitude, longitude } = coords;
      const response = await getAllData(latitude, longitude);
      console.log('RESULT', response.data.data)
      return response.data.data;
    } catch (error: unknown) {
      let errorMessage = 'Unknown error';

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);
export const { getCurrentItem } = listSlice.actions;
export default listSlice.reducer;
