import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllData } from '../api/api';
import { Coordinates } from '../permission/permission';

interface workType {
  id: number;
  name: string;
  nameGt5: string;
  nameLt5: string;
  nameOne: string;
}
interface listItem {
  id: string;
  logo: string;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: string;
  planWorkers: string;
  workTypes: workType[];
  priceWorker: string;
  customerFeedbacksCount: string;
  customerRating: string;
}

interface State {
  currentItem: object;
  list: listItem[];
  isLoading: boolean;
}

const initialState: State = {
  list: [],
  currentItem: {},
  isLoading: false,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(allData.fulfilled, (state, actions) => {
        const data = actions.payload;
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
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export default listSlice.reducer;
