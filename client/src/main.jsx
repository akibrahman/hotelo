import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";
import { router } from "./routes/Routes";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
);
