import "./ProductsPage.css"
import { useEffect, useState } from "react"
import Header from "../../components/header/Header"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  getPopularProducts,
  getProducts,
  searchProducts
} from "../../redux/slices/ProductsSlice"
import NewArrivals from "../../components/cards/newarrival/NewArrival"

function ProductsPage() {
  const handleBack = () => window.history.back()

  const dispatch = useDispatch()
  const { type } = useParams()

  const { products, popularProducts } = useSelector(
    (state) => state.product
  )

  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [productsOnProductsPage, setProducts] = useState([])

  useEffect(() => {
    const fetch = async () => {
      let res

      if (searchInput) {
        res = await dispatch(
          searchProducts({
            regex: searchInput,
            page,
            limit: 10,
            sortBy: "createdAt",
            sortOrder: "desc"
          })
        )
        setProducts(res?.payload || [])
        return
      }

      if (type === "popular") {
        await dispatch(
          getPopularProducts({
            filter: {
              minRating: 3,
              sortBy: "ratings.average",
              order: "desc",
            },
            pageNumber: page,
          })
        )
        setProducts(popularProducts)
      } else {
        await dispatch(getProducts({ pageNumber: page }))
        setProducts(products)
      }
    }

    fetch()
  }, [type, page, searchInput, dispatch, products, popularProducts])

  return (
    <>
      <Header
        leftType="back"
        onBack={handleBack}
        onSearch={setSearchInput}
      />

      <div className="wrapperproductspage">
        {productsOnProductsPage.length === 0 ? (
          <div className="w-[100vw] flex justify-center items-center h-[200px] text-gray-500 text-lg">
            No products available
          </div>
        ) : (
          <div className="w-[100vw] flex items-center justify-center flex-wrap gap-5 mb-16 px-4">
            {productsOnProductsPage.map((product) => (
              <NewArrivals key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      <div className="productsPageButtons flex justify-center items-center gap-4 mt-6 mb-20">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="w-[100px] h-[30px] bg-gray-600 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">Page {page}</span>

        <button
          disabled={productsOnProductsPage.length === 0}
          onClick={() => setPage((p) => p + 1)}
          className="w-[100px] h-[30px] bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  )
}

export default ProductsPage
