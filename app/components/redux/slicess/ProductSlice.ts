import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Endpoint from "../../config/Enpoint";
import { Api } from "../../config/Api";

const initialState = {
    products: [],
    todatlAmount : [],
    loading: false,
    error: null
}

export const getProdects = createAsyncThunk("getProdects", async () => {
    const url = Endpoint.services.getAllProduct ;
    const res = await Api.get(url);
    return res ; 
}) 

export const doLogin = createAsyncThunk("login", async (param)=>{
    const url = Endpoint.services.login ;
    const res = await Api.post(url,param);
    return res ;
})


export const register = createAsyncThunk("register",async (data:any)=>{
const url = Endpoint.services.addUser ;

const resp = await Api.post(url,data);
return resp ;

});


const productslice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProdects.pending, (state) => {
                state.loading = true
            })
            .addCase(getProdects.fulfilled, (state:any, action) => {
                state.loading = false;
                state.products = action.payload
            }
            )
            .addCase(getProdects.rejected, (state:any, action) => {
                state.loading = false;
                state.error = action.error.message
            })
             .addCase(doLogin.pending, (state) => {
                state.loading = true
            })
            .addCase(doLogin.fulfilled, (state:any, action) => {
                state.loading = false;
                state.products = action.payload
            }
            )
            .addCase(doLogin.rejected, (state:any, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            
    }
})

export default productslice.reducer