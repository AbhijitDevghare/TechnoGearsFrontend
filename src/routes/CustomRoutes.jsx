import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Authentication from "../pages/AuthenticationPage/AuthicationPage";
import About from "../pages/AboutPage/AboutPage";
import ContactUsPage from "../pages/ContactUsPage/ContactUsPage";
import MyAccount from "../pages/MyAccount/MyAccount";
import AdminPage from "../pages/AdminPage/AdminPage";
import AddProduct from "../pages/AdminPage/addProduct";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProductDescription from "../components/ProductDescription/ProductDescription";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import { useEffect } from "react";

import OrdersPage from "../pages/OrdersPage";
import GetLowStockProducts from "../pages/AdminPage/GetLowStockProducts";
import UpdateProduct from "../pages/AdminPage/UpdateProduct";

function CustomeRoutes() {

    // const dispatch = useDispatch()
    // useEffect(()=>{
    //     // console.log("Cart printing in the custome route ",dispatch(getCart()))
    // },[])

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/:authType" element={<Authentication />} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<ContactUsPage/>} />
            <Route path="/profile" element={<MyAccount/>} />
            <Route path='/products' element={<ProductsPage/>}/>
            <Route path='/admin' element={<AdminPage/>}/>
            <Route path='/addProducts' element={<AddProduct/>}/>
            <Route path='/product/:productName' element={<ProductDescription/>}/>
            <Route path='products/product/:productName' element={<ProductDescription/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/orders' element={<OrdersPage/>}/>
            <Route path="/checkout" element={<CheckoutPage />} />


            {/* ADMIN ROUTES */}
            <Route path="/low-stock-products" element={<GetLowStockProducts/>} />
            <Route path="product/updateProduct" element={<UpdateProduct/>} />

        </Routes>
    );
}

export default CustomeRoutes;
