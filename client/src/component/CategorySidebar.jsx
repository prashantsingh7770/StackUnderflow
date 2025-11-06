// CategorySidebar.jsx
import { useState } from "react";
import {
  FaTshirt,
  FaShoePrints,
  FaGem,
  FaSprayCan,
  FaPumpSoap,
  FaGlasses,
  FaShoppingBag,
} from "react-icons/fa";
import { Slider } from "@/components/ui/slider";

const categories = [
  { name: "Clothing", icon: <FaTshirt className="text-xl text-green-600" /> },
  {
    name: "Footwear",
    icon: <FaShoePrints className="text-xl text-blue-600" />,
  },
  { name: "Jewelry", icon: <FaGem className="text-xl text-purple-500" /> },
  { name: "Perfume", icon: <FaSprayCan className="text-xl text-pink-500" /> },
  {
    name: "Cosmetics",
    icon: <FaPumpSoap className="text-xl text-orange-500" />,
  },
  { name: "Glasses", icon: <FaGlasses className="text-xl text-gray-700" /> },
  { name: "Bags", icon: <FaShoppingBag className="text-xl text-red-500" /> },
];

export default function CategorySidebar({
  selectedCategories,
  setSelectedCategories,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  applyFilters,
}) {
  const [sliderValue, setSliderValue] = useState([
    Number(minPrice) || 0,
    Number(maxPrice) || 10000,
  ]);

  const toggleCategory = (category) => {
    let updatedCategories;
    if (selectedCategories[0] === category) {
      updatedCategories = []; // deselect if clicked again
    } else {
      updatedCategories = [category]; // only one category allowed
    }
    setSelectedCategories(updatedCategories);

    // auto Apply filters for selected categories
    applyFilters(updatedCategories, sliderValue[0], sliderValue[1]);
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const handleApply = () => {
    applyFilters(selectedCategories, sliderValue[0], sliderValue[1]);
  };

  return (
    <div className="hidden md:block md:w-64 w-full bg-white rounded-2xl shadow p-6 md:sticky md:top-[80px] mb-3">
      <h2 className="text-lg font-bold mb-4">CATEGORY</h2>

      <ul className="space-y-2">
        {categories.map((cat, index) => (
          <label
            key={index}
            htmlFor={`cat-${index}`}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-1 rounded-lg transition"
          >
            <div className="flex items-center gap-3">
              {cat.icon}
              <span className="text-gray-700 font-medium">{cat.name}</span>
            </div>
            <input
              id={`cat-${index}`}
              type="checkbox"
              name="category"
              checked={selectedCategories[0] === cat.name}
              onChange={() => toggleCategory(cat.name)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </label>
        ))}
      </ul>

      {/* Price Range Slider */}
      <div className="mt-6">
        <h2 className="text-[18px] font-bold mb-3">PRICE RANGE</h2>

        <Slider
          min={0}
          max={10000}
          step={100}
          value={sliderValue}
          onValueChange={handleSliderChange}
          className="w-full"
        />

        <div className="flex justify-between mt-2 text-sm font-semibold text-gray-700">
          <span>₹{sliderValue[0]}</span>
          <span>₹{sliderValue[1]}</span>
        </div>

        <button
          onClick={handleApply}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
