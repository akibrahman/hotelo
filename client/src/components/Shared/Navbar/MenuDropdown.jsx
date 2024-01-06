import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import avatarImg from "../../../assets/images/placeholder.jpg";
import useAuth from "../../../hooks/useAuth";

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();

  const handleLogOut = async () => {
    await logOut();
    toast.success("Successfully Logged Out");
  };
  return (
    <div className="relative">
      <div className="flex items-center gap-10">
        {/* Menu  */}
        <div className="flex items-center gap-8 menulink">
          <NavLink to="/">
            <p>Home</p>
          </NavLink>
          <NavLink to="/about">
            <p>About</p>
          </NavLink>
          <NavLink to="/rooms">
            <p>Rooms</p>
          </NavLink>
          <NavLink to="/contact-us">
            <p>Contact Us</p>
          </NavLink>
          <NavLink to="/dashboard">
            <p>Dashboard</p>
          </NavLink>
        </div>
        {/* Profile  */}
        {user ? (
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer md:cursor-default hover:shadow-md transition"
          >
            <AiOutlineMenu className="block md:hidden" />
            <div className="hidden md:flex items-center gap-3 px-2 py-1">
              {/* Avatar */}
              <img
                className="rounded-full w-8 h-8"
                referrerPolicy="no-referrer"
                src={user && user.photoURL ? user.photoURL : avatarImg}
                alt="profile"
              />
              <p className="hidden md:block">{user.displayName}</p>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button
              className="bg-primary rounded-md px-4 py-2 texmedi
          text-white duration-300 active:scale-90"
            >
              Log In
            </button>
          </Link>
        )}
      </div>
      <p></p>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm duration-300 block md:hidden">
          <div className="flex flex-col cursor-pointer">
            <Link
              to="/"
              className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Dashboard
                </Link>
                <div
                  onClick={handleLogOut}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Log Out
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
