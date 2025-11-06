import React, { useContext, useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import Button from "@mui/material/Button";
import { ProductContext } from "../../Context/ProductContext";

const Search = () => {
  const { changeHandler } = useContext(ProductContext);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      changeHandler({ target: { value: query } });
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query, changeHandler]);

  return (
    <div className="flex items-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-[40px] bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl border border-gray-300 px-3 mx-auto shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-blue-400 focus-within:border-blue-500">
      <input
        type="text"
        placeholder="Search products..."
        className="flex-grow p-2 bg-transparent outline-none border-none text-sm sm:text-base text-gray-700 placeholder-gray-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search products"
      />
      <Button
        onClick={() => changeHandler({ target: { value: query } })}
        className="!min-w-0 !p-2 transition-all duration-300 hover:scale-110"
      >
        <LuSearch size={26} className="text-gray-600 hover:text-blue-500 transition-colors duration-300" />
      </Button>
    </div>
  );
};

export default Search;
