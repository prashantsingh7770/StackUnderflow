// BrandCarousel.jsx
import Marquee from "react-fast-marquee";
import { useState } from "react";

const BrandCarousel = () => {
  const brands = [
    {
      name: "Meesho",
      primary: "https://cdn.worldvectorlogo.com/logos/meesho.svg",
      fallback: "https://logo.clearbit.com/meesho.com"
    },
    {
      name: "Puma",
      primary: "https://cdn.worldvectorlogo.com/logos/puma.svg",
      fallback: "https://logo.clearbit.com/puma.com"
    },
    {
      name: "Nike",
      primary: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
      fallback: "https://logo.clearbit.com/nike.com"
    },
    {
      name: "Adidas",
      primary: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
      fallback: "https://logo.clearbit.com/adidas.com"
    },
    {
      name: "Zara",
      primary: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
      fallback: "https://logo.clearbit.com/zara.com"
    },
    {
      name: "H&M",
      primary: "https://cdn.worldvectorlogo.com/logos/h-m-1.svg",
      fallback: "https://logo.clearbit.com/hm.com"
    },
    {
      name: "Gucci",
      primary: "https://cdn.worldvectorlogo.com/logos/gucci.svg",
      fallback: "https://logo.clearbit.com/gucci.com"
    },
    {
      name: "Louis Vuitton",
      primary: "https://cdn.worldvectorlogo.com/logos/louis-vuitton.svg",
      fallback: "https://logo.clearbit.com/louisvuitton.com"
    },
    {
      name: "Versace",
      primary: "https://cdn.worldvectorlogo.com/logos/versace.svg",
      fallback: "https://logo.clearbit.com/versace.com"
    },
    {
      name: "Prada",
      primary: "https://cdn.worldvectorlogo.com/logos/prada.svg",
      fallback: "https://logo.clearbit.com/prada.com"
    },
    {
      name: "Calvin Klein",
      primary: "https://cdn.worldvectorlogo.com/logos/calvin-klein.svg",
      fallback: "https://logo.clearbit.com/calvinklein.com"
    },
  ];

  const BrandImage = ({ brand }) => {
    const [imgSrc, setImgSrc] = useState(brand.primary);

    return (
      <img 
        src={imgSrc} 
        alt={`${brand.name} logo`} 
        className="w-24 h-24 object-contain" 
        onError={() => setImgSrc(brand.fallback)}
      />
    );
  };

  return (
    <div className="py-4 bg-white">
      <Marquee speed={40} gradient={false}>
        {brands.map((brand, index) => (
          <div key={index} className="mx-8">
            <BrandImage brand={brand} />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandCarousel;
