// Cart.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "../Pages/CartCard";
import { useAuth } from "@/Context/AuthContext";

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  
  const { token, isAuthenticated, logout } = useAuth();

  // Fetch cart items safely
  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/cart", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      // Handle response status codes
      if (res.status === 401) {
        logout();
        navigate("/login");
        return;
      }

      if (res.status === 404) {
        setIsEmpty(true);
        setCartData([]);
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setCartData(data);
      } else if (Array.isArray(data.items)) {
        setCartData(data.items);
      } else {
        setCartData([]);
      }

      setIsEmpty(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setIsEmpty(true);
      setCartData([]);
    } finally {
      setLoading(false);
    }
  }, [token,logout,navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsEmpty(true);
      setLoading(false);
      return;
    }
    fetchCart();
  }, [fetchCart, isAuthenticated]);


  // ✅ Update quantity (optimistic)
  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) return deleteItem(productId);

    setCartData((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );

    try {
      await fetch("http://localhost:3000/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ productId, quantity }),
      });
    } catch (err) {
      console.error("Error updating quantity:", err);
      fetchCart();
    }
  };

  // ✅ Delete single item
  const deleteItem = async (productId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (res.status === 404) {
        setIsEmpty(true);
        setCartData([]);
        return;
      }

      setCartData((prev) => prev.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  // ✅ Clear cart
  const clearCart = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/cart/clear", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (res.status === 404) {
        setIsEmpty(true);
        setCartData([]);
        return;
      }

      setCartData([]);
      setIsEmpty(true);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  // ✅ Memoized totals
  const totalProducts = useMemo(() => {
    if (!Array.isArray(cartData)) return 0;
    return cartData.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
  }, [cartData]);

  const shipping = totalProducts > 0 ? 30 : 0;
  const total = totalProducts + shipping;

  const checkout = () => navigate("/checkout");

  // ✅ Loading state
  if (loading)
    return <p className="text-center mt-20 text-lg">Loading cart...</p>;

  // ✅ Empty state (based on 404)
  if (isEmpty)
    return (
      <div className="text-center mt-20">
        <p className="text-lg mb-4">Your cart is empty 🛒</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Continue Shopping
        </button>
      </div>
    );

  // ✅ Main UI
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-12">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Left: Item List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow border border-gray-200 p-6">
          <div className="mb-4 border-b pb-3">
            <h2 className="text-xl font-semibold">Items in Cart</h2>
          </div>

          <div className="space-y-4">
            {cartData.map((item) => (
              <CartCard
                key={item._id || item.productId}
                item={item}
                onIncrease={() =>
                  updateQuantity(item.productId, item.quantity + 1)
                }
                onDecrease={() =>
                  updateQuantity(item.productId, item.quantity - 1)
                }
                deleteItem={() => deleteItem(item.productId)}
              />
            ))}
          </div>

          <button
            onClick={clearCart}
            className="mt-4 w-full py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition"
          >
            Clear Cart
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4 border-b pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <p>Products</p>
              <p>₹{totalProducts.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>₹{shipping.toFixed(2)}</p>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-bold">
              <p>Total</p>
              <p>₹{total.toFixed(2)}</p>
            </div>
          </div>

          <button
            onClick={checkout}
            className="mt-6 w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
