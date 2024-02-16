import React, { useEffect, useState } from "react";

export const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [slides]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    } else if (touchEndX - touchStartX > 50) {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? slides.length - 1 : prevSlide - 1
      );
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  return (
    <header
      className="overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex justify-center md:max-h-[600px] md:min-h-[600px]">
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.image}
            style={{ display: index === currentSlide ? "block" : "none" }}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {slides.map((slide, index) => (
          <span
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 w-2 mx-2 rounded-full cursor-pointer ${
              index === currentSlide ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <button></button>
    </header>
  );
};
