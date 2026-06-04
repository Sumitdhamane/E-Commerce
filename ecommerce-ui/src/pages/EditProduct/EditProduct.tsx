import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getProductById } from "../../api/productApi";

import API from "../../api/axios";

import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

const EditProduct = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { id } = useParams();

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [stock, setStock] = useState("");

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],

    queryFn: () => getProductById(id!),
  });

  useEffect(() => {
    if (!product) return;

    setName(product.name);

    setDescription(product.description);

    setPrice(String(product.price));

    setStock(String(product.stock));
  }, [product]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      return await API.put(`/admin/products/${id}`, {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["product", id],
      });

      navigate("/admin/products");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading Product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-red-500 text-xl">Failed to load product</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <AdminSidebar />

      <div className="flex-1 p-8 lg:p-12">
        {/* Header */}
        <div className="mb-10">
          <h1
            className="
              text-5xl
              font-extrabold
              bg-gradient-to-r
              from-violet-400
              via-blue-400
              to-cyan-400
              bg-clip-text
              text-transparent
            "
          >
            Edit Product
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Update product details, pricing and stock information.
          </p>
        </div>

        {/* Error */}
        {updateMutation.isError && (
          <div
            className="
              mb-6
              bg-red-500/10
              border
              border-red-500/30
              text-red-400
              p-4
              rounded-2xl
            "
          >
            Failed to update product.
          </div>
        )}

        <div
          className="
            grid
            lg:grid-cols-2
            gap-8
            max-w-7xl
          "
        >
          {/* Form Card */}
          <div
            className="
              bg-slate-900/80
              backdrop-blur-xl
              border
              border-slate-800
              rounded-3xl
              p-8
              shadow-xl
            "
          >
            <h2
              className="
                text-white
                text-2xl
                font-bold
                mb-8
              "
            >
              Product Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="
                    block
                    text-slate-400
                    mb-2
                  "
                >
                  Product Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-2xl
                    bg-slate-800
                    border
                    border-slate-700
                    text-white
                    outline-none
                    focus:border-violet-500
                    transition
                  "
                />
              </div>

              <div>
                <label
                  className="
                    block
                    text-slate-400
                    mb-2
                  "
                >
                  Description
                </label>

                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-2xl
                    bg-slate-800
                    border
                    border-slate-700
                    text-white
                    outline-none
                    resize-none
                    focus:border-violet-500
                    transition
                  "
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="
                      block
                      text-slate-400
                      mb-2
                    "
                  >
                    Price
                  </label>

                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="
                      w-full
                      px-5
                      py-4
                      rounded-2xl
                      bg-slate-800
                      border
                      border-slate-700
                      text-white
                      outline-none
                      focus:border-violet-500
                      transition
                    "
                  />
                </div>

                <div>
                  <label
                    className="
                      block
                      text-slate-400
                      mb-2
                    "
                  >
                    Stock
                  </label>

                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="
                      w-full
                      px-5
                      py-4
                      rounded-2xl
                      bg-slate-800
                      border
                      border-slate-700
                      text-white
                      outline-none
                      focus:border-violet-500
                      transition
                    "
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="
                  w-full
                  py-4
                  rounded-2xl
                  font-semibold
                  text-white
                  bg-gradient-to-r
                  from-violet-600
                  to-blue-600
                  hover:scale-[1.02]
                  transition-all
                  shadow-lg
                "
              >
                {updateMutation.isPending ? "Updating..." : "Update Product"}
              </button>
            </form>
          </div>

          {/* Preview Card */}
          <div
            className="
              bg-slate-900/80
              backdrop-blur-xl
              border
              border-slate-800
              rounded-3xl
              p-8
              shadow-xl
            "
          >
            <h2
              className="
                text-white
                text-2xl
                font-bold
                mb-8
              "
            >
              Live Preview
            </h2>

            <div
              className="
                bg-slate-800
                rounded-3xl
                p-8
                border
                border-slate-700
              "
            >
              <div
                className="
                  flex
                  justify-between
                  items-start
                  mb-6
                "
              >
                <h3
                  className="
                    text-white
                    text-3xl
                    font-bold
                  "
                >
                  {name || "Product Name"}
                </h3>

                <span
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-violet-500/20
                    text-violet-300
                  "
                >
                  Stock: {stock || "0"}
                </span>
              </div>

              <p
                className="
                  text-slate-400
                  leading-relaxed
                  mb-8
                "
              >
                {description || "Product description will appear here..."}
              </p>

              <div
                className="
                  text-4xl
                  font-bold
                  text-green-400
                "
              >
                ₹ {price || "0"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
