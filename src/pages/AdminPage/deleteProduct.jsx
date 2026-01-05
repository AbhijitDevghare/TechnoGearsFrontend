import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CategorySelector from "./CategorySelector";
import SubCategorySelector from "./SubCategorySelector";
import {
  getProductsByCategoryAndSubCategory,
  deleteProduct
} from "../../../Redux/Slices/ProductsSlice";
import { toast } from "react-toastify";
import "./DeleteProduct.css";
import Header from "../../components/header/Header";


const DeleteProduct = () => {
  const dispatch = useDispatch();

      const handleBack = () => window.history.back()

  const { productsWithId = [] } = useSelector((state) => state.product);

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const handleCategoryChange = (id) => {
    setCategoryId(id);
    setSubCategoryId("");
    setSelectedProductIds([]);
  };

  const handleSubCategoryChange = (id) => {
    setSubCategoryId(id);
    setSelectedProductIds([]);
    dispatch(
      getProductsByCategoryAndSubCategory({
        category: categoryId,
        subCategory: id
      })
    );
  };

  const handleProductSelection = (e) => {
    const { value, checked } = e.target;
    setSelectedProductIds((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedProductIds.length) {
      toast.error("Please select at least one product to delete.");
      return;
    }

    dispatch(deleteProduct({ productIds: selectedProductIds }));
    setCategoryId("");
    setSubCategoryId("");
    setSelectedProductIds([]);
  };

  return (

    <>
              <Header showCart={false} showSearch={false} leftType="back"  onBack={handleBack}/>

   
    <div className="delete-product-container">
      <h1 className="delete-product-title">Delete Product</h1>

      <form onSubmit={handleSubmit}>
        <CategorySelector
          selectedCategory={categoryId}
          onCategoryChange={handleCategoryChange}
        />

        {categoryId && (
          <SubCategorySelector
            categoryId={categoryId}
            selectedSubCategory={subCategoryId}
            onSubCategoryChange={handleSubCategoryChange}
          />
        )}

        {subCategoryId && (
          <div className="product-list">
            <label className="section-label">Products</label>

            {productsWithId.map((product) => (
              <div key={product._id} className="product-item">
                <input
                  type="checkbox"
                  value={product._id}
                  onChange={handleProductSelection}
                />
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="delete-btn">
          Delete Product
        </button>
      </form>
    </div>
     </>
  );
};

export default DeleteProduct;
