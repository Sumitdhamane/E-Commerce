import { Link }
from "react-router-dom";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import API from "../../api/axios";

import type { Product }
from "../../types/product";

import AdminSidebar
from "../../components/AdminSidebar/AdminSidebar";

// Fetch Products
const fetchProducts =
  async () => {

    const response =
      await API.get(
        "/admin/products"
      );

    return response.data.data;

};

const AdminProducts = () => {

  const queryClient =
    useQueryClient();

  // Products Query
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[]>({

    queryKey: ["products"],

    queryFn: fetchProducts,

  });

  // Delete Mutation
  const deleteMutation =
    useMutation({

      mutationFn:
        async (id: number) => {

          return await API.delete(
            `/admin/products/${id}`
          );

        },

      onSuccess: () => {

        queryClient.invalidateQueries({

          queryKey: ["products"],

        });

      },

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
        Loading products...
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
        Failed to load products
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
            md:flex-row
            md:items-center
            md:justify-between
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
              Products
            </h1>

            <p
              className="
                text-slate-400
              "
            >
              Manage ecommerce inventory
              and product catalog
            </p>

          </div>

          {/* Actions */}
          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            {/* Search */}
            <input

              type="text"

              placeholder="Search products..."

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

            {/* Add Button */}
            <Link

              to="/admin/products/create"

              className="
                bg-violet-600
                hover:bg-violet-700
                transition
                text-white
                px-6
                py-3
                rounded-xl
                font-medium
                whitespace-nowrap
              "
            >
              Add Product
            </Link>

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
              Total Products
            </p>

            <h2
              className="
                text-white
                text-3xl
                font-bold
              "
            >
              {products.length}
            </h2>

          </div>

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
              In Stock
            </p>

            <h2
              className="
                text-green-400
                text-3xl
                font-bold
              "
            >
              {
                products.filter(
                  (product) =>
                    product.stock > 0
                ).length
              }
            </h2>

          </div>

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
              Low Stock
            </p>

            <h2
              className="
                text-yellow-400
                text-3xl
                font-bold
              "
            >
              {
                products.filter(
                  (product) =>
                    product.stock < 5
                ).length
              }
            </h2>

          </div>

        </div>

        {/* Products Table */}
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
              items-center
              justify-between
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
                Product Inventory
              </h2>

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                View and manage all products
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
                    Product
                  </th>

                  <th className="p-5 text-left">
                    Price
                  </th>

                  <th className="p-5 text-left">
                    Stock
                  </th>

                  <th className="p-5 text-left">
                    Status
                  </th>

                  <th className="p-5 text-right">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {products.map(
                  (product) => (

                    <tr

                      key={product.id}

                      className="
                        border-b
                        border-slate-800
                        hover:bg-slate-800/40
                        transition
                      "
                    >

                      {/* Product */}
                      <td className="p-5">

                        <div>

                          <h3
                            className="
                              text-white
                              font-semibold
                              mb-1
                            "
                          >
                            {product.name}
                          </h3>

                          <p
                            className="
                              text-slate-400
                              text-sm
                            "
                          >
                            Product ID:
                            {product.id}
                          </p>

                        </div>

                      </td>

                      {/* Price */}
                      <td className="p-5">

                        <span
                          className="
                            text-white
                            font-medium
                          "
                        >
                          ₹ {product.price}
                        </span>

                      </td>

                      {/* Stock */}
                      <td className="p-5">

                        <span
                          className="
                            text-white
                          "
                        >
                          {product.stock}
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
                              product.stock > 5
                                ? `
                                  bg-green-500/20
                                  text-green-400
                                `
                                : `
                                  bg-yellow-500/20
                                  text-yellow-400
                                `
                            }
                          `}
                        >

                          {product.stock > 5
                            ? "In Stock"
                            : "Low Stock"}

                        </span>

                      </td>

                      {/* Actions */}
                      <td
                        className="
                          p-5
                          text-right
                        "
                      >

                        <div
                          className="
                            flex
                            justify-end
                            gap-3
                          "
                        >

                          {/* Edit */}
                          <Link

                            to={`/admin/products/edit/${product.id}`}

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
                            Edit
                          </Link>

                          {/* Delete */}
                          <button

                            onClick={() =>
                              deleteMutation.mutate(
                                product.id
                              )
                            }

                            className="
                              bg-red-500/20
                              hover:bg-red-500/30
                              transition
                              text-red-400
                              px-4
                              py-2
                              rounded-xl
                              text-sm
                              font-medium
                            "
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

};

export default AdminProducts;