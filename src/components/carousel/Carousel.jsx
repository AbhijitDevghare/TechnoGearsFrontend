import React, { useState, useEffect } from "react";
import Img1 from "../../assets/carousel1.avif";
import Img2 from "../../assets/carousel2.avif";
import Img3 from "../../assets/carousel3.jpg";
import Img4 from "../../assets/carousel4.avif";
import Img5 from "../../assets/carousel5.avif";

const images = [Img1, Img2, Img3, Img4, Img5];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="flex w-full items-center justify-center my-6 lg:my-14 px-0">
      <div className="relative w-full h-[180px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden rounded-lg shadow-lg">
        {/* Background Blur Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-lg opacity-30 scale-105"
          style={{ backgroundImage: `url(${images[currentSlide]})` }}
        ></div>

        {/* Main Image */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <img src={image} className="w-full h-full object-cover rounded-lg" alt={`Slide ${index + 1}`} />
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full text-2xl hover:bg-opacity-80 transition-all"
          onClick={() => setCurrentSlide((currentSlide - 1 + images.length) % images.length)}
        >
          ❮
        </button>
        <button
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full text-2xl hover:bg-opacity-80 transition-all"
          onClick={() => setCurrentSlide((currentSlide + 1) % images.length)}
        >
          ❯
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-white scale-110" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
