import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This will render the children components */}
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/", // Home page
        element: <Home />,
      },
      {
        path: "post/:id", // Dynamic route for a single post
        element: <Single />,
      },
      {
        path: "write", // Write page
        element: <Write />,
      },
    ],
  },
  {
    path: "/register", // Register page
    element: <Register />,
  },
  {
    path: "/login", // Login page
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
