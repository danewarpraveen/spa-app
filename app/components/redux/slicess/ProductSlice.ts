import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Endpoint from "../../config/Enpoint";
import { Api } from "../../config/Api";

const initialState = {
    products: [],
    todatlAmount : [],
    loading: false,
    error: null,
    userData : {},
    cardData : [] 
}

export const getProdects = createAsyncThunk("getProdects", async () => {
    const url = Endpoint.services.getAllProduct ;
    const res = await Api.get(url);
    return res ; 
}) 

export const doLogin = createAsyncThunk("login", async (param)=>{
    const url = Endpoint.services.login ;
    const res = await Api.post(url,param);
    console.log(res+"USersss");
    
    return res ;
})
 
export const forgetPassword = createAsyncThunk("forgetPassword",async (data:any)=>{
    const url = Endpoint.services.forgotPassword ;
    const resp = await Api.post(url,data);
    return resp ;
})

export const resetPassword = createAsyncThunk("resetPassword",async (data:any)=>{
    var url = `/reset-password?token=${encodeURIComponent(data?.token)}&newPassword=${encodeURIComponent(data?.newPassword)}`; ;
    // const url = Endpoint.services.resetPassword ;
    const resp = await Api.post(url,data);
    return resp ;
});

export const register = createAsyncThunk("register",async (data:any)=>{
const url = Endpoint.services.addUser+`?token=${encodeURIComponent(data?.user)}`;

const resp = await Api.post(url,data.item);

return resp ;
});

export const addtoCard = createAsyncThunk("addtoCard",async (data:any)=>{  

    const url = `${Endpoint.services.addtocard}/${data.user}`;

     let obj = {
        p_Id : data.item.product_id,
        s_name : data.item.productName,
        s_cost : data.item.productCost,
     }
    const resp = await Api.post(url,obj);
    return resp ;   
});

export const getCardsData = createAsyncThunk("getCards",async (username:string)=>{        
   
    const url = `${Endpoint.services.getCards}?user=${username}`;
    const resp = await Api.get(url);
    return resp ;   
});

export  const deleteByCardId = createAsyncThunk("deleteByCardId",async (data:any)=>{        
    
    const url = `${Endpoint.services.deleteCard}/${data.user}/${data.cardId}`;

    const resp = await Api.delete(url);
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
                state.userData = action.payload
            }
            )
            .addCase(doLogin.rejected, (state:any, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            .addCase(addtoCard.pending, (state) => {
                state.loading = true
            })
            .addCase(addtoCard.fulfilled, (state:any, action) => {
                state.loading = false;
                state.cardData = action.payload
            }
            )
            .addCase(addtoCard.rejected, (state:any, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            
            
    }
})

export default productslice.reducer