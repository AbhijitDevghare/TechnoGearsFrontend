import AddToCart from "../../addtocart/AddToCart"
import "./NewArrival.css"

function NewArrivals({product})
{


    return (
        <>  
            <div className="newarrivalcard">
                <div className="newarrivalcardHeart">
                    <i className="fa-solid fa-heart"></i>
                </div>
               <div className="newarrivalcardImageWrapper">
                 <img src={product.images[0].url} alt=""
                className=""
                />

               </div>
               <div className="newarrivalcardProductInfo">
                        <div>   
                            {product.name}
                    </div>
                    <div>
                        <i className="fa-solid fa-star text-amber-300"></i>&nbsp;{product.ratings.average}
                    </div>
                    <div className="flex items-center justify-between font-bold ">
                        Rs.{product.price}
                        <div className="bg-blue-500 rounded-4xl w-[30px] h-[30px] flex justify-center items-center cursor-pointer">
                            <AddToCart product={product}/>
                        </div>
                    </div>
               </div>
            </div>

        </>
    )
}

export default NewArrivals