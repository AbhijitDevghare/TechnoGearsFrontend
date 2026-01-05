import React, { useState, useEffect, useCallback } from "react";
import Image1 from "../../assets/carousel1.jpg";
import Image2 from "../../assets/carousel2.avif";
import Image3 from "../../assets/carousel3.jpg";

const slides = [
  { url: Image1, title: "Slide 1" },
  { url: Image2, title: "Slide 2" },
  { url: Image3, title: "Slide 3" },
];

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return React.createElement(
    "div",
    {
      className:
        "h-[35vh] md:h-[50vh] w-[95%]  max-w-6xl mx-auto my-8 relative group overflow-hidden rounded-2xl shadow-lg",
      onMouseEnter: () => setIsPaused(true),
      onMouseLeave: () => setIsPaused(false),
    },
    React.createElement(
      "div",
      {
        className:
          "absolute inset-0 flex items-center justify-center text-white z-1 bg-black/30 pointer-events-none",
      },
      React.createElement(
        "div",
        {
          className:
            "flex flex-col items-start gap-4 p-8 rounded-2xl text-left w-full max-w-[600px] pointer-events-auto pl-[5%] md:pl-0",
        },
        React.createElement(
          "button",
          {
            className:
              "bg-blue-700 px-6 py-2 rounded-xl text-sm font-semibold text-white",
          },
          "NEW ARRIVAL"
        ),
        React.createElement(
          "h2",
          {
            className:
              "text-3xl md:text-5xl font-bold text-white drop-shadow-md",
          },
          "Summer Tech Sale"
        ),
        React.createElement(
          "p",
          {
            className:
              "text-lg opacity-90 text-white drop-shadow-sm",
          },
          "Up to 40% off on premium audio gear"
        ),
        React.createElement(
          "button",
          {
            className:
              "bg-white text-black px-6 py-2 rounded-xl font-medium hover:bg-gray-200 transition",
          },
          "Shop Now"
        )
      )
    ),
    React.createElement(
      "div",
      { className: "w-full h-full relative" },
      slides.map((slide, index) =>
        React.createElement(
          "div",
          {
            key: index,
            style: { backgroundImage: `url(${slide.url})` },
            className: `absolute top-0 left-0 w-full h-full bg-center bg-cover duration-700 transition-all ease-in-out ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`,
          }
        )
      )
    ),
    React.createElement(
      "div",
      {
        className:
          "hidden group-hover:block absolute top-[50%] -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 transition-colors z-1",
      },
      React.createElement(
        "button",
        { onClick: prevSlide, "aria-label": "Previous Slide" },
        "❮"
      )
    ),
    React.createElement(
      "div",
      {
        className:
          "hidden group-hover:block absolute top-[50%] -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 transition-colors z-1",
      },
      React.createElement(
        "button",
        { onClick: nextSlide, "aria-label": "Next Slide" },
        "❯"
      )
    ),
    React.createElement(
      "div",
      {
        className: "absolute bottom-4 left-0 right-0 flex justify-center py-2 z-1",
      },
      slides.map((_, slideIndex) =>
        React.createElement(
          "div",
          {
            key: slideIndex,
            onClick: () => goToSlide(slideIndex),
            className: `text-2xl cursor-pointer mx-1 transition-colors ${
              currentIndex === slideIndex
                ? "text-blue-500"
                : "text-gray-300"
            }`,
          },
          "•"
        )
      )
    )
  );
}

export default HeroCarousel;