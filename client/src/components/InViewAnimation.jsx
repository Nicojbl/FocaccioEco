import { useInView } from "react-intersection-observer";

const InViewAnimationLeft = ({ children }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`opacity-0 ${
        inView ? "animate__animated animate__backInLeft opacity-100" : ""
      }`}
    >
      {children}
    </div>
  );
};

const InViewAnimationRight = ({ children }) => {
    const [ref, inView] = useInView({
      threshold: 0.5,
      triggerOnce: true,
    });
  
    return (
      <div
        ref={ref}
        className={`opacity-0 ${
          inView ? "animate__animated animate__backInRight opacity-100" : ""
        }`}
      >
        {children}
      </div>
    );
  };
  
export { InViewAnimationLeft, InViewAnimationRight };