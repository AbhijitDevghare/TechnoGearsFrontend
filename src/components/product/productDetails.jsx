import "./productDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../redux/slices/CartSlice";
import toast from "react-hot-toast";
import Header from "../header/Header";

export default function ProductDetails() {
        const handleBack = () => window.history.back()

  const { state: product } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector(state => state?.auth?.role);

  const [quantity, setQuantity] = useState(1);

  const hasDiscount = product.discount?.percentage > 0;

  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discount.percentage / 100)
    : product.price;

  const totalPrice = (discountedPrice * quantity).toFixed(2);

  const inc = () => {
    if (quantity < product.stock.available) {
      setQuantity(q => q + 1);
    }
  };

  const dec = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addCart({ productId: product._id, quantity }));
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    dispatch(addCart({ productId: product._id, quantity }));
    navigate("/cart");
  };

  return (
    <>
    
    <Header showCart={false} showSearch={false} leftType="back"  onBack={handleBack} title=""/>

    <div className="pd-page">
      {/* Image */}
      <div className="pd-image">
        <img src={product.images[0].url} alt={product.name} />
      </div>

      {/* Content */}
      <div className="pd-content">
        <span className="pd-category">{product.category}</span>

        <h1 className="pd-title">{product.name}</h1>

        <div className="pd-rating">
          ⭐ {product.ratings.average || "0.0"}
          <span> ({product.ratings.reviewsCount})</span>
        </div>

        {/* Price */}
        <div className="pd-price">
          ₹{totalPrice}
          {hasDiscount && (
            <>
              <span className="pd-old">₹{product.price}</span>
              <span className="pd-save">
                Save {product.discount.percentage}%
              </span>
            </>
          )}
        </div>

        {/* Quantity */}
        <div className="pd-qty">
          <button onClick={dec}>−</button>
          <span>{quantity}</span>
          <button onClick={inc}>+</button>
        </div>

        {/* Stock */}
        <div className="pd-stock">
          {product.stock.available > 0
            ? `In Stock (${product.stock.available})`
            : "Out of Stock"}
        </div>

        {/* Shipping */}
        <div className="pd-ship">
          Shipping: {product.shipping.deliveryOptions.join(", ")}
        </div>

        {/* Discount validity */}
        {product.discount?.validTill && (
          <div className="pd-expiry">
            Offer till{" "}
            {new Date(product.discount.validTill).toLocaleDateString()}
          </div>
        )}

        {/* Description */}
        <h3>Description</h3>
        <p className="pd-desc">{product.description}</p>

        {/* Specs */}
        <div className="pd-specs">
          <div className="pd-spec">📦 Stock<br />{product.stock.available}</div>
          <div className="pd-spec">🚚 Shipping<br />Standard</div>
          <div className="pd-spec">🏷 Brand<br />{product.brand}</div>
          <div className="pd-spec">📱 Category<br />Smartphone</div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pd-bottom">
        <div className="pd-total">
          Total<br />
          <strong>₹{totalPrice}</strong>
        </div>

        <button className="pd-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <button className="pd-btn buy" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
    </>
  );
}
