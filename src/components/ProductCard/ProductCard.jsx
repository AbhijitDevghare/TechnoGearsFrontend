// src/components/ProductCard.jsx
import { useState } from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';
import './ProductCard.css';
import { Link } from 'react-router-dom';
import AddToCart from '../cart/AddToCart';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const discountedPrice =
    product.discount.percentage > 0
      ? product.price * (1 - product.discount.percentage / 100)
      : product.price;

  return (
    <div className="product-card p-8">
      {/* Product Image */}
      <div className="product-image-container relative">
        <Link to={`/product/${product.name}`} state={product}>
          <img
            src={product.images[0]?.url || 'placeholder.jpg'}
            alt={product.name}
            className="product-image cursor-pointer"
          />
        </Link>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''} absolute top-2 right-2 z-10`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <FaHeart />
        </button>
      </div>

      {/* Product Details */}
      <div className="product-details">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-name">{product.name}</h3>

        {/* Pricing */}
        <div className="pricing">
          <span className="current-price">₹ {discountedPrice.toFixed(2)}</span>
          {product.discount.percentage > 0 && (
            <>
              <span className="original-price">₹ {product.price.toFixed(2)}</span>
              <span className="discount-badge">-{product.discount.percentage}%</span>
            </>
          )}
        </div>

        {/* Ratings */}
        <div className="ratings">
          <span className="stars">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < Math.round(product.ratings.average) ? 'filled' : ''}
              />
            ))}
          </span>
          <span>({product.ratings.reviewsCount} reviews)</span>
        </div>

        {/* Stock Info */}
        <div className="stock-info">
          {product.stock.available > 0 ? (
            <span className="in-stock">In Stock: {product.stock.available}</span>
          ) : (
            <span className="out-stock">Out of Stock</span>
          )}
        </div>

        {/* Actions */}
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
