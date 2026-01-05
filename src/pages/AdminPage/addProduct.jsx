import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddProducts } from "../../redux/slices/ProductsSlice";
import Header from "../../components/header/Header";
import "./AddProduct.css";

function AddProduct() {
  const dispatch = useDispatch();

    const handleBack = () => window.history.back()


  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    discount: { percentage: 0, validTill: "" },
    stock: { available: 0, reserved: 0 },
    shipping: { deliveryOptions: [] },
    images: []
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(product).forEach(([key, val]) => {
      if (key !== "images" && key !== "shipping" && key !== "discount" && key !== "stock") {
        formData.append(key, val);
      }
    });

    formData.append("discount[percentage]", product.discount.percentage);
    formData.append("discount[validTill]", product.discount.validTill);
    formData.append("stock[available]", product.stock.available);
    formData.append("stock[reserved]", product.stock.reserved);

    product.shipping.deliveryOptions.forEach((o) =>
      formData.append("shipping[deliveryOptions][]", o)
    );

    product.images.forEach((img) => formData.append("images", img));

    dispatch(AddProducts(formData));
  };

  return (
    <>
        <Header showCart={false} showSearch={false} leftType="back"  onBack={handleBack}/>

      <div className="add-product-container">
        <h1>Add New Product</h1>

        <form onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input name="name" value={product.name} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />

          <label>Category</label>
          <input name="category" value={product.category} onChange={handleChange} required />

          <label>Brand</label>
          <input name="brand" value={product.brand} onChange={handleChange} required />

          <label>Price</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />

          <label>Discount %</label>
          <input type="number" name="discount.percentage" value={product.discount.percentage} onChange={handleChange} />

          <label>Discount Valid Till</label>
          <input type="date" name="discount.validTill" value={product.discount.validTill} onChange={handleChange} />

          <label>Stock Available</label>
          <input type="number" name="stock.available" value={product.stock.available} onChange={handleChange} required />

          <label>Stock Reserved</label>
          <input type="number" name="stock.reserved" value={product.stock.reserved} onChange={handleChange} />

          <label>Delivery Options</label>
          <div className="checkbox-group">
            {["Standard", "Express", "Same-day", "Overnight"].map((o) => (
              <label key={o}>
                <input type="checkbox" value={o} onChange={handleDeliveryOptions} />
                {o}
              </label>
            ))}
          </div>

          <label>Product Images</label>
          <input type="file" multiple onChange={handleImage} />

          <button type="submit">Add Product</button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
