import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProductById,
} from "../../api/productApi";

import API from "../../api/axios";

import AdminSidebar
from "../../components/AdminSidebar/AdminSidebar";

const EditProduct = () => {

  const navigate =
    useNavigate();

  const queryClient =
    useQueryClient();

  const { id } =
    useParams();

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

  // Fetch Product
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({

    queryKey: ["product", id],

    queryFn: () =>
      getProductById(id!),

  });

  // Prefill Form
  useEffect(() => {

    if (!product) return;

    setName(product.name);

    setDescription(
      product.description
    );

    setPrice(
      String(product.price)
    );

    setStock(
      String(product.stock)
    );

  }, [product]);

  // Update Product
  const updateMutation =
    useMutation({

      mutationFn:
        async () => {

          return await API.put(
            `/admin/products/${id}`,
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

        queryClient.invalidateQueries({

          queryKey: ["product", id],

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

      updateMutation.mutate();

    };

  // Loading
  if (isLoading) {

    return (

      <h1 className="text-white p-10">
        Loading...
      </h1>

    );

  }

  // Error
  if (error || !product) {

    return (

      <h1 className="text-red-500 p-10">
        Failed to load product
      </h1>

    );

  }

  return (

    <div className="flex">

      <AdminSidebar />

      <div className="flex-1 p-10">

        <h1
          className="
            text-white
            text-5xl
            font-bold
            mb-10
          "
        >
          Edit Product
        </h1>

        {updateMutation.isError && (

          <p className="text-red-500 mb-6">
            Failed to update product
          </p>

        )}

        <form
          onSubmit={handleSubmit}

          className="
            max-w-2xl
            space-y-6
          "
        >

          <input

            type="text"

            value={name}

            onChange={(e) =>
              setName(
                e.target.value
              )
            }

            placeholder="Product Name"

            className="
              w-full
              p-4
              rounded-xl
              bg-slate-900
              text-white
              outline-none
            "
          />

          <textarea

            value={description}

            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }

            placeholder="Description"

            className="
              w-full
              h-40
              p-4
              rounded-xl
              bg-slate-900
              text-white
              outline-none
            "
          />

          <input

            type="number"

            value={price}

            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }

            placeholder="Price"

            className="
              w-full
              p-4
              rounded-xl
              bg-slate-900
              text-white
              outline-none
            "
          />

          <input

            type="number"

            value={stock}

            onChange={(e) =>
              setStock(
                e.target.value
              )
            }

            placeholder="Stock"

            className="
              w-full
              p-4
              rounded-xl
              bg-slate-900
              text-white
              outline-none
            "
          />

          <button

            type="submit"

            disabled={
              updateMutation.isPending
            }

            className="
              bg-blue-600
              hover:bg-blue-700
              transition
              px-8
              py-4
              rounded-xl
              text-white
              font-bold
            "
          >

            {updateMutation.isPending
              ? "Updating..."
              : "Update Product"}

          </button>

        </form>

      </div>

    </div>

  );

};

export default EditProduct;