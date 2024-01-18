import { Link } from "react-router-dom";
import Container from "../Container";
import MenuDropdown from "./MenuDropdown";

const Navbar = () => {
  // const link =
  //   "https://drive.google.com/uc?export=download&id=1_PomyXfyWstNM7B7vlmTsWXG0CPLW5bi";
  // const handleDownload = () => {
  //   const tempEl = document.createElement("a");
  //   document.body.appendChild(tempEl);
  //   tempEl.href = link;
  //   tempEl.click();
  //   document.body.removeChild(tempEl);
  // };
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        {/* <Button
          label={"Test Boom"}
          onClick={async () => {
           await publicAxios.post("/boooooom");
          }}
        ></Button> */}
        <Container>
          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/">
              <img
                className="hidden md:block rounded-full"
                src="/logo.png"
                alt="logo"
                width="50"
                height="50"
              />
            </Link>
            {/* Dropdown Menu */}
            <MenuDropdown />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
