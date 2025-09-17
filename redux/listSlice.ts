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
      state.currentItem = currentItem;
      console.log('RESULT', currentItem);
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
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const { getCurrentItem } = listSlice.actions;
export default listSlice.reducer;
