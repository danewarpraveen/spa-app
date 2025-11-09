import { configureStore } from "@reduxjs/toolkit";
import  productslice  from "../redux/slicess/ProductSlice"

export const store = configureStore({
    reducer :{
        products : productslice 
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;