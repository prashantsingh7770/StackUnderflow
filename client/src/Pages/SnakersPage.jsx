import React from "react";
import { ShoppingCart } from "lucide-react";

const SneakerHome = () => {
  const products = [
    {
      id: 1,
      name: "Nike Air Max 270 React",
      price: 280,
      image:
        "https://images.unsplash.com/photo-1606813907291-82d8a18c5a3e?w=600",
    },
    {
      id: 2,
      name: "Nike Air Max 270 React",
      price: 280,
      image:
        "https://images.unsplash.com/photo-1606813907291-82d8a18c5a3e?w=600",
    },
  ];

  return (
    <div className="font-[Inter] bg-white text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center py-6 px-10 border-b">
        <div className="flex items-center space-x-10">
          <h1 className="text-2xl font-bold">Sneakify</h1>
          <nav className="flex space-x-6">
            <a href="#" className="hover:text-black text-gray-600">
              Our Collections
            </a>
            <a href="#" className="hover:text-black text-gray-600">
              About Us
            </a>
          </nav>
        </div>
        <button className="relative flex items-center border px-4 py-2 rounded-full hover:bg-gray-100">
          <ShoppingCart size={18} className="mr-2" /> Cart
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1606813907291-82d8a18c5a3e?w=1200"
          alt="Sneaker"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start px-20 bg-gradient-to-r from-black/60 via-black/30 to-transparent text-white">
          <h1 className="text-6xl font-extrabold mb-3">SNEAKER</h1>
          <p className="text-3xl font-semibold mb-6">STATE OF MIND</p>
          <p className="max-w-lg mb-6 text-gray-200">
            Discover shoes that blend modern design with lasting comfort — move
            confidently every step, every season.
          </p>
          <button className="bg-white text-black px-6 py-3 font-semibold rounded-full hover:bg-gray-200">
            Shop Now
          </button>
        </div>
      </section>

      {/* Brands */}
      <section className="py-10 text-center">
        <h2 className="uppercase text-sm tracking-widest text-gray-500 mb-4">
          Top Rated Brands
        </h2>
        <div className="flex justify-center space-x-10 font-semibold">
          <button className="hover:text-black text-gray-600">Adidas</button>
          <button className="hover:text-black text-gray-600">Puma</button>
          <button className="hover:text-black text-gray-600">Nike</button>
        </div>
      </section>

      {/* Popular Collections */}
      <section className="px-10 py-10 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Popular Collections</h2>
          <a href="#" className="text-gray-700 hover:underline">
            Discover All Products →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[300px] h-[200px] object-cover rounded-xl mb-6"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600 mt-2">${item.price.toFixed(2)}</p>
              <button className="mt-4 flex items-center bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">
                <ShoppingCart size={18} className="mr-2" /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="px-10 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <a href="#" className="text-gray-700 hover:underline">
            Discover All Products →
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <img
            src="https://images.unsplash.com/photo-1606813907291-82d8a18c5a3e?w=600"
            alt="Trending 1"
            className="rounded-2xl w-full h-[300px] object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1606813907291-82d8a18c5a3e?w=600"
            alt="Trending 2"
            className="rounded-2xl w-full h-[300px] object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default SneakerHome;
