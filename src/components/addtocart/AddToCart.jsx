import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addCart } from "../../redux/slices/CartSlice";

function AddToCart({ product }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const isAddedFromStore = cart?.items?.some(
    (item) => item?.product?._id === product?._id
  );

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (isAddedFromStore) {
      setDisabled(true);
    }
  }, [isAddedFromStore]);

  const handleAddToCart = () => {
    console.log(product)
    if (!product?._id || disabled) return;
    setDisabled(true); // instantly disable
    dispatch(addCart({ productId: product._id, quantity: 1 }));
  };

  const isOutOfStock = !product?.stock?.available;
  const isButtonDisabled = disabled || isOutOfStock;

  return (
    <div>
      {/* {console.log(product)} */}
      <button
        className={`add-to-cart ${
          isButtonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-green-600"
        }`}
        onClick={handleAddToCart}
        disabled={isButtonDisabled}
      >
        <i className="fa-solid fa-plus text-white"></i>
      </button>
    </div>
  );
}

export default AddToCart;
