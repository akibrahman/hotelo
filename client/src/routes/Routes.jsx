import { createBrowserRouter } from "react-router-dom";
import Rooms from "../components/Rooms/Rooms";
import PaymentSuccess from "../components/Shared/PaymentSuccess";
import Dashboard from "../layouts/Dashboard/Dashboard";
import Main from "../layouts/Main";
import AddRoom from "../pages/AddRoom";
import AllBookings from "../pages/AllBookings";
import AllCustomers from "../pages/AllCustomers";
import AllPayments from "../pages/AllPayments";
import AllRooms from "../pages/AllRooms";
import Cancelation from "../pages/Cancelation";
import Cancelations from "../pages/Cancelations";
import DetailsPage from "../pages/DetailsPage/DetailsPage";
import EditProfile from "../pages/EditProfile";
import EditRoom from "../pages/EditRoom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MyBookings from "../pages/MyBookings";
import MyPayments from "../pages/MyPayments";
import MyProfile from "../pages/MyProfile";
import SignUp from "../pages/SignUp/SignUp";
import UserPrivateRoute from "./UserPrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/room/:id",
        element: (
          <UserPrivateRoute>
            <DetailsPage />
          </UserPrivateRoute>
        ),
      },
      {
        path: "/payment-success/:tranId",
        element: (
          <UserPrivateRoute>
            <PaymentSuccess />
          </UserPrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <UserPrivateRoute>
        <Dashboard />
      </UserPrivateRoute>
    ),
    children: [
      //! Admin
      {
        path: "add-room",
        element: <AddRoom />,
      },
      {
        path: "all-rooms",
        element: <AllRooms />,
      },
      {
        path: "all-customers",
        element: <AllCustomers />,
      },
      {
        path: "all-bookings",
        element: <AllBookings />,
      },
      {
        path: "all-payments",
        element: <AllPayments />,
      },
      {
        path: "edit-room/:id",
        element: <EditRoom />,
      },
      {
        path: "cancelation-requestes",
        element: <Cancelations />,
      },
      {
        path: "cancelation-requestes/:id",
        element: <Cancelation />,
      },
      //! User
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "my-payments",
        element: <MyPayments />,
      },
    ],
  },
]);
