import { Navigate, useRoutes } from "react-router-dom";
import ClientLayout from "src/components/layouts/ClientLayout";
// import Product from "src/pages/client/Product";
import ProductDetail from "src/pages/client/ProductDetail";
import Product from "./pages/client/Product";
import NotFound from "./components/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";

const routeConfig = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/product" />
      },
      {
        path: "product",
        element: <Product />
      },
      {
        path: "product/:id",
        element: <ProductDetail />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/404" />
  },
  {
    path: "/404",
    element: <NotFound />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }
];

function App() {
  const routers = useRoutes(routeConfig);
  return <main>{routers}</main>;
}

export default App;
