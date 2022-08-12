import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getWorries = createAsyncThunk(
  "worries/getWorries",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("https://worry-share.herokuapp.com/worries");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addWorry = createAsyncThunk(
  "worries/addWorry",
  async (newWorry) => {
    const data = await axios.post(
      "https://worry-share.herokuapp.com/worries",
      newWorry
    );
    return data.data;
  }
);

export const __deleteWorries = createAsyncThunk(
  "worries/deleteWorries",
  async (payload, thunkAPI) => {
    await axios.delete(`https://worry-share.herokuapp.com/worries/${payload}`);
    return payload;
  }
);

export const __updateWorries = createAsyncThunk(
  "worries/updateWorries",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload);
      const data = await axios.patch(
        `https://worry-share.herokuapp.com/worries/${payload.id}`,
        payload
      );

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  worries: [],
  isLoading: false,
  error: null,
};

export const worrySlice = createSlice({
  name: "worry",
  initialState,
  reducers: {},
  extraReducers: {
    [__getWorries.pending]: (state) => {
      state.isLoading = true;
    },
    [__getWorries.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.worries = action.payload;
    },
    [__getWorries.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addWorry.fulfilled]: (state, action) => {
      state.worries = [...state.worries, action.payload];
    },
    [__deleteWorries.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteWorries.fulfilled]: (state, action) => {
      state.worries = state.worries.filter(
        (item) => item.id !== action.payload
      );
    },
    [__deleteWorries.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__updateWorries.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateWorries.fulfilled]: (state, action) => {
      console.log("action", action);
      state.isLoading = false;
      state.worries = [action.payload];
    },
    [__updateWorries.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const { addWorry, deleteWorry, updateWorry } = worrySlice.actions;
export default worrySlice.reducer;
