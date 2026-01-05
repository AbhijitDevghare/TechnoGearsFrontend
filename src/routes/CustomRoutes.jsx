import { Routes, Route } from "react-router-dom";
import About from "../pages/AboutPage/AboutPage";

import { useEffect } from "react";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import HomePage from "../pages/homepage/HomePage";
import CartPage from "../pages/CartPage/CartPage";
import AuthenticationPage from "../pages/Authentication/AuthenticationPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import GetLowStockProducts from "../pages/AdminPage/GetLowStockProducts";
import AdminPage from "../pages/AdminPage/AdminPage";
import AddProduct from "../pages/AdminPage/addProduct";
import UpdateProduct from "../pages/AdminPage/UpdateProduct";
// import DeleteProduct from "../pages/AdminPage/deleteProduct";



function CustomeRoutes() {

    // const dispatch = useDispatch()
    // useEffect(()=>{
    //     // console.log("Cart printing in the custome route ",dispatch(getCart()))
    // },[])

    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/products/:type" element={<ProductsPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/auth/:authType" element={<AuthenticationPage/>} />
            <Route path="/checkout" element={<CheckoutPage/>}/>
            {/* <Route path="/auth/:authType" element={<Authentication />} />
            <Route path="/contact" element={<ContactUsPage/>} />
            <Route path="/profile" element={<MyAccount/>} />
            <Route path='/addProducts' element={<AddProduct/>}/>
            <Route path='/product/:productName' element={<ProductDescription/>}/>
            <Route path='products/product/:productName' element={<ProductDescription/>}/>
            <Route path='/orders' element={<OrdersPage/>}/>


            {/* ADMIN ROUTES */}
            <Route path="/low-stock-products" element={<GetLowStockProducts/>} />
            <Route path="/updateProduct" element={<UpdateProduct/>} />
            <Route path='/admin' element={<AdminPage/>}/>
            <Route path='/addProducts' element={<AddProduct/>}/>
            {/* <Route path="/delete" element={<DeleteProduct/>}/> */}
        </Routes>
    );
}

export default CustomeRoutes;
