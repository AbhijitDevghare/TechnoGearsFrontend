import React, { useEffect, useState } from "react";
import HomeLayout from "../layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../helpers/axiosInstance";
import { placeOrder } from "../redux/slices/orderSlice";
import { setCart } from "../redux/slices/CartSlice";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const userId = useSelector((state)=>state?.auth?.data?._id)

  const [total, setTotal] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    const { name, address, city, pincode, phone } = shippingInfo;
    console.log("CART : ",cart);


    const formattedItems = cart.items.map(item => ({
      productId: item.product._id,
      name: item.product.name,
      price: item.product.discount?.percentage
        ? item.product.price * (1 - item.product.discount.percentage / 100)
        : item.product.price,
      quantity: item.quantity,
      image: item.product.images[0]?.url || '',
    }));
    
    console.log(formattedItems)
    
    if (!name || !address || !city || !pincode || !phone) {
      toast.error("Please fill all shipping details");
      return;
    }

    const orderRequestBody = {
      amount: total,
    };

    try {
      // 1. Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load Razorpay SDK.");
        return;
      }

      // 2. Create Razorpay Order on backend
      const { data: orderResponse } = await axiosInstance.post("/payment/place-order", orderRequestBody);

      if (!orderResponse.success || !orderResponse.order) {
        toast.error("Order creation failed.");
        return;
      }

      const { order } = orderResponse;


      // 3. Trigger Razorpay Payment
      
      const options = {
        // key:  process.env.REACT_APP_RAZORPAY_KEY_ID, 
        key: "rzp_test_8ul6usPDlPmfnW",
        amount: order.amount,
        currency: "INR",
        name: "TechnoGears E-Commerce",
        description: "Secure Payment",
        order_id: order.id,

        handler: async function (response) {
          const {
             razorpay_order_id,
            razorpay_payment_id,
             razorpay_signature,
          } = response;

          try {
            // 4. Verify payment & Save Order/Payment on backend
            const verifyRes = await axiosInstance.post("/payment/verify", {
              provider_order_id:razorpay_order_id,
              transaction_id:razorpay_payment_id,
              payment_signature:razorpay_signature,
              totalAmount: order.amount,
              shippingAddress:shippingInfo,
              cartItems:formattedItems,
              userId
            });

            if (verifyRes.data.success) {
              toast.success("Payment Successful & Verified!");
              dispatch(setCart({ items: [] }));
              localStorage.removeItem("cart");
              navigate("/order-success");
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (error) {
            toast.error("Server Error during verification.");
            console.error("Verification Error:", error);
          }
        },

        prefill: {
          name: shippingInfo.name || "Abhijit Devghare",
          email: "abhijit@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Something went wrong during checkout.");
      console.error("Checkout Error:", error);
    }
  };

  const calculateTotal = () => {
    return cart?.items?.reduce((acc, item) => {
      const price =
        item.product.discount?.percentage > 0
          ? item.product.price * (1 - item.product.discount.percentage / 100)
          : item.product.price;
      return acc + price * item.quantity;
    }, 0);
  };

  useEffect(() => {
    if (!cart || !cart.items || cart.items.length === 0) {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        dispatch(setCart(parsedCart));
        const totalAmount = parsedCart.items.reduce((acc, item) => {
          const price =
            item.product.discount?.percentage > 0
              ? item.product.price * (1 - item.product.discount.percentage / 100)
              : item.product.price;
          return acc + price * item.quantity;
        }, 0);
        setTotal(totalAmount);
      } else {
        navigate("/cart");
      }
    } else {
      const totalAmount = calculateTotal();
      setTotal(totalAmount);
    }
  }, [cart, dispatch, navigate]);

  return (
    <HomeLayout>
      <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Shipping Information</h3>

            <input type="text" name="name" placeholder="Full Name" value={shippingInfo.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <input type="text" name="address" placeholder="Address" value={shippingInfo.address} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <input type="text" name="city" placeholder="City" value={shippingInfo.city} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <input type="text" name="pincode" placeholder="Pincode" value={shippingInfo.pincode} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <input type="text" name="phone" placeholder="Phone Number" value={shippingInfo.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h3>

            {cart?.items?.map((item) => {
              const discountedPrice =
                item.product.discount?.percentage > 0
                  ? item.product.price * (1 - item.product.discount.percentage / 100)
                  : item.product.price;

              return (
                <div key={item._id} className="flex justify-between mb-2">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      ₹{discountedPrice.toFixed(2)} × {item.quantity}
                    </p>
                  </div>    
                  <p className="font-semibold">
                    ₹{(discountedPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              );
            })}

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckoutPage;
