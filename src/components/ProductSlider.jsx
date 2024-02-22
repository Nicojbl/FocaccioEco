import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CardProduct } from "./CardProduct";
import { useInView } from "react-intersection-observer";

export const ProductSlider = ({ products, title }) => {
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

  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={`opacity-0  ${inView ? "opacity-100 animate__animated animate__backInLeft" : ""}`}>
      <h3 className="text-lg font-semibold m-auto mt-5 border-b-2 w-[120px] text-center border-red-500">
        {title}
      </h3>
      <Carousel
        {...settings}
        className="h-[600px]"
      >
        {products.map((product) => (
          <div key={product._id} className="px-2">
            <CardProduct product={product} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
