import { useEffect, useState } from "react";
import Search from "../components/search/Search";
import MenuDropDown from "../components/menuDropDown/MenuDropDown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/AuthSlice";
import Footer from "../components/footer/Footer"
import Products from "../pages/ProductsPage/Products";

function HomeLayout({children}) {
  const [searchOpen, setSearchOpen] = useState(false);

  const user = useSelector((state) => state?.auth?.data);
  
  const [profile,setProfile]=useState(user?.avatar?.url || "")

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // for setting up the search input 
  const [searchInput,setSearchInput]=useState("")


  const navigate = useNavigate()

  const dispatch = useDispatch()
  const handleLoggedOut = async ()=>{
       const response = await dispatch(logout())
      if(response?.payload?.success)
      {
        setIsLoggedIn(false);
        navigate("/auth/login"); 
      }
     }

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
        <>
 <div className="navbar bg-base-100 px-4 flex justify-between items-center fixed z-50">
      
      {/* Left Section (Menu & Brand) */}
      <div className="flex items-center">
        
        {/* Dropdown Menu */}

        <MenuDropDown/>
        {/* Brand Name */}
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
        TechnoGears
        </Link>
      </div>

      {/* Center Section (Search Bar) */}
            <Search updateSearch={setSearchInput}/>  

      {/* Right Section (Search Icon for Mobile, Cart & Profile) */}
      <div className="flex items-center gap-4 sm:gap-0">
        
        {/* Search Icon (Only on Mobile) */}
        <button
          className="btn btn-ghost sm:hidden"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
            />
          </svg>
        </button>

        {/* Search Bar Dropdown for Mobile */}
        {searchOpen && (
          <div className="absolute top-16 left-0 w-full px-4">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full"
            />
          </div>
        )}

        {/* Cart Icon */}
        <div className="dropdown dropdown-end">
            <Link to={"/cart"}>
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </label>
            </Link>
        </div>


        {/* Profile Icon */}
        <div className="dropdown dropdown-end hidden sm:block">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={profile} alt="Profile" />
            </div>
          </label>


          
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      {
                        isLoggedIn ? (
                        <Link to="/profile" className="justify-between">
                                        Profile
                        </Link>
                        )
                        : " "
                      }
                        
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                    <li>
                      {isLoggedIn ? (
                        <button onClick={handleLoggedOut}>
                          Logout
                        </button>
                      ) : (
                        <Link to="/auth/login">Login</Link>
                      )}
                    </li>

                </ul>

        </div>

      </div>


    </div>
    <br /> <br />




{
searchInput ? 
    <Products regex={searchInput} flexWrap={true}/> :
 children
 }


<Footer/>


        </>

  );
}

export default HomeLayout;
