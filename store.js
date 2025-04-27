
import { configureStore } from '@reduxjs/toolkit';
import locationSlice, { newsSlice, weatherSlice } from './HandleLocation';


const store = configureStore({
  reducer: {
    location: locationSlice.reducer,
    weather : weatherSlice.reducer,
    news:newsSlice.reducer,
  },
});

export default store;

