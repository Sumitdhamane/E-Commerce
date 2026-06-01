import { Link } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import API from "../../api/axios";

import type { Product } from "../../types/product";

import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

// Fetch Products
const fetchProducts = async () => {
  const response = await API.get("/admin/products");

  return response.data.data || [];
};

const AdminProducts = () => {
  const queryClient = useQueryClient();

  // Query
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],

    queryFn: fetchProducts,
  });

  // Safe Products
  const products = Array.isArray(data) ? data : [];

  // Delete Product
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await API.delete(`/admin/products/${id}`);
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
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#030712]
        "
      >
        <h1
          className="
            text-white
            text-3xl
            font-bold
          "
        >
          Loading products...
        </h1>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#030712]
        "
      >
        <h1
          className="
            text-red-500
            text-3xl
            font-bold
          "
        >
          Failed to load products
        </h1>
      </div>
    );
  }

  return (
    <div
      className="
        flex
        min-h-screen
        bg-[#030712]
        text-white
      "
    >
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <div
        className="
          flex-1
          p-8
          lg:p-10
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
          {/* Left */}
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-violet-500/10
                border
                border-violet-500/20
                text-violet-400
                px-4
                py-2
                rounded-full
                text-sm
                font-medium
                mb-5
              "
            >
              Ecommerce Admin
            </div>

            <h1
              className="
                text-5xl
                font-black
                tracking-tight
                mb-3
              "
            >
              Product
              <span
                className="
                  text-violet-500
                "
              >
                {" "}
                Management
              </span>
            </h1>

            <p
              className="
                text-slate-400
                text-lg
                max-w-2xl
              "
            >
              Manage ecommerce products, inventory, pricing, and stock.
            </p>
          </div>

          {/* Add Product */}
          <Link
            to="/admin/products/create"
            className="
              bg-violet-600
              hover:bg-violet-700
              transition-all
              px-7
              py-4
              rounded-2xl
              font-semibold
              shadow-lg
              shadow-violet-500/20
            "
          >
            Add Product
          </Link>
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
          {/* Total */}
          <div
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              p-6
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
                text-4xl
                font-black
              "
            >
              {products.length}
            </h2>
          </div>

          {/* In Stock */}
          <div
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              p-6
            "
          >
            <p
              className="
                text-slate-400
                mb-3
              "
            >
              In Stock
            </p>

            <h2
              className="
                text-4xl
                font-black
                text-green-400
              "
            >
              {products.filter((p) => p.stock > 0).length}
            </h2>
          </div>

          {/* Low Stock */}
          <div
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              p-6
            "
          >
            <p
              className="
                text-slate-400
                mb-3
              "
            >
              Low Stock
            </p>

            <h2
              className="
                text-4xl
                font-black
                text-yellow-400
              "
            >
              {products.filter((p) => p.stock < 10).length}
            </h2>
          </div>
        </div>

        {/* Empty */}
        {products.length === 0 && (
          <div
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              p-20
              text-center
            "
          >
            <h2
              className="
                text-4xl
                font-bold
                mb-4
              "
            >
              No Products Found
            </h2>

            <p
              className="
                text-slate-400
                text-lg
              "
            >
              Create your first product.
            </p>
          </div>
        )}

        {/* Table */}
        {products.length > 0 && (
          <div
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              overflow-hidden
            "
          >
            {/* Header */}
            <div
              className="
                grid
                grid-cols-5
                gap-4
                px-8
                py-6
                border-b
                border-slate-800
                text-slate-400
                uppercase
                text-sm
                tracking-wider
                font-semibold
              "
            >
              <div>ID</div>

              <div>Product</div>

              <div>Price</div>

              <div>Stock</div>

              <div className="text-right">Actions</div>
            </div>

            {/* Rows */}
            {products.map((product) => (
              <div
                key={product.id}
                className="
                  grid
                  grid-cols-5
                  gap-4
                  items-center
                  px-8
                  py-6
                  border-b
                  border-slate-800
                  hover:bg-slate-800/40
                  transition-all
                "
              >
                {/* ID */}
                <div
                  className="
                    text-slate-400
                    font-medium
                  "
                >
                  #{product.id}
                </div>

                {/* Product */}
                <div>
                  <h3
                    className="
                      text-lg
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
                      line-clamp-1
                    "
                  >
                    {product.description}
                  </p>
                </div>

                {/* Price */}
                <div>
                  <span
                    className="
                      text-violet-400
                      text-lg
                      font-bold
                    "
                  >
                    ₹ {product.price}
                  </span>
                </div>

                {/* Stock */}
                <div>
                  <span
                    className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-semibold

                      ${
                        product.stock > 10
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
                    {product.stock} in stock
                  </span>
                </div>

                {/* Actions */}
                <div
                  className="
                    flex
                    items-center
                    justify-end
                    gap-4
                  "
                >
                  {/* Edit */}
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="
                      bg-blue-500/10
                      border
                      border-blue-500/20
                      text-blue-400
                      hover:bg-blue-500/20
                      transition-all
                      px-5
                      py-2
                      rounded-xl
                      font-medium
                    "
                  >
                    Edit
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => deleteMutation.mutate(product.id)}
                    className="
                      bg-red-500/10
                      border
                      border-red-500/20
                      text-red-400
                      hover:bg-red-500/20
                      transition-all
                      px-5
                      py-2
                      rounded-xl
                      font-medium
                    "
                  >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
