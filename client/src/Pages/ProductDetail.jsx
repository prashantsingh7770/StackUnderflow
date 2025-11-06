import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
import { toast } from "sonner";
import { useAuth } from "@/Context/AuthContext";
import { API_BASE } from "@/api";

const ProductDetails = () => {
  const { token } = useAuth();
  const [suggestedData, setSuggestedData] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchProductById } = useContext(ProductContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    })();
  }, [id, fetchProductById]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const result = await response.json();
        setSuggestedData(result);
      } catch (error) {
        console.error("Error fetching trending data:", error);
      }
    };
    fetchTrendingData();
  }, []);

  const addToCart = async (e) => {
    e.preventDefault();
    if (!product) return;

    try {
      const res = await fetch(`${API_BASE}/api/cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          productId: product._id,
          productName: product.name,
          price: product.price,
          quantity: 1,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`${product.name} added to cart!`);
      } else {
        if (res.status === 401) navigate("/login");
        toast.error(data.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again later.");
    }
  };

  if (!product) return <div className="text-center py-20">Loading...</div>;



  return (
    <div className="min-h-screen bg-white py-10 px-6 font-[Poppins]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Product Image */}
        <div className="flex justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-[380px] h-[420px] object-cover rounded-lg shadow-md border border-gray-200"
          />
        </div>

        {/* Right: Product Info */}
        <div className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {product.name}
          </h2>
          <p className="text-green-600 font-semibold text-lg">
            ₹{product.price}
          </p>

          <div className="flex items-center gap-2 text-yellow-500">
            <span>★</span>
            <p className="text-gray-700">{product.rating || "4.0"} Ratings</p>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {product.desc ||
              "High-quality fabric with modern design and perfect fit for everyday wear."}
          </p>

          Size Selection
          <div className="mt-4">
            <h4 className="font-semibold text-gray-800 mb-2">Select Size</h4>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    selectedSize === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:border-blue-500 hover:text-blue-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-6">
            <button
              onClick={addToCart}
              className="px-6 py-3 bg-pink-600 text-white font-medium rounded-md shadow-md hover:bg-pink-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          You may also like
        </h2>

        <div className="flex overflow-x-auto gap-6 pb-4 scroll-smooth snap-x snap-mandatory">
          {suggestedData.slice(0, 10).map((item) => (
            <div
              key={item.id}
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 cursor-pointer snap-start min-w-[220px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="p-4 text-center">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {item.title}
                </p>
                <p className="text-gray-600 text-sm mt-1">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
