import { Navigate, useRoutes } from "react-router-dom";
import ClientLayout from "src/components/layouts/ClientLayout";
// import Product from "src/pages/client/Product";
import ProductDetail from "src/pages/client/ProductDetail";
import Product from "./pages/client/Product";
import NotFound from "./components/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRouter";
import AdminLayout from "./components/layouts/AdminLayout";
import ProductList from "./pages/admin/products/ProductList";
import Admin from "./pages/admin/Admin";
import ProductAdd from "./pages/admin/products/ProductAdd";
import ProductEdit from "./pages/admin/products/ProductEdit";

const routeConfig = [
  {
    path: "admin",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="/admin/dashboard" />
          },
          {
            path: "/admin/dashboard",
            element: <Admin />
          },
          {
            path: "/admin/product/list",
            element: <ProductList />
          },
          {
            path: "/admin/product/add",
            element: <ProductAdd />
          },
          {
            path: "/admin/product/edit/:id",
            element: <ProductEdit />
          }
        ]
      }
    ]
  },
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
