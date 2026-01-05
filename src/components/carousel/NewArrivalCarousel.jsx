import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewArrivals from "../cards/newarrival/NewArrival";
import { getProducts } from "../../redux/slices/ProductsSlice";

function NewArrivalsCarousel() {
  const dispatch = useDispatch();

  const { products = [], loading, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
        dispatch(getProducts({}));

  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <>

      {products.length > 0 && products.slice(0,20).map((product) => (
        <NewArrivals key={product._id} product={product} />
      ))}
    </>
  );
}

export default NewArrivalsCarousel;
