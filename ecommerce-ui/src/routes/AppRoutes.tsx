import { Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

import AdminRoute from "./AdminRoute";

/*
|--------------------------------------------------------------------------
| Lazy Loaded Pages
|--------------------------------------------------------------------------
*/

const Home = lazy(() => import("../pages/Home/Home"));

const Products = lazy(() => import("../pages/Products/Products"));

const ProductDetails = lazy(
  () => import("../pages/ProductDetails/ProductDetails"),
);

const Login = lazy(() => import("../pages/Login/Login"));

const Signup = lazy(() => import("../pages/Signup/Signup"));

const Orders = lazy(() => import("../pages/Orders/Orders"));

const Cart = lazy(() => import("../pages/Cart/Cart"));

const AdminDashboard = lazy(() => import("../pages/AdminDashboard/AdminDashboard"));

const AdminProducts = lazy(() => import("../pages/AdminProducts/AdminProducts"));

const AdminOrders = lazy(() => import("../pages/AdminOrder/AdminOrders"));

const CreateProduct = lazy(() => import("../pages/CreateProduct/CreateProduct"));

const EditProduct = lazy(() => import("../pages/EditProduct/EditProduct"));

/*
|--------------------------------------------------------------------------
| App Routes
|--------------------------------------------------------------------------
*/

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div
          className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-slate-950
            text-white
            text-xl
          "
        >
          Loading...
        </div>
      }
    >
      <Routes>
        {/* Main Layout */}
        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          {/* Protected Cart */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Protected Orders */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        {/* Admin Products */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        {/* Admin Orders */}
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        {/* Create Product */}
        <Route
          path="/admin/products/create"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <CreateProduct />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        {/* Edit Product */}
        <Route
          path="/admin/products/edit/:id"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
