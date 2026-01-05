import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "../redux/slices/AuthSlice"
import productSlice from "../redux/slices/ProductsSlice"
import CartSlice from "./slices/CartSlice"
import paymentReducer from "./payment/paymentSlice"
import orderReducer from "./slices/orderSlice"

const store = configureStore({
    reducer:{
        auth:AuthReducer ,
        product:productSlice,
        cart: CartSlice,
        payment: paymentReducer,
        order:orderReducer
    },
    devTools:true
})


export default store