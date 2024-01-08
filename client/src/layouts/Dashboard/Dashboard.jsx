import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import Loader from "../../components/Shared/Loader";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";

const Dashboard = () => {
  const user = useUser();
  const { logOut } = useAuth();

  const handleLogOut = async () => {
    await logOut();
    toast.success("Successfully Logged Out");
  };
  if (!user) return <Loader />;
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-start">
        {/* Page content here */}
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <Link to="/dashboard/my-profile">
            <div className="flex flex-col items-center gap-3 mb-5 relative">
              <Link className="absolute top-2 left-2" to="/">
                <FaHome className="text-xl text-primary" />
              </Link>
              <img src={user.photo} className="rounded-full w-32 h-32" alt="" />
              <div className="text-center">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <div className="flex items-center justify-center gap-10 mt-2">
                  <button
                    onClick={handleLogOut}
                    className="bg-red-500 rounded-md px-3 py-1 texmedi
             text-white duration-300 active:scale-90"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </Link>
          {/* Sidebar content here */}
          {user.role == "admin" && (
            <ul className="font-semibold space-y-2">
              <li className="rounded-md bg-slate-300">
                <NavLink to="/dashboard/my-profile" className={"py-3"}>
                  Admin Profile
                </NavLink>
              </li>
              <li className="rounded-md bg-slate-300">
                <NavLink to="/dashboard/all-customers" className={"py-3"}>
                  All Customers
                </NavLink>
              </li>
              <li className="rounded-md bg-slate-300">
                <NavLink to="/dashboard/all-bookings" className={"py-3"}>
                  All Bookings
                </NavLink>
              </li>
              <li className="rounded-md bg-slate-300">
                <NavLink to="/dashboard/all-payments" className={"py-3"}>
                  All Payments
                </NavLink>
              </li>
              <li className="rounded-md bg-slate-300">
                <NavLink to="/dashboard/add-room" className={"py-3"}>
                  Add Room
                </NavLink>
              </li>
              <li className="rounded-md bg-slate-300">
                <NavLink to="/dashboard/all-rooms" className={"py-3"}>
                  All Rooms
                </NavLink>
              </li>
              <li className="rounded-md bg-slate-300">
                <NavLink
                  to="/dashboard/cancelation-requestes"
                  className={"py-3"}
                >
                  Cancelation Requestes
                </NavLink>
              </li>
            </ul>
          )}
          {user.role == "guest" && (
            <ul className="font-semibold space-y-2">
              <li className="rounded-md bg-slate-300">
                <NavLink to="/dashboard/my-bookings" className={"py-3"}>
                  My Bookings
                </NavLink>
              </li>
              <li className="rounded-md bg-slate-300">
                <NavLink to="/dashboard/my-payments" className={"py-3"}>
                  My Payments
                </NavLink>
              </li>
            </ul>
          )}
        </ul>
      </div>
    </div>
    // <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
    //   {/* Sidebar */}
    //   <div className="bg-purple-700 text-white w-full sm:w-64 p-6">
    //     <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
    //     <ul>
    //       <li className="mb-2">
    //         <a href="#" className="hover:text-gray-300">
    //           Home
    //         </a>
    //       </li>
    //       <li className="mb-2">
    //         <a href="#" className="hover:text-gray-300">
    //           Analytics
    //         </a>
    //       </li>
    //       <li className="mb-2">
    //         <a href="#" className="hover:text-gray-300">
    //           Settings
    //         </a>
    //       </li>
    //     </ul>
    //   </div>

    //   {/* Main Content */}

    // </div>
  );
};

export default Dashboard;
