import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeInCartItem } from "../../redux/slices/CartSlice";

const CartItem = ({ item, onRemove }) => {
  const dispatch = useDispatch();
  if (!item || !item.product) return null;

  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [total, setTotal] = useState(0);
  const [isDirty, setIsDirty] = useState(false);

  const discountedPrice =
    item.product.discount?.percentage > 0
      ? item.product.price *
        (1 - item.product.discount.percentage / 100)
      : item.product.price;

  useEffect(() => {
    setTotal(discountedPrice * quantity);
  }, [quantity, discountedPrice]);

  const handleQuantityChange = (val) => {
    if (val >= 1 && val <= item.product.stock?.available) {
      setQuantity(val);
      setIsDirty(true);
    }
  };

  const handleUpdate = () => {
    dispatch(
      changeInCartItem({
        productId: item.product._id,
        newQty: quantity,
      })
    );
    setIsDirty(false);
  };

  return (
    <div className="border border-[#0b2b52] rounded-2xl p-5 mb-5 shadow-xl">
      <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">

        {/* Product Info */}
        <div className="flex gap-5">
          <img
            src={item.product.images?.[0]?.url || "/placeholder.jpg"}
            alt={item.product.name}
            className="w-28 h-28 object-cover rounded-xl border border-[#123a6f]"
          />

          <div className="flex flex-col justify-between">
            <Link
              to={`/product/${item.product._id}`}
              className="text-lg font-semibold text-white hover:text-[#4da3ff]"
            >
              {item.product.name}
            </Link>

            <p className="text-sm text-gray-300">
              Total:{" "}
              <span className="font-semibold text-white">
                ₹{total.toFixed(2)}
              </span>
            </p>

            {item.product.stock?.available > 0 ? (
              <span className="text-xs text-green-400">
                In stock ({item.product.stock.available})
              </span>
            ) : (
              <span className="text-xs text-red-400">
                Out of stock
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-4">
          <div className="flex items-center border border-[#123a6f] rounded-xl overflow-hidden">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="px-4 py-1 bg-[#022448] text-white hover:bg-[#033160] disabled:opacity-50"
            >
              −
            </button>

            <input
              type="number"
              value={quantity}
              min="1"
              max={item.product.stock?.available}
              onChange={(e) =>
                handleQuantityChange(Number(e.target.value))
              }
              className="w-14 text-center bg-[#01162b] text-white border-x border-[#123a6f] outline-none"
            />

            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={
                quantity >= (item.product.stock?.available || 0)
              }
              className="px-4 py-1 bg-[#022448] text-white hover:bg-[#033160] disabled:opacity-50"
            >
              +
            </button>
          </div>

          <div className="flex gap-4">
            {isDirty && (
              <button
                onClick={handleUpdate}
                className="px-4 py-1 text-sm rounded-lg bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
              >
                Update
              </button>
            )}

            <button
              onClick={() => onRemove(item.product._id)}
              className="text-sm text-red-400 hover:text-red-500"
            >
              Remove
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartItem;
