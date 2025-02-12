import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";
const initialState={
    totalItems : localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart:localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total")? JSON.parse(localStorage.getItem("total")): 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers:{
        //add to cart
        addToCart(state,value){
            const course = value.payload;
            const index = state.cart.findIndex((item)=> item._id === course._id);
            if(index>=0){
                toast.error("course already in cart");
            }
            state.cart.push(course);
            state.totalItems++;
        },
        setTotalItems(state,value){
            state.totalItems = value.payload;
        },
        // remove from the cart
        removeFromCart(state,value){
            const course = value.payload;
            const index = state.cart.findIndex((item) => item._id === course);
            if (index >= 0) {
                state.cart.splice(index, 1);
                state.totalItems--;
            } else {
                toast.error("Course not found in cart");
            }
        },
        //reset cart
        resetCart(state,value){
            state.cart = [];
            state.totalItems = 0;
        }
    },
});

export const {setTotalItems , resetCart,removeFromCart,addToCart}  = cartSlice.actions;
export default cartSlice.reducer;