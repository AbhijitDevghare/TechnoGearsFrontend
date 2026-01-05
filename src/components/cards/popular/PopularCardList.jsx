import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopularCard from "./PopularCard";
import { getPopularProducts } from "../../../redux/slices/ProductsSlice";

function PopularCardList() {
  const dispatch = useDispatch();

  const { popularProducts= [], loading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
  dispatch(
    getPopularProducts({
      filter: {
        minRating: 3,
        sortBy: "ratings.average",
        order: "desc",
      },
      pageNumber: 1,
    })
  )
}, [dispatch])


  if (loading) return null;

  return (
    <>
      {popularProducts.length>0 && popularProducts.slice(0, 10).map((product) => (
        <PopularCard key={product._id} product={product} />
      ))}
    </>
  );
}

export default PopularCardList;
