import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import API from "../../api/axios";

import AdminSidebar
from "../../components/AdminSidebar/AdminSidebar";

const CreateProduct = () => {

  const navigate =
    useNavigate();

  const queryClient =
    useQueryClient();

  const [name, setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  // Create Mutation
  const createMutation =
    useMutation({

      mutationFn:
        async () => {

          return await API.post(
            "/admin/products",
            {
              name,
              description,

              price:
                Number(price),

              stock:
                Number(stock),
            }
          );

        },

      onSuccess: () => {

        queryClient.invalidateQueries({

          queryKey: ["products"],

        });

        navigate(
          "/admin/products"
        );

      },

    });

  // Submit
  const handleSubmit =
    (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      createMutation.mutate();

    };

  return (

    <div
      className="
        flex
        min-h-screen
        bg-[#030712]
        text-white
        overflow-hidden
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
            gap-8
            mb-10
          "
        >

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-violet-500/10
                border
                border-violet-500/20
                px-4
                py-2
                rounded-full
                text-violet-400
                text-sm
                font-medium
                mb-5
              "
            >
              Ecommerce Admin Panel
            </div>

            <h1
              className="
                text-5xl
                lg:text-6xl
                font-black
                tracking-tight
                mb-4
              "
            >
              Create
              <span
                className="
                  text-violet-500
                "
              >
                {" "}Product
              </span>
            </h1>

            <p
              className="
                text-slate-400
                text-lg
                max-w-2xl
                leading-relaxed
              "
            >
              Add new inventory products with
              pricing, stock management,
              and product details.
            </p>

          </div>

        </div>

        {/* Form Card */}
        <div
          className="
            max-w-5xl
            bg-[#111827]
            border
            border-slate-800
            rounded-4xl
            overflow-hidden
            shadow-2xl
            shadow-black/30
          "
        >

          {/* Top */}
          <div
            className="
              px-8
              py-7
              border-b
              border-slate-800
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                mb-2
              "
            >
              Product Information
            </h2>

            <p
              className="
                text-slate-400
              "
            >
              Fill product details carefully
              before publishing.
            </p>

          </div>

          {/* Form */}
          <form

            onSubmit={handleSubmit}

            className="
              p-8
              space-y-8
            "
          >

            {/* Error */}
            {createMutation.isError && (

              <div
                className="
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-400
                  px-5
                  py-4
                  rounded-2xl
                "
              >
                Failed to create product
              </div>

            )}

            {/* Product Name */}
            <div>

              <label
                className="
                  block
                  text-sm
                  font-medium
                  text-slate-300
                  mb-3
                "
              >
                Product Name
              </label>

              <input

                type="text"

                placeholder="Enter product name"

                value={name}

                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }

                className="
                  w-full
                  h-14
                  px-5
                  rounded-2xl
                  bg-[#0B1220]
                  border
                  border-slate-800
                  outline-none
                  focus:border-violet-500
                  transition
                  text-white
                "
              />

            </div>

            {/* Description */}
            <div>

              <label
                className="
                  block
                  text-sm
                  font-medium
                  text-slate-300
                  mb-3
                "
              >
                Product Description
              </label>

              <textarea

                placeholder="Write product description..."

                value={description}

                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }

                className="
                  w-full
                  h-40
                  p-5
                  rounded-2xl
                  bg-[#0B1220]
                  border
                  border-slate-800
                  outline-none
                  focus:border-violet-500
                  transition
                  text-white
                  resize-none
                "
              />

            </div>

            {/* Price + Stock */}
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              "
            >

              {/* Price */}
              <div>

                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-slate-300
                    mb-3
                  "
                >
                  Product Price
                </label>

                <div
                  className="
                    relative
                  "
                >

                  <span
                    className="
                      absolute
                      left-5
                      top-1/2
                      -translate-y-1/2
                      text-slate-500
                    "
                  >
                    ₹
                  </span>

                  <input

                    type="number"

                    placeholder="0.00"

                    value={price}

                    onChange={(e) =>
                      setPrice(
                        e.target.value
                      )
                    }

                    className="
                      w-full
                      h-14
                      pl-10
                      pr-5
                      rounded-2xl
                      bg-[#0B1220]
                      border
                      border-slate-800
                      outline-none
                      focus:border-violet-500
                      transition
                      text-white
                    "
                  />

                </div>

              </div>

              {/* Stock */}
              <div>

                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-slate-300
                    mb-3
                  "
                >
                  Available Stock
                </label>

                <input

                  type="number"

                  placeholder="Enter stock"

                  value={stock}

                  onChange={(e) =>
                    setStock(
                      e.target.value
                    )
                  }

                  className="
                    w-full
                    h-14
                    px-5
                    rounded-2xl
                    bg-[#0B1220]
                    border
                    border-slate-800
                    outline-none
                    focus:border-violet-500
                    transition
                    text-white
                  "
                />

              </div>

            </div>

            {/* Bottom */}
            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-6
                pt-4
              "
            >

              <p
                className="
                  text-slate-500
                  text-sm
                "
              >
                Product will be visible
                instantly after successful
                creation.
              </p>

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                {/* Cancel */}
                <button

                  type="button"

                  onClick={() =>
                    navigate(
                      "/admin/products"
                    )
                  }

                  className="
                    h-14
                    px-6
                    rounded-2xl
                    bg-slate-800
                    hover:bg-slate-700
                    transition
                    font-medium
                  "
                >
                  Cancel
                </button>

                {/* Submit */}
                <button

                  type="submit"

                  disabled={
                    createMutation.isPending
                  }

                  className="
                    h-14
                    px-8
                    rounded-2xl
                    bg-violet-600
                    hover:bg-violet-700
                    transition-all
                    font-semibold
                    shadow-lg
                    shadow-violet-500/20
                    disabled:opacity-50
                  "
                >

                  {createMutation.isPending
                    ? "Creating..."
                    : "Create Product"}

                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

};

export default CreateProduct;