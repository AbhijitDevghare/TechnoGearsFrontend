import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../../redux/slices/AuthSlice"

function MenuBar() {
  const [isMenuOptionOpen, setMenuOptionOpen] = useState(false)

  const toggleMenu = () => setMenuOptionOpen(prev => !prev)

  const {isLoggedIn,role} = useSelector((state)=>state.auth)

  const dispatch = useDispatch()
  const handleLogout =()=>{
    dispatch(logout());
    
  }
  return (
    <>
      {/* Overlay */}
      {isMenuOptionOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-[#02305a] w-[250px] h-screen fixed top-0 left-0 z-50 
        transition-transform duration-300 ease-in-out
        ${isMenuOptionOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-[100px] flex justify-center relative top-10">
          <i
            className="fa-solid fa-xmark text-white cursor-pointer text-xl p-3"
            onClick={toggleMenu}
          ></i>
        </div>

        <nav className="flex flex-col text-white items-center gap-5">
          <Link to="/" onClick={toggleMenu} className="px-6 py-2 rounded-md hover:bg-white/10 transition">
            Home
          </Link>
          <Link to="/products/newArrival" onClick={toggleMenu} className="px-6 py-2 rounded-md hover:bg-white/10 transition">
            Products
          </Link>
          <Link to="/profile" onClick={toggleMenu} className="px-6 py-2 rounded-md hover:bg-white/10 transition">
            Profile
          </Link>
          <Link to="/cart" onClick={toggleMenu} className="px-6 py-2 rounded-md hover:bg-white/10 transition">
            Cart
          </Link>
          <Link to="/orders" onClick={toggleMenu} className="px-6 py-2 rounded-md hover:bg-white/10 transition">
            Orders
          </Link>
          <Link to="/about" onClick={toggleMenu} className="px-6 py-2 rounded-md hover:bg-white/10 transition">
            About
          </Link>
          <Link to="/contact" onClick={toggleMenu} className="px-6 py-2 rounded-md hover:bg-white/10 transition">
            Contact
          </Link>

                   {isLoggedIn && (role === "superadmin" || role==="admin") && (
                        <Link
                          to="/admin"
                          onClick={toggleMenu}
                          className="px-6 py-2 rounded-md hover:bg-white/10 transition"
                        >
                          Admin Options
                        </Link>
                      )}

          {
            isLoggedIn ? (<>
            <p  onClick={()=>handleLogout()} className="px-6 py-2 rounded-md hover:bg-white/10 transition">
            Logout
          </p>
            </>):
            <>
            <Link to="/auth/login" onClick={toggleMenu} className="px-6 py-2 rounded-md hover:bg-white/10 transition">
            Login/Signup
          </Link>
            </>
          }
        </nav>
      </div>

      {/* Menu Button (only when closed) */}
      {!isMenuOptionOpen && (
        <div className="fixed top-6 left-6 z-50">
          <i
            className="fa-solid fa-bars text-white cursor-pointer text-2xl"
            onClick={toggleMenu}
          ></i>
        </div>
      )}
    </>
  )
}

export default MenuBar
