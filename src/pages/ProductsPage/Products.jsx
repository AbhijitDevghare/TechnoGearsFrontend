import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts, searchProducts } from "../../redux/slices/ProductsSlice";
import ProductCard from "../../components/ProductCard/ProductCard";

function Products({ filter, isButtonVisible, flexWrap, regex }) {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            let response;

            if (filter) {
                response = await dispatch(getProducts({ filter, pageNumber }));
            }

            if (regex) {
                console.log("regex IN PRODUCTS COMPONENT : ",regex)
                // response = await dispatch(searchProducts(regex));

                response = await dispatch(searchProducts({
                    regex,
                    page: pageNumber,
                    limit: 10,
                    sortBy: 'createdAt',
                    sortOrder: 'desc'
                  }));

                  
            }

            if (response?.payload) {
                setProducts(response.payload);
            } else{
                setProducts([]);
             }
        };

        fetchProducts();
    }, [filter, pageNumber, regex, dispatch]);

    const handleNextPage = () => {
        setPageNumber((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="flex flex-col justify-center items-center mt-10 mb-10 gap-10">

            {/* Pagination Controls - Top */}
            {isButtonVisible && (
                <div className="join">
                    <button
                        className="join-item btn"
                        onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                        disabled={pageNumber === 1}
                    >
                        «
                    </button>
                    <button className="join-item btn">Page {pageNumber}</button>
                    <button
                        className="join-item btn"
                        onClick={handleNextPage}
                        disabled={products.length === 0}
                    >
                        »
                    </button>
                </div>
            )}

            {/* Product List */}
            <div className={`flex gap-8 justify-center ${flexWrap ? "flex-wrap" : "flex-nowrap"} items-center`}>
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard product={product} key={product?._id || product?.id || Math.random()} />
                    ))
                ) : (
                    <p className="text-gray-500 text-lg">No products available</p>
                )}
            </div>

            {/* Pagination Controls - Bottom (optional, you can remove if top one is enough) */}
            {isButtonVisible && (
                <div className="join">
                    <button
                        className="join-item btn"
                        onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                        disabled={pageNumber === 1}
                    >
                        «
                    </button>
                    <button className="join-item btn">Page {pageNumber}</button>
                    <button
                        className="join-item btn"
                        onClick={handleNextPage}
                        disabled={products.length === 0}
                    >
                        »
                    </button>
                </div>
            )}
        </div>
    );
}

export default Products;
