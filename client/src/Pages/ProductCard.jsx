// import React, { useContext } from "react";
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";
// import Button from "@mui/material/Button";
// import { MdAddShoppingCart } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { ProductContext } from "../Context/ProductContext";

// const ProductCard = ({ _id, thumbnail, title, price, rating, discountPercentage }) => {
//   const { fetchProductById} = useContext(ProductContext);
//   const navigate = useNavigate();

//   const handleClick = async () => {
//     const product = await fetchProductById(_id);
//     navigate(`/product/${_id}`, { state: { product } });
//   };
//   const filledStars = Math.round(rating || 3); // default 3 if not provided
//   const totalStars = 5;



//   return (
//     <div
//       className="border rounded-xl p-4 shadow-md hover:shadow-lg transition cursor-pointer"
//       onClick={handleClick}
//     >
//       <img
//         src={thumbnail}
//         alt={title}
//         className="w-full h-40 object-cover rounded"
//       />
//       <h2 className="text-lg font-bold mt-2 truncate">{title}</h2>

//       <div className="flex items-center mt-2">
//         {Array.from({ length: totalStars }, (_, i) =>
//           i < filledStars ? (
//             <AiFillStar key={i} className="text-yellow-500" />
//           ) : (
//             <AiOutlineStar key={i} className="text-gray-400" />
//           )
//         )}
//         <span className="ml-2 text-sm text-gray-500">({rating || 3})</span>
//       </div>

//       <p className="text-gray-600 font-bold">₹{price}</p>
//       <p className="text-sm text-green-600">Discount: {discountPercentage}%</p>

//       <Button
//         variant="contained"
//         size="small"
//         startIcon={<MdAddShoppingCart />}
//       >
//         More details
//       </Button>
//     </div>
//   );
// };

// export default ProductCard;
import React, { useContext } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Button from "@mui/material/Button";
import { MdAddShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";

const ProductCard = ({
  _id,
  thumbnail,
  title,
  price,
  rating,
  discountPercentage,
}) => {
  const { fetchProductById } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleClick = async () => {
    const product = await fetchProductById(_id);
    navigate(`/product/${_id}`, { state: { product } });
  };

  const filledStars = Math.round(rating || 3); // default 3 if not provided
  const totalStars = 5;

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
    >
      {/* Product Image */}
      <div className="overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

      {/* Product Info */}
      <div className="p-4 text-center relative z-10">
        <h2 className="text-base font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors duration-300 truncate">
          {title}
        </h2>

        {/* Stars */}
        <div className="flex items-center justify-center mt-2">
          {Array.from({ length: totalStars }, (_, i) =>
            i < filledStars ? (
              <AiFillStar key={i} className="text-yellow-500" />
            ) : (
              <AiOutlineStar key={i} className="text-gray-400" />
            )
          )}
          <span className="ml-2 text-sm text-gray-500">({rating || 3})</span>
        </div>

        <p className="text-gray-800 font-bold mt-2">₹{price}</p>
        <p className="text-sm text-green-600">
          Discount: {discountPercentage}%
        </p>

        <div className="mt-3">
          <Button
            variant="contained"
            size="small"
            startIcon={<MdAddShoppingCart />}
            className="!bg-yellow-500 hover:!bg-yellow-600 !text-white !capitalize !rounded-lg"
          >
            More details
          </Button>
        </div>
      </div>

      {/* Hover Border Animation */}
      <span className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500 rounded-xl transition-all duration-500"></span>
    </div>
  );
};

export default ProductCard;
