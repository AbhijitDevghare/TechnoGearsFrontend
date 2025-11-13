import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HomeLayout from "../../layout/HomeLayout";
import CategorySelector from './CategorySelector';
import { getProductsByCategoryAndSubCategory, deleteProduct } from '../../../Redux/Slices/ProductsSlice';
import { toast } from 'react-toastify';

const DeleteProduct = () => {
    const dispatch = useDispatch();
    
    const { productsWithId } = useSelector((state) => state.product);
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [selectedProductIds, setSelectedProductIds] = useState([]);

    const handleCategoryChange = (selectedCategory) => {
        setCategoryId(selectedCategory);
        setSubCategoryId('');
        setSelectedProductIds([]);
        if (selectedCategory) {
            // Fetch subcategories
        }
    };

    const handleSubCategoryChange = (selectedSubCategory) => {
        setSubCategoryId(selectedSubCategory);
        setSelectedProductIds([]);
        if (selectedSubCategory) {
            dispatch(getProductsByCategoryAndSubCategory({ category: categoryId, subCategory: selectedSubCategory }));
        }
    };

    const handleProductSelection = (e) => {
        const selectedProductId = e.target.value;
        setSelectedProductIds((prevSelectedProductIds) =>
            e.target.checked
                ? [...prevSelectedProductIds, selectedProductId]
                : prevSelectedProductIds.filter((id) => id !== selectedProductId)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedProductIds.length === 0) {
            toast.error("Please select at least one product to delete.");
            return;
        }
        try {
            dispatch(deleteProduct({ productIds: selectedProductIds }));
            setCategoryId('');
            setSubCategoryId('');
            setSelectedProductIds([]);
        } catch (error) {
            toast.error("Failed to delete product. Please try again.");
        }
    };

    return (
        <HomeLayout>
            <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Delete Product</h1>
                <form noValidate onSubmit={handleSubmit} className="space-y-6">
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
                        <div className="form-group">
                            <label htmlFor="products" className="block text-lg font-medium text-gray-700 mb-2">Products</label>
                            <div className="space-y-2">
                                {productsWithId && productsWithId.map((product) => (
                                    <div key={product._id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`product-${product._id}`}
                                            value={product._id}
                                            onChange={handleProductSelection}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`product-${product._id}`} className="text-gray-700">{product.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Delete Product
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
};

export default DeleteProduct;
