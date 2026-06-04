import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import API from "../../api/axios";

import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

import CreateProductModal from "../../components/CreateProductModal/CreateProductModal";

interface DashboardData {
  total_users: number;
  total_products: number;
  total_orders: number;
  total_revenue: number;
}

const fetchDashboard = async () => {
  const response = await API.get("/admin/dashboard");

  return (
    response.data?.data || {
      total_users: 0,
      total_products: 0,
      total_orders: 0,
      total_revenue: 0,
    }
  );
};

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["dashboard"],

    queryFn: fetchDashboard,

    staleTime: 5 * 60 * 1000,
  });

  const dashboard = data || {
    total_users: 0,
    total_products: 0,
    total_orders: 0,
    total_revenue: 0,
  };

  if (isLoading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-slate-950
        "
      >
        <h1
          className="
            text-white
            text-2xl
            font-semibold
          "
        >
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-slate-950
        "
      >
        <h1
          className="
            text-red-500
            text-2xl
            font-semibold
          "
        >
          Failed to load dashboard
        </h1>
      </div>
    );
  }

  return (
    <div
      className="
      flex
      min-h-screen
      bg-slate-950
    "
    >
      <AdminSidebar />

      <div
        className="
        flex-1
        p-8
        bg-slate-950
      "
      >
        {/* Header */}
        <div
          className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-6
          mb-10
        "
        >
          <div>
            <p
              className="
              text-violet-400
              font-medium
              mb-2
            "
            >
              Welcome Back Admin
            </p>

            <h1
              className="
              text-5xl
              font-bold
              text-white
              mb-3
            "
            >
              Dashboard
            </h1>

            <p
              className="
              text-slate-400
              text-lg
            "
            >
              Manage products, orders and users from one place.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="
            bg-violet-600
            hover:bg-violet-700
            text-white
            px-8
            py-4
            rounded-2xl
            font-semibold
            transition
            shadow-lg
            shadow-violet-500/20
          "
          >
            + Create Product
          </button>
        </div>

        {/* Stats */}
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
        >
          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
            hover:border-violet-500
            transition
          "
          >
            <p
              className="
              text-slate-400
              mb-3
            "
            >
              Total Users
            </p>

            <h2
              className="
              text-white
              text-5xl
              font-bold
            "
            >
              {dashboard.total_users}
            </h2>
          </div>

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
            hover:border-violet-500
            transition
          "
          >
            <p
              className="
              text-slate-400
              mb-3
            "
            >
              Total Products
            </p>

            <h2
              className="
              text-white
              text-5xl
              font-bold
            "
            >
              {dashboard.total_products}
            </h2>
          </div>

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
            hover:border-violet-500
            transition
          "
          >
            <p
              className="
              text-slate-400
              mb-3
            "
            >
              Total Orders
            </p>

            <h2
              className="
              text-white
              text-5xl
              font-bold
            "
            >
              {dashboard.total_orders}
            </h2>
          </div>

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
            hover:border-green-500
            transition
          "
          >
            <p
              className="
              text-slate-400
              mb-3
            "
            >
              Total Revenue
            </p>

            <h2
              className="
              text-green-400
              text-5xl
              font-bold
            "
            >
              ₹ {dashboard.total_revenue}
            </h2>
          </div>
        </div>

        {/* Analytics Section */}
        <div
          className="
          mt-10
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        "
        >
          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-8
          "
          >
            <h3
              className="
              text-white
              text-xl
              font-bold
              mb-4
            "
            >
              Products Overview
            </h3>

            <p
              className="
              text-slate-400
            "
            >
              Total active products in the store:
            </p>

            <h2
              className="
              text-violet-400
              text-6xl
              font-bold
              mt-4
            "
            >
              {dashboard.total_products}
            </h2>
          </div>

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-8
          "
          >
            <h3
              className="
              text-white
              text-xl
              font-bold
              mb-4
            "
            >
              Revenue Overview
            </h3>

            <p
              className="
              text-slate-400
            "
            >
              Total revenue generated from orders.
            </p>

            <h2
              className="
              text-green-400
              text-6xl
              font-bold
              mt-4
            "
            >
              ₹ {dashboard.total_revenue}
            </h2>
          </div>
        </div>
      </div>

      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AdminDashboard;
