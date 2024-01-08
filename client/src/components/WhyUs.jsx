import { IoFlowerOutline } from "react-icons/io5";
import {
  MdCreditScore,
  MdOutlineScreenSearchDesktop,
  MdOutlineSupportAgent,
} from "react-icons/md";
import Container from "./Shared/Container";

const WhyUs = () => {
  return (
    <Container className="my-16">
      <p className="text-[#262729] text-4xl font-semibold text-center mb-4">
        Why Choose Us
      </p>
      <p className="text-[#333] text-center text-lg leading-7 w-[35%] mx-auto">
        The main reason is because our competitors have disgusting sites, but we
        can&apos;t write that here, so the text here will be different
      </p>
      <div className="grid grid-cols-4 gap-4 mt-10">
        <div className="border p-4 rounded-md border-primary">
          <MdCreditScore className="text-4xl mx-auto mb-1" />
          <p className="text-[#262729] text-center text-lg font-bold mb-3">
            Payment Methodes
          </p>
          <p className="text-[#333] text-center">
            We have a lot of them, from cryptocurrencies to barter for potatoes
          </p>
        </div>
        <div className="border p-4 rounded-md border-primary">
          <MdOutlineScreenSearchDesktop className="text-4xl mx-auto mb-1" />
          <p className="text-[#262729] text-center text-lg font-bold mb-3">
            Simple search process
          </p>
          <p className="text-[#333] text-center">
            We checked it out, even the kid did it, but it was my mom&apos;s
            friend&apos;s son
          </p>
        </div>
        <div className="border p-4 rounded-md border-primary">
          <MdOutlineSupportAgent className="text-4xl mx-auto mb-1" />
          <p className="text-[#262729] text-center text-lg font-bold mb-3">
            24/7 Support
          </p>
          <p className="text-[#333] text-center">
            Is there something you don&apos;t understand? Feel free to call us.
            Phone number in the footer
          </p>
        </div>
        <div className="border p-4 rounded-md border-primary">
          <IoFlowerOutline className="text-4xl mx-auto mb-1" />
          <p className="text-[#262729] text-center text-lg font-bold mb-3">
            We are nice
          </p>
          <p className="text-[#333] text-center">
            Fantasy is over, there will be something really convincing here
          </p>
        </div>
      </div>
    </Container>
  );
};

export default WhyUs;
