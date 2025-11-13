// src/pages/AdminOrderManagementPage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../../../Redux/Slices/orderSlice';
import { Link } from 'react-router-dom';

const AdminOrderManagementPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Order Management</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p>Order Number: #{order._id}</p>
                <p>Status: {order.status}</p>
                <p>User: {order.user.name}</p>
              </div>
              <Link to={`/admin/order/${order._id}`} className="text-blue-600 hover:text-blue-800">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderManagementPage;
