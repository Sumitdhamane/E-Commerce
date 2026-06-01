import { useQuery } from "@tanstack/react-query";

import API from "../../api/axios";

import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

import { CSVLink } from "react-csv";

// Types
interface DashboardData {
  total_users: number;

  total_orders: number;

  total_products: number;

  total_revenue: number;
}

interface Order {
  id: number;

  user_id: number;

  total_price: number;

  status: string;
}

// Fetch Dashboard
const fetchDashboard = async () => {
  const response = await API.get("/admin/dashboard");

  return response.data.data;
};

// Fetch Recent Orders
const fetchRecentOrders = async () => {
  const response = await API.get("/admin/orders");

  return response.data.data;
};

const AdminDashboard = () => {
  // Dashboard Query
  const {
    data: dashboard,
    isLoading,
    error,
  } = useQuery<DashboardData>({
    queryKey: ["dashboard"],

    queryFn: fetchDashboard,
  });

  // Recent Orders Query
  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["admin-orders"],

    queryFn: fetchRecentOrders,
  });

  const csvData = orders.map((order) => ({
    OrderID: order.id,

    UserID: order.user_id,

    TotalPrice: order.total_price,

    Status: order.status,
  }));

  // Loading
  if (isLoading) {
    return (
      <h1
        className="
          text-white
          text-2xl
          p-10
        "
      >
        Loading dashboard...
      </h1>
    );
  }

  // Error
  if (error || !dashboard) {
    return (
      <h1
        className="
          text-red-500
          text-2xl
          p-10
        "
      >
        Failed to load dashboard
      </h1>
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
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div
          className="
            flex
            justify-between
            items-center
            mb-10
          "
        >
          <div>
            <h1
              className="
                text-3xl
                font-bold
                text-white
                mb-2
              "
            >
              Dashboard
            </h1>

            <p
              className="
                text-slate-400
              "
            >
              Ecommerce analytics overview
            </p>
          </div>

          <CSVLink
            data={csvData}
            filename="orders-report.csv"
            className="
    bg-violet-600
    hover:bg-violet-700
    transition
    text-white
    px-6
    py-3
    rounded-xl
    font-medium
  "
          >
            Generate Report
          </CSVLink>
        </div>

        {/* KPI Cards */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
            mb-10
          "
        >
          {/* Users */}
          <div
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-6
            "
          >
            <p
              className="
                text-slate-400
                text-sm
                mb-3
              "
            >
              Total Users
            </p>

            <h2
              className="
                text-white
                text-3xl
                font-bold
              "
            >
              {dashboard.total_users}
            </h2>
          </div>

          {/* Orders */}
          <div
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-6
            "
          >
            <p
              className="
                text-slate-400
                text-sm
                mb-3
              "
            >
              Total Orders
            </p>

            <h2
              className="
                text-white
                text-3xl
                font-bold
              "
            >
              {dashboard.total_orders}
            </h2>
          </div>

          {/* Products */}
          <div
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-6
            "
          >
            <p
              className="
                text-slate-400
                text-sm
                mb-3
              "
            >
              Products
            </p>

            <h2
              className="
                text-white
                text-3xl
                font-bold
              "
            >
              {dashboard.total_products}
            </h2>
          </div>

          {/* Revenue */}
          <div
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-6
            "
          >
            <p
              className="
                text-slate-400
                text-sm
                mb-3
              "
            >
              Revenue
            </p>

            <h2
              className="
                text-violet-400
                text-3xl
                font-bold
              "
            >
              ₹ {dashboard.total_revenue}
            </h2>
          </div>
        </div>

        {/* Main Grid */}
        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-6
          "
        >
          {/* Recent Orders */}
          <div
            className="
              xl:col-span-2
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-6
            "
          >
            <div
              className="
                flex
                justify-between
                items-center
                mb-6
              "
            >
              <h2
                className="
                  text-white
                  text-xl
                  font-bold
                "
              >
                Recent Orders
              </h2>

              <button
                className="
                  text-violet-400
                  text-sm
                "
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="
                      flex
                      justify-between
                      items-center
                      bg-slate-800
                      rounded-xl
                      p-4
                    "
                >
                  <div>
                    <h3
                      className="
                          text-white
                          font-semibold
                          mb-1
                        "
                    >
                      Order #{order.id}
                    </h3>

                    <p
                      className="
                          text-slate-400
                          text-sm
                        "
                    >
                      User ID:
                      {order.user_id}
                    </p>
                  </div>

                  <div
                    className="
                        text-right
                      "
                  >
                    <h3
                      className="
                          text-white
                          font-bold
                          mb-2
                        "
                    >
                      ₹ {order.total_price}
                    </h3>

                    <span
                      className="
                          bg-green-500/20
                          text-green-400
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                        "
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-6
            "
          >
            <h2
              className="
                text-white
                text-xl
                font-bold
                mb-6
              "
            >
              Quick Stats
            </h2>

            <div className="space-y-5">
              <div
                className="
                  bg-slate-800
                  rounded-xl
                  p-5
                "
              >
                <p
                  className="
                    text-slate-400
                    text-sm
                    mb-2
                  "
                >
                  Average Order Value
                </p>

                <h3
                  className="
                    text-white
                    text-2xl
                    font-bold
                  "
                >
                  ₹ 4,500
                </h3>
              </div>

              <div
                className="
                  bg-slate-800
                  rounded-xl
                  p-5
                "
              >
                <p
                  className="
                    text-slate-400
                    text-sm
                    mb-2
                  "
                >
                  Pending Orders
                </p>

                <h3
                  className="
                    text-yellow-400
                    text-2xl
                    font-bold
                  "
                >
                  12
                </h3>
              </div>

              <div
                className="
                  bg-slate-800
                  rounded-xl
                  p-5
                "
              >
                <p
                  className="
                    text-slate-400
                    text-sm
                    mb-2
                  "
                >
                  Monthly Revenue
                </p>

                <h3
                  className="
                    text-violet-400
                    text-2xl
                    font-bold
                  "
                >
                  ₹ 1,20,000
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
