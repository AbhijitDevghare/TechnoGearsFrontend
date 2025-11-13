import { Link } from "react-router-dom";
import HomeLayout from "../../layout/HomeLayout";

function AdminPage() {
    return (
        <HomeLayout>
            
            <div className="p-6 mt-12">

                <h1 className="text-2xl font-bold mb-4">Admin Options</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
                        <p className="mb-4">View and manage user accounts, roles, and permissions.</p>
                        <button className="btn btn-primary">Go to User Management</button>
                    </div>



                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-2">Check Low Stock Products</h2>
                        <p className="mb-4"></p>
                        <Link to={"/low-stock-products"}>
                        <button className="btn btn-primary">Low stock products</button>

                        </Link>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-2">Add new products</h2>
                        <p className="mb-4"></p>
                        <Link to={"/addProducts"}>
                        <button className="btn btn-primary">Go to add products</button>
                        </Link>
                    </div>

                    
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-2">Delete products</h2>
                        <p className="mb-4">Delete products</p>
                        <Link to={"/deleteProduct"}>
                        <button className="btn btn-primary">Go to add products</button>
                        </Link>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-2">Update    products</h2>
                        <p className="mb-4">Update products</p>
                        <Link to={`/updateProduct`}>
                        <button className="btn btn-primary">Go to add products</button>
                        </Link>
                    </div>

                    {/* Add more sections as needed */}
                </div>
            </div>
        </HomeLayout>
    );
}

export default AdminPage;
