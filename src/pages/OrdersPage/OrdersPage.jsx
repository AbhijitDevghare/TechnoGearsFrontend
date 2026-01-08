import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, getUserOrders } from "../../redux/slices/orderSlice";
import Header from "../../components/header/Header";
import "./OrdersPage.css"

const OrdersPage = () => {
  const orders = useSelector((state) => state?.order?.orders || []);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  const dispatch = useDispatch();
  const handleBack = () => window.history.back();

  const fetchOrders = async () => {
    try {
      await dispatch(getUserOrders()).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      setCancelling(orderId);
      await dispatch(cancelOrder(orderId)).unwrap();
      await dispatch(getUserOrders()).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      setCancelling(null);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg text-white">Loading orders...</div>;
  }

  return (
    <>
      <Header showCart={false} showSearch={false} title="My Orders" leftType="back" onBack={handleBack} />

      <div className="h-[100px]">

      </div>
      {/* MAIN CONTAINER */}
      <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
        <div className="max-w-5xl w-full">

          <div className="flex flex-wrap gap-3 text-sm mb-6 justify-center">
            <span className="text-yellow-300">Pending</span>
            <span className="text-blue-300">Processing / Shipped</span>
            <span className="text-green-300">Delivered</span>
            <span className="text-red-300">Cancelled</span>
          </div>

          {orders.length === 0 ? (
            <p className="text-center">No orders found.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="ordersBox"
              >
                <div className="flex flex-wrap justify-between items-center mb-3">
                  <div>
                    <p className="font-semibold">Order ID: {order._id}</p>
                    <p className="text-sm opacity-70">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="text-sm font-medium">
                    {order.status}
                  </span>
                </div>

                <div className="mb-3">
                  <h3 className="font-semibold mb-1">Shipping Address</h3>
                  <p className="text-sm">{order.shippingAddress.name}</p>
                  <p className="text-sm opacity-80">
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city} -{" "}
                    {order.shippingAddress.pincode}
                  </p>
                  <p className="text-sm opacity-80">
                    {order.shippingAddress.phone}
                  </p>
                </div>

                <div className="mb-3">
                  <h3 className="font-semibold mb-1">Shipping Status</h3>
                  <p className="text-sm opacity-80">{order.shippingStatus}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Products</h3>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li
                        key={item.productId || index}
                        className="flex justify-between items-center border-b border-white/20 pb-2"
                      >
                        <div className="flex items-center gap-4">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <p>{item.name}</p>
                        </div>
                        <p className="text-sm">
                          Qty: {item.quantity} | ₹{item.price * item.quantity}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-right mt-4 font-bold">
                  Total: ₹{(order.totalAmount / 100).toFixed(2)}
                </div>

                {order.shippingStatus !== "Cancelled" &&
                  order.shippingStatus !== "Delivered" && (
                    <button
                      className="mt-4 px-4 py-2 border border-red-400 text-red-400 rounded hover:bg-red-400 hover:text-black transition"
                      onClick={() => handleCancelOrder(order._id)}
                      disabled={cancelling === order._id}
                    >
                      {cancelling === order._id
                        ? "Cancelling..."
                        : "Cancel order"}
                    </button>
                  )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
