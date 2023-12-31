import { Link, Outlet } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Dashboard = () => {
  const user = useUser();
  console.log(user);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        {/* <div className="flex-1 p-6 w-[95%] mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Total Users</h3>
              <p className="text-3xl font-bold">1,234</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Revenue</h3>
              <p className="text-3xl font-bold">$50,000</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Page Views</h3>
              <p className="text-3xl font-bold">100,000</p>
            </div>
          </div>
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <div className="w-full h-64 bg-gray-300"></div>
          </div>
        </div> */}
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
          <div className="bg-primary text-center text-white p-4 rounded-md mb-10">
            <p className="text-4xl mb-">Hotelo LTD.</p>
            <p className="">The Best you can Stay</p>
          </div>
          {/* Sidebar content here */}
          <ul className="font-semibold space-y-4">
            <li className="rounded-md border-b-2 border-primary">
              <Link to="/dashboard/my-profile">My Profile</Link>
            </li>
            <li className="rounded-md border-b-2 border-primary">
              <a>My Bookings</a>
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
