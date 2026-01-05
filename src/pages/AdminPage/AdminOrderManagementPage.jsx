import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../../../Redux/Slices/orderSlice";
import { Link } from "react-router-dom";
import "./AdminOrderManagementPage.css";
import Header from "../../components/header/Header";


const AdminOrderManagementPage = () => {
  const dispatch = useDispatch();
  const { orders = [] } = useSelector((state) => state.order);
    const handleBack = () => window.history.back()

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (

        <>
            <Header showCart={false} showSearch={false} leftType="back"  onBack={handleBack}/>

    <div className="admin-orders-container">
      <h1 className="admin-orders-title">Order Management</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-card-content">
              <div>
                <p><strong>Order Number:</strong> #{order._id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>User:</strong> {order?.user?.name}</p>
              </div>

              <Link
                to={`/admin/order/${order._id}`}
                className="order-details-link"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AdminOrderManagementPage;
