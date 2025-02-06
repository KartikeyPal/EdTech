import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";
const initialState={
    totalItems : localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart:null
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers:{
        setTotalItems(state,value){
            state.totalItems = value.payload;
        },
        //add to cart
        // remove from the cart
        //reset cart
        resetCart(state,value){
            state.cart = null;
            state.totalItems = 0;
        }
    },
});

export const {setTotalItems , resetCart}  = cartSlice.actions;
export default cartSlice.reducer;