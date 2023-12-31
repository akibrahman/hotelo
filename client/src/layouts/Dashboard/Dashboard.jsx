import { Link, NavLink, Outlet } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Dashboard = () => {
  const user = useUser();
  console.log(user);
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
          <Link
            to="/"
            className="bg-primary text-center text-white p-4 rounded-md mb-10"
          >
            <p className="text-4xl mb-">Hotelo LTD.</p>
            <p className="">The Best you can Stay</p>
          </Link>
          {/* Sidebar content here */}
          <ul className="font-semibold space-y-4">
            <li className="rounded-md border-b-2 border-primary">
              <NavLink to="/dashboard/my-profile">My Profile</NavLink>
            </li>
            <li className="rounded-md border-b-2 border-primary">
              <NavLink to="/dashboard/my-bookings">My Bookings</NavLink>
            </li>
            <li className="rounded-md border-b-2 border-primary">
              <a>My Payments</a>
            </li>
          </ul>
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
