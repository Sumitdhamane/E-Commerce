import {
  useQuery,
} from "@tanstack/react-query";

import API from "../../api/axios";

import AdminSidebar
from "../../components/AdminSidebar/AdminSidebar";

// Order Type
interface Order {

  id: number;

  user_id: number;

  product_id: number;

  quantity: number;

  total_price: number;

  status: string;

}

// Fetch Orders
const fetchOrders =
  async () => {

    const response =
      await API.get(
        "/admin/orders"
      );

    return response.data.data;

};

const AdminOrders = () => {

  // Orders Query
  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery<Order[]>({

    queryKey: ["admin-orders"],

    queryFn: fetchOrders,

    staleTime:
      5 * 60 * 1000,

  });

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
        Loading orders...
      </h1>

    );

  }

  // Error
  if (error) {

    return (

      <h1
        className="
          text-red-500
          text-2xl
          p-10
        "
      >
        Failed to load orders
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
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
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
              Orders
            </h1>

            <p
              className="
                text-slate-400
              "
            >
              Track and manage customer orders
            </p>

          </div>

          {/* Filters */}
          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <input

              type="text"

              placeholder="Search orders..."

              className="
                bg-slate-900
                border
                border-slate-800
                rounded-xl
                px-5
                py-3
                text-white
                outline-none
                focus:border-violet-500
                w-72
              "
            />

            <select
              className="
                bg-slate-900
                border
                border-slate-800
                rounded-xl
                px-5
                py-3
                text-white
                outline-none
                focus:border-violet-500
              "
            >

              <option>
                All Status
              </option>

              <option>
                Pending
              </option>

              <option>
                Shipped
              </option>

              <option>
                Delivered
              </option>

            </select>

          </div>

        </div>

        {/* Stats */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            mb-10
          "
        >

          {/* Total Orders */}
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
                mb-2
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
              {orders.length}
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
                mb-2
              "
            >
              Total Revenue
            </p>

            <h2
              className="
                text-violet-400
                text-3xl
                font-bold
              "
            >
              ₹ {
                orders.reduce(
                  (
                    total,
                    order
                  ) =>

                    total +
                    order.total_price,

                  0
                )
              }
            </h2>

          </div>

          {/* Pending */}
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
                mb-2
              "
            >
              Pending Orders
            </p>

            <h2
              className="
                text-yellow-400
                text-3xl
                font-bold
              "
            >
              {
                orders.filter(
                  (order) =>

                    order.status ===
                    "pending"
                ).length
              }
            </h2>

          </div>

        </div>

        {/* Orders Table */}
        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            overflow-hidden
          "
        >

          {/* Table Header */}
          <div
            className="
              flex
              justify-between
              items-center
              px-6
              py-5
              border-b
              border-slate-800
            "
          >

            <div>

              <h2
                className="
                  text-white
                  text-xl
                  font-bold
                  mb-1
                "
              >
                Recent Orders
              </h2>

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Manage all customer purchases
              </p>

            </div>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr
                  className="
                    border-b
                    border-slate-800
                    text-slate-400
                    text-sm
                  "
                >

                  <th className="p-5 text-left">
                    Order
                  </th>

                  <th className="p-5 text-left">
                    User
                  </th>

                  <th className="p-5 text-left">
                    Product
                  </th>

                  <th className="p-5 text-left">
                    Quantity
                  </th>

                  <th className="p-5 text-left">
                    Total
                  </th>

                  <th className="p-5 text-left">
                    Status
                  </th>

                  <th className="p-5 text-right">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr

                    key={order.id}

                    className="
                      border-b
                      border-slate-800
                      hover:bg-slate-800/40
                      transition
                    "
                  >

                    {/* Order */}
                    <td className="p-5">

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
                          Ecommerce purchase
                        </p>

                      </div>

                    </td>

                    {/* User */}
                    <td className="p-5">

                      <span
                        className="
                          text-white
                        "
                      >
                        User {order.user_id}
                      </span>

                    </td>

                    {/* Product */}
                    <td className="p-5">

                      <span
                        className="
                          text-white
                        "
                      >
                        Product {order.product_id}
                      </span>

                    </td>

                    {/* Quantity */}
                    <td className="p-5">

                      <span
                        className="
                          text-white
                        "
                      >
                        {order.quantity}
                      </span>

                    </td>

                    {/* Total */}
                    <td className="p-5">

                      <span
                        className="
                          text-violet-400
                          font-semibold
                        "
                      >
                        ₹ {order.total_price}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="p-5">

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold

                          ${
                            order.status ===
                            "pending"

                              ? `
                                bg-yellow-500/20
                                text-yellow-400
                              `

                              : `
                                bg-green-500/20
                                text-green-400
                              `
                          }
                        `}
                      >

                        {order.status}

                      </span>

                    </td>

                    {/* Action */}
                    <td
                      className="
                        p-5
                        text-right
                      "
                    >

                      <button
                        className="
                          bg-slate-800
                          hover:bg-slate-700
                          transition
                          text-white
                          px-4
                          py-2
                          rounded-xl
                          text-sm
                          font-medium
                        "
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

};

export default AdminOrders;