// ProductPage.jsx
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import CategorySidebar from "../component/CategorySidebar";
import { ProductContext } from "../Context/ProductContext";
import { useAuth } from "@/Context/AuthContext";

const ProductPage = () => {
  const { search } = useContext(ProductContext);
  const { token } = useAuth();

  const [data, setData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchData = async (filters = {}) => {
    let headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = token;

    // Build query string
    let query = new URLSearchParams();
    if (filters.minPrice) query.append("minPrice", filters.minPrice);
    if (filters.maxPrice) query.append("maxPrice", filters.maxPrice);
    if (filters.category && filters.category.length > 0) {
      query.append("category", filters.category.join(",")); // backend should handle multiple
    }

    const url =
      query.toString().length > 0
        ? `/api/products/filter?${query.toString()}`
        : `/api/products`;

    const response = await fetch(url, { method: "GET", headers });
    if (!response.ok) {
      console.error("Failed to fetch products:", response.status);
      return [];
    }

    return await response.json();
  };

  // Initial load (all products)
  useEffect(() => {
    (async () => {
      const newData = await fetchData();
      setData(newData);
    })();
  }, []);

  // Apply Filters
  const applyFilters = async (
    categories = selectedCategories,
    min = minPrice,
    max = maxPrice
  ) => {
    const newData = await fetchData({
      minPrice: min,
      maxPrice: max,
      category: categories,
    });
    setData(newData);
  };


  // Search filter (client-side)
  const filterData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-[25%_75%] gap-4">
      {/* Sidebar */}
      <div className="hidden md:block">
        <CategorySidebar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          applyFilters={applyFilters}
        />
      </div>

      {/* Product Section */}
      <div>
        <p className="text-black font-bold text-2xl p-5 text-center md:text-left">
          Our Collection
        </p>

        <div className="grid gap-4 p-3 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-4">
          {filterData.length > 0 ? (
            filterData.map((item) => (
              <ProductCard
                key={item._id}
                _id={item._id}
                thumbnail={item.imageUrl}
                title={item.name}
                price={item.price}
                rating={item.rating}
                discountPercentage={item.discountPercentage}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
