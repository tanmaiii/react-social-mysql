import React, { useContext } from "react";
import "./app.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

import { useDarkMode } from "./context/darkModeContext";
import { useAuth } from "./context/authContext";

import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";

import { QueryClient, QueryClientProvider } from "react-query";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";

function App() {
  const queryClient = new QueryClient()
  const { darkMode } = useDarkMode();
  const { currentUser } = useAuth();

  const Layout = () => {
    return (
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div className={`App theme-${darkMode ? "dark" : "light"}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
