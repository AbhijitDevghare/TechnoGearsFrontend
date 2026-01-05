import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";
import { setCart } from "../../redux/slices/CartSlice";
import Header from "../../components/header/Header";
import "./Checkout.css"

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
      const handleBack = () => window.history.back()


  const cart = useSelector((state) => state.cart?.cart);
  const userId = useSelector((state) => state?.auth?.data?._id);

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

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => {
      const price =
        item.product.discount?.percentage > 0
          ? item.product.price *
            (1 - item.product.discount.percentage / 100)
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
        setTotal(calculateTotal(parsedCart.items));
      } else {
        navigate("/cart");
      }
    } else {
      setTotal(calculateTotal(cart.items));
    }
  }, [cart, dispatch, navigate]);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleCheckout = async () => {
    const { name, address, city, pincode, phone } = shippingInfo;

    if (!name || !address || !city || !pincode || !phone) {
      toast.error("Please fill all shipping details");
      return;
    }

    const formattedItems = cart.items.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      price:
        item.product.discount?.percentage > 0
          ? item.product.price *
            (1 - item.product.discount.percentage / 100)
          : item.product.price,
      quantity: item.quantity,
      image: item.product.images?.[0]?.url || "",
    }));

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load Razorpay");
      return;
    }

    try {
      const { data } = await axiosInstance.post("/payment/place-order", {
        amount: total,
      });

      const options = {
        key: "rzp_test_8ul6usPDlPmfnW",
        amount: data.order.amount,
        currency: "INR",
        name: "E-Commerce",
        description: "Secure Payment",
        order_id: data.order.id,

        handler: async function (response) {
          const verifyRes = await axiosInstance.post("/payment/verify", {
            provider_order_id: response.razorpay_order_id,
            transaction_id: response.razorpay_payment_id,
            payment_signature: response.razorpay_signature,
            totalAmount: total,
            shippingAddress: shippingInfo,
            cartItems: formattedItems,
            userId,
          });

          if (verifyRes.data.success) {
            toast.success("Payment Successful");
            dispatch(setCart({ items: [] }));
            localStorage.removeItem("cart");
            navigate("/order-success");
          } else {
            toast.error("Payment verification failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Checkout failed");
    }
  };

  // Modern Dark Input Style
  const inputStyle = 
    "w-full  border border-neutral-700 text-white px-5 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-neutral-500 shadow-inner";

  // Label Style
  const labelStyle = "block text-sm font-medium text-neutral-400 mb-2 ml-1";

  return (
    <div className="checkout-page">
  <Header leftType="back" title="Checkout" showSearch={false}         onBack={handleBack}
 />

  <div className="checkout-container">
    <div className="checkout-grid">

      {/* Left Column */}
      <div className="shipping-section">
        <div className="section-header">
          <h2>1. Shipping Details</h2>
          <p>Enter your delivery address.</p>
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input name="name" placeholder="e.g. John Doe" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Street Address</label>
          <input name="address" placeholder="e.g. 123 Main St, Apt 4B" onChange={handleChange} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input name="city" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Pincode</label>
            <input name="pincode" onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input name="phone" onChange={handleChange} />
        </div>
      </div>

      {/* Right Column */}
      <div className="summary-section">
        <h2 className="text-xl">2. Order Summary</h2>

        <div className="product-list">
          {cart?.items?.map((item) => {
            const price =
              item.product.discount?.percentage > 0
                ? item.product.price * (1 - item.product.discount.percentage / 100)
                : item.product.price;

            return (
              <div key={item._id} className="product-item">
                <div className="product-image">
                  {item.product.images?.[0]?.url ? (
                    <img src={item.product.images[0].url} alt={item.product.name} />
                  ) : (
                    <span>{item.product.name.charAt(0)}</span>
                  )}
                </div>

                <div className="product-info">
                  <h4>{item.product.name}</h4>
                  <p>Qty: {item.quantity} × ₹{price.toFixed(2)}</p>
                </div>

                <div className="product-total">
                  ₹{(price * item.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="price-summary">
          <div><span>Subtotal</span><span>₹{total.toFixed(2)}</span></div>
          <div><span>Shipping</span><span className="free">Free</span></div>
          <div className="grand-total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <button onClick={handleCheckout} className="pay-btn">
          Pay Now ₹{total.toFixed(2)}
        </button>

        <p className="secure-text">Secure 256-bit SSL Encrypted Payment</p>
      </div>
    </div>
  </div>
</div>

  );
};

export default CheckoutPage;