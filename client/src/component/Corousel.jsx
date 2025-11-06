// import React from "react";
// import { assets } from "../assets/assets";

// const Corousel = () => {
//   return (
//     <div id="default-carousel" className="relative w-full -z-0 " data-carousel="slide">
//       {/* Carousel wrapper */}
//       <div className="relative h-56 overflow-hidden md:h-96">
//         {/* Item 1 */}
//         <div className="hidden duration-700 ease-in-out" data-carousel-item>
//           <img
//             src={assets.img1}
//             className="absolute block w-full "
//             alt="Slide 1"
//             loading="lazy"
//           />
//         </div>
//         {/* Item 2 */}
//         <div className="hidden duration-700 ease-in-out" data-carousel-item>
//           <img
//             src={assets.img2}
//             className="absolute block w-full "
//             alt="Slide 2"
//             loading="lazy"
//           />
//         </div>
//         {/* Item 3 */}
//         <div className="hidden duration-700 ease-in-out" data-carousel-item>
//           <img
//             src={assets.img3}
//             className="absolute block w-full"
//             alt="Slide 3"
//             loading="lazy"
//           />
//         </div>
//         {/* Item 4 */}
//         <div className="hidden duration-700 ease-in-out" data-carousel-item>
//           <img
//             src={assets.img4}
//             className="absolute block w-full "
//             alt="Slide 4"
//             loading="lazy"
//           />
//         </div>
//         {/* Item 5 */}
//         <div className="hidden duration-700 ease-in-out" data-carousel-item>
//           <img
//             src={assets.img5}
//             className="absolute block w-full -"
//             alt="Slide 5"
//             loading="lazy"
//           />
//         </div>
//       </div>
//       {/* Slider indicators */}
//       <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
//         <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
//         <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
//         <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
//         <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
//         <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
//       </div>
//       {/* Slider controls */}
//       <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//           <svg
//             className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 6 10"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5 1 1 5l4 4"
//             />
//           </svg>
//           <span className="sr-only">Previous</span>
//         </span>
//       </button>
//       <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//           <svg
//             className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 6 10"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="m1 9 4-4-4-4"
//             />
//           </svg>
//           <span className="sr-only">Next</span>
//         </span>
//       </button>
//     </div>
//   );
// };

// export default Corousel;

import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Corousel = () => {
  const images = [assets.img1, assets.img2, assets.img3, assets.img4, assets.img5];
  const [current, setCurrent] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-56 md:h-96 overflow-hidden rounded-lg ">
      {/* Slides */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          loading="lazy"
          className={`absolute w-full h-70 md:h-96 pt-5 object-fit transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
            
          }`}
        />
      ))}

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev - 1 + images.length) % images.length)
        }
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        ❮
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        ❯
      </button>
    </div>
  );
};

export default Corousel;

