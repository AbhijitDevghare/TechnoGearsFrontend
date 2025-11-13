import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../redux/slices/CartSlice';

function AddToCart({ product }) {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart);

  const isAdded = cart?.items?.some(item => item.product._id === product._id);

  const handleAddToCart = () => {
    dispatch(addCart({ productId: product._id, quantity: 1 }));
  };

  return (
    <div className="actions">
      {!isAdded ? (
        <button
          className="add-to-cart"
          onClick={handleAddToCart}
          disabled={product.stock.available === 0}
        >
          <FaShoppingCart className="w-7" /> Add to Cart
        </button>
      ) : (
        <button className="add-to-cart" disabled>
          <FaShoppingCart className="w-7" /> Added
        </button>
      )}
    </div>
  );
}

export default AddToCart;
