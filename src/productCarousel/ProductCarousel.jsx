import { useState, useEffect } from "react";

function ProductCarousel({ category, apiUrl }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiUrl]);

  return (
    <div className="w-full bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">{category}</h2>
      
      <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex gap-6">
          {products.map((product, index) => (
            <div key={index} className="min-w-[150px] md:min-w-[200px]">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
              <p className="font-semibold mt-2">{product.name}</p>
              <p className="text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCarousel;
