import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLowStockProducts, updateProductStock } from "../../redux/slices/ProductsSlice";
import HomeLayout from "../../layout/HomeLayout";

function GetLowStockProducts() {
  const dispatch = useDispatch();
  const { lowStockProducts = [] } = useSelector((state) => state?.product || {});
  const [updatedStocks, setUpdatedStocks] = useState({});

  useEffect(() => {
    dispatch(fetchLowStockProducts());
  }, [dispatch]);

  const handleStockChange = (productId, value) => {
    setUpdatedStocks((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleUpdateClick = (productId) => {
    const newStock = parseInt(updatedStocks[productId]);
    if (!isNaN(newStock)) {
      dispatch(updateProductStock({ productId, newStock }));
      dispatch(fetchLowStockProducts())
    }
  };

  return (
        <HomeLayout>

<div className="min-h-screen bg-gray-100 p-6 mt-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Low Stock Products
        </h2>

        {lowStockProducts.length === 0 ? (
          <p className="text-gray-500">No low stock products found.</p>
        ) : (
          <div className="space-y-6">
            {lowStockProducts.map((product) => (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border p-4 rounded-md bg-gray-50 shadow-sm gap-4"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-700">{product.name}</h3>
                  <p className="text-sm text-gray-500">Category: {product.category}</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={updatedStocks[product._id] ?? product.stock?.available}
                    onChange={(e) => handleStockChange(product._id, e.target.value)}
                    className="input input-bordered w-24 text-center"
                  />
                  <button
                    onClick={() => handleUpdateClick(product._id)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>


        </HomeLayout>
  );
}

export default GetLowStockProducts;
