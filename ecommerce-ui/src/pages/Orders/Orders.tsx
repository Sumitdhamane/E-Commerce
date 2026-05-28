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

  // Fetch Orders
  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery<Order[]>({

    queryKey: ["orders"],

    queryFn: getOrders,

  });

  // Loading State
  if (isLoading) {

    return (

      <h1
        className="
          text-white
          text-3xl
          p-10
        "
      >
        Loading orders...
      </h1>

    );

  }

  // Error State
  if (error) {

    return (

      <h1
        className="
          text-red-500
          text-3xl
          p-10
        "
      >
        Failed to load orders
      </h1>

    );

  }

  return (

    <div className="p-10">

      {/* Heading */}
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

      {/* Empty State */}
      {orders.length === 0 && (

        <h2
          className="
            text-white
            text-2xl
          "
        >
          No orders found
        </h2>

      )}

      {/* Orders List */}
      <div className="space-y-6">

        {orders.map((order) => (

          <div

            key={order.id}

            className="
              bg-slate-900
              rounded-2xl
              p-8
              border
              border-slate-800
            "
          >

            {/* Order ID */}
            <h2
              className="
                text-white
                text-3xl
                font-bold
                mb-6
              "
            >
              Order #{order.id}
            </h2>

            {/* Product ID */}
            <p
              className="
                text-slate-300
                text-lg
                mb-3
              "
            >
              Product ID:
              <span className="text-white ml-2">
                {order.product_id}
              </span>
            </p>

            {/* Quantity */}
            <p
              className="
                text-slate-300
                text-lg
                mb-3
              "
            >
              Quantity:
              <span className="text-white ml-2">
                {order.quantity}
              </span>
            </p>

            {/* Total Price */}
            <p
              className="
                text-slate-300
                text-lg
                mb-3
              "
            >
              Total Price:
              <span
                className="
                  text-violet-400
                  ml-2
                  font-bold
                "
              >
                ₹ {order.total_price}
              </span>
            </p>

            {/* Status */}
            <p
              className="
                text-slate-300
                text-lg
              "
            >
              Status:
              <span
                className="
                  ml-2
                  px-4
                  py-1
                  rounded-full
                  bg-green-500/20
                  text-green-400
                  text-sm
                  font-bold
                "
              >
                {order.status}
              </span>
            </p>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Orders;