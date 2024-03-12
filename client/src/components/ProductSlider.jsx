import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CardProduct } from "./CardProduct";

export const ProductSlider = ({ products }) => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const settings = {
    swipeable: true,
    draggable: true,
    showDots: false,
    responsive: responsive,
    infinite: false,
    keyBoardControl: true,
    customTransition: "transform 700ms ease-in-out",
  };

  return (
    <div>
      <Carousel {...settings} className="py-10 md:py-20">
        {products.map((product) => (
          <div key={product._id} className="px-2">
            <CardProduct product={product} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
