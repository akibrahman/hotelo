import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useSwiper } from "swiper/react";

const SliderBtn = ({ dir }) => {
  const swiper = useSwiper();
  if (dir === "prev") {
    return (
      <AiOutlineArrowLeft
        onClick={() => swiper.slidePrev()}
        className="text-white bg-primary rounded-full p-2 w-10 h-10 cursor-pointer active:scale-75 duration-300"
      ></AiOutlineArrowLeft>
    );
  } else if (dir === "next") {
    return (
      <AiOutlineArrowRight
        onClick={() => swiper.slideNext()}
        className="text-white bg-primary rounded-full p-2 w-10 h-10 cursor-pointer active:scale-75 duration-300"
      ></AiOutlineArrowRight>
    );
  }
};

export default SliderBtn;
