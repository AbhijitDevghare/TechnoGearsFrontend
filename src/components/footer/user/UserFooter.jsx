import { Link } from "react-router-dom"

function Footer()
{
    return(
    <>
        <div className="fixed bottom-0 w-screen h-[75px] bg-[#01162b] flex flex-row justify-evenly items-center border-t-[#042a4e] border-1">
            
            <Link to={"/"}>
            <div className="flex flex-col justify-evenly items-center gap-1 cursor-pointer font hover:text-bl">
                
                <i className="fa-regular fa-house"></i>Home
            </div>
            </Link>
            
            <div className="flex flex-col justify-evenly items-center gap-1 cursor-pointer font hover:text-bl">                
                <i className="fa-solid fa-star"></i>Saved
            </div>
            <Link to={"/cart"}>
            <div className="flex flex-col justify-evenly items-center gap-1 cursor-pointer font hover:text-bl">                
                <i className="fa-solid fa-basket-shopping"></i>
                Cart
            </div>
            </Link>

            <Link to={"/profile"}>
            <div className="flex flex-col justify-evenly items-center gap-1 cursor-pointer font hover:text-bl">                
                <i className="fa-solid fa-user"></i>Profile
            </div>
            </Link>

            
        </div> 
    </>)
}

export default Footer