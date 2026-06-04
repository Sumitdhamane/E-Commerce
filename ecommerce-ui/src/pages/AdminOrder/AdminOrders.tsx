import {
useQuery,
} from "@tanstack/react-query";

import API from "../../api/axios";

import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

interface Order {

id: number;

user_id: number;

product_id: number;

quantity: number;

total_price: number;

status: string;

}

const fetchOrders = async () => {

const response =
await API.get(
"/admin/orders"
);

console.log(
"Orders Response:",
response.data
);

return (
response.data?.data || []
);

};

const AdminOrders = () => {

const {
data,
isLoading,
error,
} = useQuery<Order[]>({


queryKey: ["admin-orders"],

queryFn: fetchOrders,

staleTime:
  5 * 60 * 1000,


});

const orders: Order[] =
Array.isArray(data)
? data
: [];

const totalRevenue =
orders.reduce(
(
total,
order
) =>
total +
Number(
order.total_price || 0
),
0
);

const pendingOrders =
orders.filter(
(order) =>
order.status
?.toLowerCase() ===
"pending"
).length;

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
      "
    >
      Loading Orders...
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
      "
    >
      Failed to load orders
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

  <div className="flex-1 p-8">

    <div className="mb-10">

      <h1
        className="
          text-white
          text-4xl
          font-bold
          mb-2
        "
      >
        Orders Management
      </h1>

      <p
        className="
          text-slate-400
        "
      >
        Track and manage customer orders
      </p>

    </div>

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        mb-10
      "
    >

      <div
        className="
          bg-slate-900
          rounded-2xl
          border
          border-slate-800
          p-6
        "
      >

        <p className="text-slate-400">
          Total Orders
        </p>

        <h2
          className="
            text-white
            text-3xl
            font-bold
            mt-2
          "
        >
          {orders.length}
        </h2>

      </div>

      <div
        className="
          bg-slate-900
          rounded-2xl
          border
          border-slate-800
          p-6
        "
      >

        <p className="text-slate-400">
          Revenue
        </p>

        <h2
          className="
            text-violet-400
            text-3xl
            font-bold
            mt-2
          "
        >
          ₹ {totalRevenue}
        </h2>

      </div>

      <div
        className="
          bg-slate-900
          rounded-2xl
          border
          border-slate-800
          p-6
        "
      >

        <p className="text-slate-400">
          Pending Orders
        </p>

        <h2
          className="
            text-yellow-400
            text-3xl
            font-bold
            mt-2
          "
        >
          {pendingOrders}
        </h2>

      </div>

    </div>

    <div
      className="
        bg-slate-900
        rounded-2xl
        border
        border-slate-800
        overflow-hidden
      "
    >

      <table className="w-full">

        <thead>

          <tr
            className="
              border-b
              border-slate-800
              text-slate-400
            "
          >

            <th className="p-5 text-left">
              Order ID
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
              "
            >

              <td className="p-5 text-white">
                #{order.id}
              </td>

              <td className="p-5 text-white">
                {order.user_id}
              </td>

              <td className="p-5 text-white">
                {order.product_id}
              </td>

              <td className="p-5 text-white">
                {order.quantity}
              </td>

              <td
                className="
                  p-5
                  text-violet-400
                  font-semibold
                "
              >
                ₹ {order.total_price}
              </td>

              <td className="p-5">

                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    bg-green-500/20
                    text-green-400
                  "
                >
                  {order.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

</div>


);

};

export default AdminOrders;
