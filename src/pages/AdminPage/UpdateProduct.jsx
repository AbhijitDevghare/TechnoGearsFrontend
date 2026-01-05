import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProductDetails } from "../../redux/slices/ProductsSlice";
import toast from "react-hot-toast";
import "./UpdateProduct.css";
import Header from "../../components/header/Header";


function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

      const handleBack = () => window.history.back()


  const initialProductState = location.state || {
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    discount: { percentage: 0, validTill: "" },
    stock: { available: 0, reserved: 0 },
    shipping: { deliveryOptions: [] },
    images: []
  };

  const [product, setProduct] = useState(initialProductState);

  const handleImage = (e) => {
    setProduct((prev) => ({
      ...prev,
      images: Array.from(e.target.files)
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProduct((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
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
          : prev.shipping.deliveryOptions.filter((o) => o !== value)
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

    product.shipping.deliveryOptions.forEach((o) =>
      formData.append("shipping[deliveryOptions][]", o)
    );

    product.images.forEach((img) => formData.append("images", img));

    try {
      await dispatch(
        updateProductDetails({ formData, productId: product._id })
      );
      toast.success("Product updated successfully");
      navigate("/");
    } catch {
      toast.error("Error updating product");
    }
  };

  return (

      <>
              <Header showCart={false} showSearch={false} leftType="back"  onBack={handleBack}/>

    

    <div className="update-product-container">
      <h1 className="update-title">Update Product</h1>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={product.name} onChange={handleChange} />

        <label>Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
        />

        <label>Category</label>
        <input name="category" value={product.category} onChange={handleChange} />

        <label>Brand</label>
        <input name="brand" value={product.brand} onChange={handleChange} />

        <label>Price</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} />

        <div className="two-col">
          <div>
            <label>Discount %</label>
            <input
              type="number"
              name="discount.percentage"
              value={product.discount.percentage}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Valid Till</label>
            <input
              type="date"
              name="discount.validTill"
              value={product.discount.validTill}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="two-col">
          <div>
            <label>Available Stock</label>
            <input
              type="number"
              name="stock.available"
              value={product.stock.available}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Reserved Stock</label>
            <input
              type="number"
              name="stock.reserved"
              value={product.stock.reserved}
              onChange={handleChange}
            />
          </div>
        </div>

        <label>Delivery Options</label>
        <div className="checkbox-group">
          {["Home Delivery", "Pickup", "Courier"].map((o) => (
            <label key={o}>
              <input
                type="checkbox"
                value={o}
                checked={product.shipping.deliveryOptions.includes(o)}
                onChange={handleDeliveryOptions}
              />
              {o}
            </label>
          ))}
        </div>

        <label>Product Images</label>
        <input type="file" multiple onChange={handleImage} />

        <button type="submit">Update Product</button>
      </form>
    </div>
    </>
  );
}

export default UpdateProduct;
