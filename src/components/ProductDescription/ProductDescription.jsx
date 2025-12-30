  import { useLocation, useNavigate } from "react-router-dom";
  import { useState } from "react";
  import HomeLayout from "../../layout/HomeLayout";
  import Slider from "react-slick";
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
  import AddToCart from "../cart/AddToCart";
  import { useDispatch, useSelector } from "react-redux";
  import { Link } from 'react-router-dom';
  import axiosInstance from "../../helpers/axiosInstance";
  import toast from "react-hot-toast";
  import { addCart } from '../../redux/slices/CartSlice';


  const ProductDescription = () => {
    const location = useLocation();
    const product = location.state;

    const dispatch = useDispatch()

    const navigate = useNavigate()
    let role = useSelector((state)=>state?.auth?.role)

    // State to track the product quantity
    const [quantity, setQuantity] = useState(1);
    

    // Slider settings for image carousel
  const settings = {
    dots: product.images.length > 1,  // Show dots only if more than one image
    infinite: product.images.length > 1,  // Enable infinite scrolling only if more than one image
    speed: 500,                
    slidesToShow: 1,           
    slidesToScroll: 1,         
    arrows: product.images.length > 1,  // Show arrows only if more than one image
  };

    // Calculate the discounted price if a discount exists
    const discountedPrice = product.discount.percentage > 0 
      ? product.price * (1 - product.discount.percentage / 100)
      : product.price;

    // Calculate the total price based on the quantity
    const totalPrice = discountedPrice * quantity;

    // Increment quantity
    const incrementQuantity = () => {
      if (quantity < product.stock.available) {
        setQuantity(quantity + 1);
      }
    };

    // Decrement quantity
    const decrementQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

    const handleProductDelete = async()=>{
      const response = await axiosInstance.delete(`/product/delete/${product._id}`)
      toast.success("Product deleted successfully")
      if(response.status==200)
        navigate("/")
    }

    const handleBuyNow  = ()=>{
        dispatch(addCart({ productId: product._id, quantity: 1 }));
        setTimeout(() => {
          console.log("BUY NOW")
        }, 1000);
        navigate("/cart");        // Redirect to cart page
    }
    return (
      <HomeLayout>
        <br /><br />
        {/* Main container for the product description */}
        <div className="flex flex-wrap gap-8 justify-center items-center mx-auto p-8 bg-white rounded-lg shadow-lg transform transition-transform duration-300  max-w-7xl">
          
          {/* Image Slider Section */}
          {/* <div className="max-w-[400px] mx-auto relative"> */}
            {/* Slider for product images */}
            {/* <Slider {...settings}>
              {product.images.map((image, index) => (
                <div key={index} className="slide">
                  
                  <img 
                    src={image.url} 
                    alt={`${product.name} ${index + 1}`} 
                    className="w-full h-auto rounded-md object-cover transform transition-transform duration-300 hover:scale-105" 
                    loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          </div> */}

          <div className="max-w-[400px] mx-auto flex gap-2 flex-wrap">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                className="w-[50%] object-contain rounded"
              />
            ))}
          </div>


          {/* Product Details Section */}
          <div className="flex-1 max-w-lg px-4 sm:px-8">
            {/* Product Name */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">{product.name}</h1>
            {/* Product Category and Brand */}
            <p className="text-gray-600 text-base mb-4">{product.category} | <strong>{product.brand}</strong></p>

            {/* Price and Discount */}
            <div className="flex items-center gap-4">
              {/* Display discounted price */}
              <h2 className="text-3xl text-pink-500 font-bold">₹ {totalPrice.toFixed(2)}</h2>
              {/* Show original price if discount is available */}
              {product.discount.percentage > 0 && (
                <span className="text-sm text-gray-500 line-through">₹ {product.price.toFixed(2)}</span>
              )}
              {/* Display discount percentage */}
              {product.discount && (
                <span className="bg-yellow-500 text-white py-1 px-3 rounded-md text-sm font-semibold">-{product.discount.percentage}% OFF</span>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 mt-4">
              <button 
                onClick={decrementQuantity} 
                className="py-2 px-4 bg-gray-300 rounded-md text-lg hover:bg-gray-400 transition duration-300"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button 
                onClick={incrementQuantity} 
                className="py-2 px-4 bg-gray-300 rounded-md text-lg hover:bg-gray-400 transition duration-300"
              >
                +
              </button>
            </div>

            {/* Stock Availability */}
            <div
              className={`text-lg font-semibold py-2 px-4 rounded-md w-fit mt-4 ${product.stock.available > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            >
              {product.stock.available > 0 ? (
                <span>✅ In Stock ({product.stock.available} units available)</span>
              ) : (
                <span>❌ Out of Stock</span>
              )}
            </div>

            {/* Shipping Options */}
            <p className="text-sm text-gray-500 mt-4">
              <strong>Shipping Options:</strong> {product.shipping.deliveryOptions.join(", ")}
            </p>

            {/* Discount Expiry Date */}
            {product.discount?.validTill && (
              <p className="text-sm text-gray-500 mt-2">
                <strong>Discount Valid Till:</strong>{" "}
                {new Date(product.discount.validTill).toLocaleDateString()}
              </p>
            )}

            {/* Product Description */}
            <h3 className="text-lg font-semibold mt-6">Description</h3>
            <p className="text-base text-gray-600 bg-gray-100 p-4 rounded-md">{product.description}</p>

            {/* Ratings Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Ratings & Reviews</h3>
              {/* Display average rating and number of reviews */}
              <p className="text-xl font-bold text-yellow-500">⭐ {product.ratings.average} / 5 ({product.ratings.reviewsCount} reviews)</p>
              {/* Map through reviews if available */}
              {product.ratings.reviews.length > 0 ? (
                product.ratings.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md mt-3 border-l-4 border-yellow-500">
                    <div className="flex justify-between font-bold text-sm">
                      {/* Display reviewer name */}
                      <span>{review.user}</span>
                      {/* Display rating stars */}
                      <span>
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </div>
                    {/* Display review comment */}
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              {/* Add to Cart Button */}
              {/* <button className="py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Add To Cart</button> */}
              {/* Buy Now Button */}
              <AddToCart product={product}/>

              <button
        onClick={()=>{handleBuyNow()}}
        className="py-2 px-4 text-white bg-green-500 rounded-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
      >
        Buy Now
      </button>
              {
                role && role=="superadmin" && <>
              <Link to={`/product/updateProduct`} state={product}>
                <button className="btn btn-secondary">Update Details</button>
                </Link>

                <button className="btn  btn-error" onClick={handleProductDelete}>Delete Product</button>

                </>
              }
            </div>
          </div>
        </div>
      </HomeLayout>
    );
  };

  export default ProductDescription;
