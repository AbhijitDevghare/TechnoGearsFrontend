import React, { useEffect, useState } from "react";
import HomeLayout from "../layout/HomeLayout";
import { useSelector, useDispatch } from "react-redux";
import { getCart, removeCart } from "../redux/slices/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/cart/Cart";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();w
  const  cart  = useSelector((state) => state.cart?.cart);

  // const [updatedCart,setUpadatedCart] = useState({})

  useEffect(() => {
    dispatch(getCart());

  }, [dispatch]);

  const handleRemoveFromCart = async (productId) => {
    await dispatch(removeCart(productId));
    // No need to call getCart again if removeCart already updates the state.. but i called it beacuse there were some issues 
    dispatch(getCart());

  };

  const handleOnCheckout = () => {
    navigate("/checkout");
  };

  return (
    <HomeLayout>
      <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Shopping Cart</h1>

        {!cart || !cart.items || cart.items.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onRemove={handleRemoveFromCart}
              />
            ))}

            <div className="mt-6 flex justify-between items-center">
              <div
                onClick={handleOnCheckout}
                className="bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Proceed to Checkout
              </div>
              <Link to="/products" className="text-blue-600 hover:text-blue-800">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default CartPage;
