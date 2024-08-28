import { Navigate, useRoutes } from "react-router-dom";
import ClientLayout from "src/components/layouts/ClientLayout";
// import Product from "src/pages/client/Product";
import ProductDetail from "src/pages/client/ProductDetail";
import AdminLayout from "./components/layouts/AdminLayout";
import NotFound from "./components/NotFound";
import Admin from "./pages/admin/Admin";
import CategoryList from "./pages/admin/categories/CategoryList";
import ProductAdd from "./pages/admin/products/ProductAdd";
import ProductEdit from "./pages/admin/products/ProductEdit";
import ProductList from "./pages/admin/products/ProductList";
import Product from "./pages/client/Product";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRouter";
import Register from "./pages/Register";
import StepProviderWrapper from "./pages/StepProviderWrapper";
import CategoryForm from "./pages/admin/categories/CategoryForm";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import OrderHistory from "./pages/OderHistory";
import FavoriteList from "./pages/FavoriteList";
import Home from "./pages/client/Home";

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
          },
          {
            path: "/admin/category/list",
            element: <CategoryList />
          },
          {
            path: "/admin/category/add",
            element: <CategoryForm />
          },
          {
            path: "/admin/category/edit/:id",
            element: <CategoryForm />
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
        path: "home",
        element: <Home />
      },
      {
        path: "product",
        element: <Product />
      },
      {
        path: "product/:id",
        element: <ProductDetail />
      },
      {
        path: "step",
        element: <StepProviderWrapper />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "order",
        element: <Order />
      },
      {
        path: "history",
        element: <OrderHistory />
      },
      {
        path: "wishlist",
        element: <FavoriteList />
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
