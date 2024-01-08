import { Link } from "react-router-dom";
import WhyUs from "../../components/WhyUs";

const Home = () => {
  return (
    <div>
      <div className="bg-[url('/home.png')] bg-cover bg-no-repeat py-44 pl-20">
        <p className="font-bold text-5xl leading-tight">
          Find a pleasure <br /> for your vacation
        </p>
        <p className="text-xl leading-6 mt-3">
          We have several thousand apartments <br /> for every taste in every
          corner of the globe
        </p>
        <Link to="/rooms">
          <button className="bg-primary text-white font-semibold text-lg px-4 py-2 rounded-md mt-4 duration-300 active:scale-90">
            Book Now
          </button>
        </Link>
      </div>
      <WhyUs />
    </div>
  );
};

export default Home;
