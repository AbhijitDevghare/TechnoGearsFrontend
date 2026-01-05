import { Link } from "react-router-dom";
import { AddProducts } from "../../../redux/slices/ProductsSlice";
import AddToCart from "../../addtocart/AddToCart";
import "./PopularCard.css";

function PopularCard({ product }) {
  return (
    <div className="popular-card">
      <div className="popular-card-image">
        <Link to={`/product/${product.name}`} state={product}>
                    <img src={product.images[0].url} alt=""
                    className=""
                    />
                 </Link> 

                 
      </div>
        
      <div className="popular-card-info">
        <h3 className="popular-card-title">{product?.name}</h3>
        <p className="popular-card-price">₹ {product?.price}</p>
 
      </div>
      <div className="bg-blue-500 rounded-4xl w-[30px] h-[30px] flex justify-center items-center cursor-pointer">
                            <AddToCart product={product}/>
    </div>

    
    </div>
  );
}

export default PopularCard;
