import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getCart, removeCart } from "../../redux/slices/CartSlice"
import Header from "../../components/header/Header"
import CartItem from "../../components/cart/CartItem"
import "./CartPage.css"

const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const handleBack = () => window.history.back()


  const cart = useSelector((state) => state.cart?.cart)

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  const handleRemoveFromCart = async (productId) => {
    await dispatch(removeCart(productId))
    dispatch(getCart())
  }

  const subtotal =
  cart?.items?.reduce(
    (sum, item) => {
      const price =
        item.product.discount?.percentage > 0
          ? item.product.price *
            (1 - item.product.discount.percentage / 100)
          : item.product.price;

      return sum + price * item.quantity;
    },
    0
  ) || 0;


  const total = subtotal 


  return (
    <>
      <Header leftType="back" title="My Cart" showSearch={false}         onBack={handleBack}/>

      {/* Page Content */}
      <div className="cartpagemaindiv">
        <p className="text-center text-gray-400 mb-8">
          {cart?.items?.length || 0} Items
        </p>

        {!cart?.items || cart.items.length === 0 ? (
          <p className="text-center text-gray-400">
            Your cart is empty
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-6">
              {cart.items.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onRemove={handleRemoveFromCart}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-10 rounded-2xl p-6">
              <div className="flex justify-between text-gray-300 mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-300 mb-2">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>

             
              <div className="border-t border-gray-600 my-4" />

              <div className="flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span className="text-blue-400">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sticky Checkout Bar */}
      {cart?.items?.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full  border-t border-gray-700 px-6 py-4 flex justify-between items-center z-50">
          <div>
            <p className="text-gray-400 text-sm">Total</p>
            <p className="text-xl font-semibold">
              ${total.toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="bg-blue-600 px-10 py-3 rounded-xl text-white font-semibold hover:bg-blue-700"
          >
            Checkout →
          </button>
        </div>
      )}
    </>
  )
}

export default CartPage
