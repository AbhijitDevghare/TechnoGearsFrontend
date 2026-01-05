import { Link } from "react-router-dom"
import MenuBar from "./MenuBar"
import Search from "./Search"

function Header({
  leftType = "menu",
  onBack,
  title = "ElectroStore",
  showSearch = true,
  onSearch,
  showCart=true
}) {
  return (
    <div className="w-full fixed top-0 pt-10 flex flex-col items-center gap-6 z-40 bg-[#01162b]">
      
      <div className="w-full flex items-center justify-center px-6 relative">

        {/* LEFT */}
        <div className="absolute left-6 top-6">
          {leftType === "menu" && <MenuBar />}

          {leftType === "back" && (
            <i
              className="fa-solid fa-angle-left text-2xl text-white cursor-pointer"
              onClick={onBack}
            />
          )}
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-white relative top-4">
          {title}
        </h1>

        {/* RIGHT */}
        {showCart && <div className="absolute right-10 top-6">
          <Link to={"/cart"}>
               <i className="fa-solid fa-cart-shopping text-xl text-white cursor-pointer" />
          </Link>
        </div>}
      </div>

      {showSearch && <Search updateSearch={onSearch} />}
    </div>
  )
}

export default Header
