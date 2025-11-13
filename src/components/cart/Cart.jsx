import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeInCartItem } from "../../redux/slices/CartSlice";

const CartItem = ({ item, onRemove }) => {
  const dispatch = useDispatch();

  if (!item || !item.product) {
    console.warn("Invalid cart item:", item);
    return null;
  }

  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [total, setTotal] = useState(0);
  const [isDirty, setIsDirty] = useState(false);

  const calculateDiscountedPrice = () => {
    return item.product.discount?.percentage > 0
      ? item.product.price * (1 - item.product.discount.percentage / 100)
      : item.product.price;
  };

  const handleQuantityChange = (newQty) => {
    if (newQty >= 1 && newQty <= item?.product?.stock?.available) {
      setQuantity(newQty);
      setIsDirty(true);
    }
  };

  const handleUpdateClick = () => {
    dispatch(changeInCartItem({ productId: item.product._id, newQty: quantity }));
    setIsDirty(false);
  };

  useEffect(() => {
    const discountedPrice = calculateDiscountedPrice();
    setTotal(discountedPrice * quantity);
  }, [quantity, item]);

  return (
    <div className="flex justify-between items-center border-b pb-4 flex-wrap gap-5">
      <div className="flex items-center">
        <img
          src={item?.product?.images?.[0]?.url || "/placeholder.jpg"}
          alt={item?.product?.name || "Product"}
          className="h-24 w-24 rounded-md object-cover border border-gray-300"
        />

        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">
            <Link to={`/product/${item.product._id}`}>{item?.product?.name}</Link>
          </h3>
          <p className="text-gray-600">Total: ₹ {total.toFixed(2)}</p>
          <div className="stock-info mt-1">
            {item?.product?.stock?.available > 0 ? (
              <span className="text-green-600">In Stock: {item.product?.stock?.available}</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="quantity-selector flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="bg-gray-200 px-2 rounded"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            max={item?.product?.stock?.available}
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val)) handleQuantityChange(val);
            }}
            className="w-16 border border-gray-300 rounded-lg py-1 px-2 text-center"
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= (item?.product?.stock?.available || 0)}
            className="bg-gray-200 px-2 rounded"
          >
            +
          </button>
        </div>

        {isDirty && (
          <button
            onClick={handleUpdateClick}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Update
          </button>
        )}

        <button
          onClick={() => onRemove(item.product._id)}
          className="text-red-600 hover:text-red-800"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
