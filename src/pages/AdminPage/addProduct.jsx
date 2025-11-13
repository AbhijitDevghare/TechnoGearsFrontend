import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HomeLayout from "../../layout/HomeLayout";
import { AddProducts } from '../../redux/slices/ProductsSlice';
import toast, { ToastBar } from 'react-hot-toast';

function AddProduct() {
    const dispatch = useDispatch();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        brand: '',
        price: '',
        discount: { percentage: 0, validTill: '' },
        stock: { available: 0, reserved: 0 },
        shipping: {  deliveryOptions: [] },
        images: [] // Changed to array for multiple files
    });

    useEffect(() => {
        // Initialization logic if needed
    }, []);

    const handleImage = (event) => {
        const uploadedImages = Array.from(event.target.files); // Convert FileList to array
        setProduct((prev) => ({
            ...prev,
            images: uploadedImages // Store all selected files
        }));
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
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
            setProduct((prev) => ({ ...prev, [name]: value }));
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
                    : prev.shipping.deliveryOptions.filter((option) => option !== value)
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
        // formData.append("shipping[weight]", product.shipping.weight || '');
        product.shipping.deliveryOptions.forEach((option) =>
            formData.append("shipping[deliveryOptions][]", option)
        );
        // Append multiple images
        product.images.forEach((image, index) => {
            formData.append("images", image); // Backend should handle array of images
        });

        console.log('FormData:', [...formData.entries()]);
        dispatch(AddProducts(formData)); // Pass FormData to Redux action
        
    };

    return (
        <HomeLayout>
            <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Add New Product</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-group">
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand" className="block text-lg font-medium text-gray-700 mb-2">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={product.brand}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price" className="block text-lg font-medium text-gray-700 mb-2">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            step="0.01"
                            required
                        />
                    </div>

                    {/* Discount */}
                    <div className="form-group">
                        <label htmlFor="discount.percentage" className="block text-lg font-medium text-gray-700 mb-2">Discount Percentage</label>
                        <input
                            type="number"
                            id="discount.percentage"
                            name="discount.percentage"
                            value={product.discount.percentage}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            step="0.1"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="discount.validTill" className="block text-lg font-medium text-gray-700 mb-2">Discount Valid Till</label>
                        <input
                            type="date"
                            id="discount.validTill"
                            name="discount.validTill"
                            value={product.discount.validTill}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Stock */}
                    <div className="form-group">
                        <label htmlFor="stock.available" className="block text-lg font-medium text-gray-700 mb-2">Stock Available</label>
                        <input
                            type="number"
                            id="stock.available"
                            name="stock.available"
                            value={product.stock.available}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            step="1"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock.reserved" className="block text-lg font-medium text-gray-700 mb-2">Stock Reserved</label>
                        <input
                            type="number"
                            id="stock.reserved"
                            name="stock.reserved"
                            value={product.stock.reserved}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            step="1"
                        />
                    </div>

                    
                    <div className="form-group">
                        <label className="block text-lg font-medium text-gray-700 mb-2">Delivery Options</label>
                        {["Standard", "Express", "Same-day", "Overnight"].map((option) => (
                            <div key={option} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={option}
                                    value={option}
                                    checked={product.shipping.deliveryOptions.includes(option)}
                                    onChange={handleDeliveryOptions}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor={option} className="ml-2 text-gray-700">{option}</label>
                            </div>
                        ))}
                    </div>

                    {/* Multiple Image Upload */}
                    <div className="form-group">
                        <label htmlFor="images" className="block text-lg font-medium text-gray-700 mb-2">Product Images</label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            multiple // Enable multiple file selection
                            onChange={handleImage}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700"
                        />
                        {/* Optional: Display selected file names */}
                        {product.images.length > 0 && (
                            <ul className="mt-2 text-sm text-gray-600">
                                {product.images.map((image, index) => (
                                    <li key={index}>{image.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default AddProduct;