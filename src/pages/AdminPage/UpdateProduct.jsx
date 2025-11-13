import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateProductDetails } from '../../redux/slices/ProductsSlice';
import HomeLayout from "../../layout/HomeLayout";
import toast from 'react-hot-toast';

function UpdateProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const initialProductState = location.state || {
        name: '',
        description: '',
        category: '',
        brand: '',
        price: '',
        discount: { percentage: 0, validTill: '' },
        stock: { available: 0, reserved: 0 },
        shipping: { deliveryOptions: [] },
        images: []
    };

    const [product, setProduct] = useState(initialProductState);

    const handleImage = (event) => {
        const files = Array.from(event.target.files);
        setProduct((prev) => ({
            ...prev,
            images: files
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setProduct((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setProduct((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleDeliveryOptions = (e) => {
        const { value, checked } = e.target;
        setProduct((prev) => ({
            ...prev,
            shipping: {
                ...prev.shipping,
                deliveryOptions: checked
                    ? [...prev.shipping.deliveryOptions, value]
                    : prev.shipping.deliveryOptions.filter((opt) => opt !== value)
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("category", product.category);
        formData.append("brand", product.brand);
        formData.append("price", product.price);
        formData.append("discount[percentage]", product.discount.percentage);
        formData.append("discount[validTill]", product.discount.validTill);
        formData.append("stock[available]", product.stock.available);
        formData.append("stock[reserved]", product.stock.reserved);

        product.shipping.deliveryOptions.forEach((option) =>
            formData.append("shipping[deliveryOptions][]", option)
        );

        product.images.forEach((image) => {
            formData.append("images", image);
        });

        // ✅ Debug: Log form data content
        console.log("FormData contents:");
        for (let [key, value] of formData.entries()) {
            // console.log(`${key}: ${value}`);
        }

        try {
            await dispatch(updateProductDetails({formData,productId:product._id}));
            navigate("/");
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Error updating product!");
        }
    };

    return (
        <HomeLayout>
            <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Update Product</h1>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Product Name */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4"
                            rows="3"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4"
                        />
                    </div>

                    {/* Brand */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={product.brand}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4"
                        />
                    </div>

                    {/* Discount */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">Discount (%)</label>
                            <input
                                type="number"
                                name="discount.percentage"
                                value={product.discount.percentage}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-2 px-4"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">Valid Till</label>
                            <input
                                type="date"
                                name="discount.validTill"
                                value={product.discount.validTill}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-2 px-4"
                            />
                        </div>
                    </div>

                    {/* Stock */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">Available Stock</label>
                            <input
                                type="number"
                                name="stock.available"
                                value={product.stock.available}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-2 px-4"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">Reserved Stock</label>
                            <input
                                type="number"
                                name="stock.reserved"
                                value={product.stock.reserved}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-2 px-4"
                            />
                        </div>
                    </div>

                    {/* Delivery Options */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Delivery Options</label>
                        <div className="space-x-4">
                            {["Home Delivery", "Pickup", "Courier"].map(option => (
                                <label key={option}>
                                    <input
                                        type="checkbox"
                                        value={option}
                                        checked={product.shipping.deliveryOptions.includes(option)}
                                        onChange={handleDeliveryOptions}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Product Images</label>
                        <input
                            type="file"
                            name="images"
                            multiple
                            onChange={handleImage}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default UpdateProduct;
