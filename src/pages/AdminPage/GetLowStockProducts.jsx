import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLowStockProducts,
  updateProductStock
} from "../../redux/slices/ProductsSlice";
import "./GetLowStockProducts.css";
import Header from "../../components/header/Header";


function GetLowStockProducts() {

      const handleBack = () => window.history.back()

  const dispatch = useDispatch();
  const { lowStockProducts = [] } = useSelector(
    (state) => state?.product || {}
  );
  const [updatedStocks, setUpdatedStocks] = useState({});

  useEffect(() => {
    dispatch(fetchLowStockProducts());
  }, [dispatch]);

  const handleStockChange = (productId, value) => {
    setUpdatedStocks((prev) => ({ ...prev, [productId]: value }));
  };

  const handleUpdateClick = (productId) => {
    const newStock = parseInt(updatedStocks[productId], 10);
    if (!isNaN(newStock)) {
      dispatch(updateProductStock({ productId, newStock }));
      dispatch(fetchLowStockProducts());
    }
  };

  return (

      <>
              <Header showCart={false} showSearch={false} leftType="back"  onBack={handleBack}/>

   
    <div className="low-stock-page">
      <div className="low-stock-container">
        <h2 className="low-stock-title">Low Stock Products</h2>

        {lowStockProducts.length === 0 ? (
          <p className="empty-text">No low stock products found.</p>
        ) : (
          <div className="product-list">
            {lowStockProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>Category: {product.category}</p>
                </div>

                <div className="stock-actions">
                  <input
                    type="number"
                    value={
                      updatedStocks[product._id] ??
                      product.stock?.available
                    }
                    onChange={(e) =>
                      handleStockChange(product._id, e.target.value)
                    }
                  />
                  <button
                    onClick={() => handleUpdateClick(product._id)}
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
     </>
  );
}

export default GetLowStockProducts;
