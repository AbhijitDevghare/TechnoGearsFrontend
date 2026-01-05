import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { searchProducts } from "../../redux/slices/ProductsSlice"

import Header from "../../components/header/Header.jsx"
import HeroCarousel from "../../components/carousel/HeroCarousel.jsx"
import CategoriesCarousel from "../../components/carousel/CategoriesCarousel.jsx"
import NewArrivalsCarousel from "../../components/carousel/NewArrivalCarousel.jsx"
import TrendingCard from "../../components/cards/trending/TrendingCard.jsx"
import PopularCardList from "../../components/cards/popular/PopularCardList.jsx"
import NewArrivals from "../../components/cards/newarrival/NewArrival.jsx"
import Footer from "../../components/footer/user/UserFooter.jsx"

function HomePage() {
  const dispatch = useDispatch()

  const [searchInput, setSearchInput] = useState("")
  const [searchedProducts, setSearchedProducts] = useState([])

  useEffect(() => {
    if (!searchInput) {
      setSearchedProducts([])
      return
    }

    const fetchSearchResults = async () => {
      const res = await dispatch(
        searchProducts({
          regex: searchInput,
          page: 1,
          limit: 10,
          sortBy: "createdAt",
          sortOrder: "desc",
        })
      )

      setSearchedProducts(res?.payload || [])
    }

    fetchSearchResults()
  }, [searchInput, dispatch])

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Header onSearch={setSearchInput} />

      {searchInput ? (
        <div className="wrapperproductspage">
          {searchedProducts.length === 0 ? (
            <div className="w-[100vw] flex justify-center items-center h-[200px] text-gray-500 text-lg">
              No products found
            </div>
          ) : (
            <div className="w-[100vw] flex items-center justify-center flex-wrap gap-5 mb-16 px-4">
              {searchedProducts.map((product) => (
                <NewArrivals key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="herocarousel">
            <HeroCarousel />
          </div>

          <div className="w-full relative mt-6">
            <CategoriesCarousel />
          </div>

          <div className="newArrivalsSection">
            <div className="newArrivalsHeader">
              <h2>New Arrivals</h2>
              <span className="seeAll">
                <Link to="/products/newArrival">See all</Link>
              </span>
            </div>

            <div className="newArrivalsCarousel">
              <NewArrivalsCarousel />
            </div>
          </div>

          <div className="trending">
            <TrendingCard />
          </div>

          <div>
            <div className="newArrivalsHeader">
              <h2>Popular</h2>
                 <span className="seeAll">
                <Link to="/products/popular">See all</Link>
              </span>
            </div>

            <div className="popular">
              <PopularCardList />
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}

export default HomePage
