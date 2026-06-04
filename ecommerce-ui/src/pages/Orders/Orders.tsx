import {
  useQuery,
} from "@tanstack/react-query";

import {
  getOrders,
} from "../../api/orderApi";

import type {
  Order,
} from "../../types/order";

const Orders = () => {

  const {
    data,
    isLoading,
    error,
  } = useQuery<Order[]>({

    queryKey: ["orders"],

    queryFn: getOrders,

  });

  const orders =
    Array.isArray(data)
      ? data
      : [];

  if (isLoading) {

    return (

      <div className="p-10">

        <h1
          className="
            text-white
            text-3xl
          "
        >
          Loading orders...
        </h1>

      </div>

    );

  }

  if (error) {

    return (

      <div className="p-10">

        <h1
          className="
            text-red-500
            text-3xl
          "
        >
          Failed to load orders
        </h1>

      </div>

    );

  }

  return (

    <div className="p-10">

      <h1
        className="
          text-white
          text-5xl
          font-bold
          mb-10
        "
      >
        My Orders
      </h1>

      {orders.length === 0 && (

        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-8
            text-center
          "
        >

          <h2
            className="
              text-white
              text-2xl
            "
          >
            No orders found
          </h2>

        </div>

      )}

      <div className="space-y-6">

        {orders.map((order) => (

          <div

            key={order.id}

            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-8
            "
          >

            <h2
              className="
                text-white
                text-2xl
                font-bold
                mb-5
              "
            >
              Order #{order.id}
            </h2>

            <div className="space-y-3">

              <p className="text-slate-300">
                Product ID:
                <span className="text-white ml-2">
                  {order.product_id}
                </span>
              </p>

              <p className="text-slate-300">
                Quantity:
                <span className="text-white ml-2">
                  {order.quantity}
                </span>
              </p>

              <p className="text-slate-300">
                Total:
                <span
                  className="
                    text-violet-400
                    font-bold
                    ml-2
                  "
                >
                  ₹ {order.total_price}
                </span>
              </p>

              <p className="text-slate-300">

                Status:

                <span
                  className="
                    ml-2
                    px-3
                    py-1
                    rounded-full
                    bg-green-500/20
                    text-green-400
                    text-sm
                  "
                >
                  {order.status}
                </span>

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Orders;