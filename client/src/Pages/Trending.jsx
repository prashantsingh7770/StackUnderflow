import React, { useState, useEffect } from "react";
import { Search, User, ArrowRight, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BrandCarousel from "./BrandCarousel";


const Trending = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trendingItems = [
    {
      id: 1,
      title: "Summer Collection",
      subtitle: "Light & Breezy Kicks",
      image:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
      gradient: "from-amber-400 to-orange-500",
    },
    {
      id: 2,
      title: "Winter Warmth",
      subtitle: "Cozy & Stylish",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];


  return (
    <div className="font-[Inter] bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Section - Enhanced Light Theme */}
      <section className="relative overflow-hidden h-screen flex items-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764"
            alt="Sneaker Hero"
            className="w-full h-full object-cover"
          />
        </div>


        {/* Light Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-transparent z-10" />


        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full mix-blend-screen opacity-30 blur-3xl animate-pulse z-0" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-300 to-blue-300 rounded-full mix-blend-screen opacity-20 blur-3xl z-0" />


        <div className="relative z-[10] px-20 max-w-2xl">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold uppercase tracking-widest">
              ✨ Exclusive Collection
            </span>
          </div>


          <h1 className="text-7xl md:text-8xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-purple-700 to-pink-600 bg-clip-text text-transparent">
              SNEAKER
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              STATE OF MIND
            </span>
          </h1>


          <p className="text-xl md:text-2xl font-light mb-8 text-gray-700 leading-relaxed">
            Discover shoes that blend modern design with lasting comfort —{" "}
            <span className="text-gray-900 font-semibold">move confidently</span>{" "}
            every step, every season.
          </p>


          <div className="flex gap-4">
            <button
              onClick={() => navigate("/")}
              className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Shop Now <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </span>
            </button>


            <button className="px-8 py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900/10 transition-all">
              Explore
            </button>
          </div>
        </div>
      </section>


      {/* Brands Section - Light Theme */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 w-full overflow-x-hidden">
        <div className="mb-8">
          <h2 className="text-center uppercase text-sm tracking-widest text-gray-600 mb-2">
            🏆 Trusted by Millions
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full" />
        </div>
        <div className="w-full overflow-x-hidden">
          <BrandCarousel />
        </div>
      </section>

      {/* Trending Now - Light Theme */}
      <section className="px-10 py-20 bg-gradient-to-b from-gray-50 to-white w-full">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-5xl md:text-6xl font-black mb-3">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Trending Now
              </span>
            </h2>
            <p className="text-gray-600 text-lg">What everyone's talking about</p>
          </div>


          <button
            onClick={() => navigate("/")}
            className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105 flex items-center gap-2 flex-shrink-0"
          >
            Explore <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </button>
        </div>


        <div className="grid md:grid-cols-2 gap-8 w-full">
          {trendingItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl cursor-pointer h-96 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200"
              onClick={() => navigate("/")}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />


              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />


              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="text-4xl md:text-5xl font-black mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-lg text-gray-100 mb-6">{item.subtitle}</p>


                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-full hover:scale-105 transition-all hover:shadow-lg hover:shadow-white/50 group-hover:translate-x-1">
                    Shop Now <Zap size={18} />
                  </button>
                </div>
              </div>


              {/* Hover Effect - Neon Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </section>


      {/* Bottom CTA Section */}
      <section className="px-10 py-20 bg-gradient-to-r from-gray-100 via-white to-gray-50 text-center relative overflow-hidden border-t border-gray-200 w-full">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.3),transparent_50%)]" />
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
            Ready to Step Up?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of sneaker enthusiasts and find your perfect pair today
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-black text-lg rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 inline-flex items-center gap-3"
          >
            Start Shopping <ArrowRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
};


export default Trending;
