import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  data: null,
};

const subscriberSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {
    Subscribe: (state, action) => {
      state.status = true;
      state.data = action.payload;
    },

    unSubscribe: (state, payload) => {
      state.status = false;
      state.data = null;
    },
  },
});


export const {Subscribe,unSubscribe } = subscriberSlice.actions
export default subscriberSlice.reducer