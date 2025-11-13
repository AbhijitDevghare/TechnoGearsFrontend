import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../layout/HomeLayout";
import { cancelOrder, getUserOrders } from "../redux/slices/orderSlice";

const OrdersPage = () => {
  const orders = useSelector((state) => state?.order?.orders);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  const dispatch = useDispatch();

  const fetchOrders = async () => {
    try {
      await dispatch(getUserOrders()).unwrap();
    } catch (err) {
      console.error("Failed to fetch orders:", err);
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
    } catch (error) {
      console.error("Error cancelling order:", error);
    } finally {
      setCancelling(null);
    }
  };

  if (loading) {
    return (
      <HomeLayout>
        <div className="text-center mt-10 text-lg animate-pulse">
          Loading orders...
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <br />
      <br />
      <div className="p-4 max-w-5xl mx-auto w-[100vw] flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>

        <div className="flex flex-wrap gap-4 text-sm mb-6">
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Processing / Shipped</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Delivered</span>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Cancelled</span>
        </div>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-xl mb-6 shadow-md bg-white">
              <div className="flex flex-wrap justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <h3 className="font-semibold mb-1">Shipping Address</h3>
                <p className="text-sm text-gray-700">{order.shippingAddress.name}</p>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
                </p>
                <p className="text-sm text-gray-600">{order.shippingAddress.phone}</p>
              </div>

              <div className="mb-3">
                <h3 className="font-semibold mb-1">Shipping Status</h3>
                <p className="text-sm text-gray-600">{order.shippingStatus}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Products</h3>
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li
                      key={item.productId || index}
                      className="flex justify-between items-center border-b pb-1"
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
                      <p>
                        Qty: {item.quantity} | ₹{item.price * item.quantity}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-right mt-4 font-bold text-lg">
                Total: ₹{(order.totalAmount / 100).toFixed(2)}
              </div>

              {order.shippingStatus !== "Cancelled" && order.shippingStatus !== "Delivered" && (
                <button
                  className="btn btn-error mt-4"
                  onClick={() => handleCancelOrder(order._id)}
                  disabled={cancelling === order._id}
                >
                  {cancelling === order._id ? "Cancelling..." : "Cancel order"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </HomeLayout>
  );
};

export default OrdersPage;
