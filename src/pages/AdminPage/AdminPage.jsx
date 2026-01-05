import { Link } from "react-router-dom";
import "./AdminPage.css";
import Header from "../../components/header/Header";


function AdminPage() {
    const handleBack = () => window.history.back()

  return (
    <>
            <Header showCart={false} showSearch={false} leftType="back"  onBack={handleBack}/>

    
    <div className="admin-page">
      <h1 className="admin-title">Admin Options</h1>

      <div className="admin-grid">
        <div className="admin-card">
          <h2>Manage Users</h2>
          <p>View and manage user accounts, roles, and permissions.</p>
          <button className="admin-btn">Go to User Management</button>
        </div>

        <div className="admin-card">
          <h2>Check Low Stock Products</h2>
          <Link to="/low-stock-products">
            <button className="admin-btn">Low Stock Products</button>
          </Link>
        </div>

        <div className="admin-card">
          <h2>Add New Products</h2>
          <Link to="/addProducts">
            <button className="admin-btn">Add Products</button>
          </Link>
        </div>

        <div className="admin-card">
          <h2>Delete Products</h2>
          <p>Delete products</p>
          <Link to="/deleteProduct">
            <button className="admin-btn">Delete Products</button>
          </Link>
        </div>

        <div className="admin-card">
          <h2>Update Products</h2>
          <p>Update products</p>
          <Link to="/updateProduct">
            <button className="admin-btn">Update Products</button>
          </Link>
        </div>
      </div>
    </div>

    </>
  );
}

export default AdminPage;
