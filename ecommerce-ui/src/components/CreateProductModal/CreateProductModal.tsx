import {
useState,
useEffect,
type FormEvent,
} from "react";

import {
useMutation,
useQueryClient,
} from "@tanstack/react-query";

import API from "../../api/axios";

type CreateProductModalProps = {
isOpen: boolean;
onClose: () => void;
};

const CreateProductModal = ({
isOpen,
onClose,
}: CreateProductModalProps) => {

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

useEffect(() => {


const handleEsc = (
  e: KeyboardEvent
) => {

  if (
    e.key === "Escape"
  ) {

    onClose();

  }

};

window.addEventListener(
  "keydown",
  handleEsc
);

return () =>
  window.removeEventListener(
    "keydown",
    handleEsc
  );


}, [onClose]);

const createMutation =
useMutation({


  mutationFn: async () => {

    return await API.post(
      "/admin/products",
      {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
      }
    );

  },

  onSuccess: () => {

    queryClient.invalidateQueries({
      queryKey: ["products"],
    });

    setName("");
    setDescription("");
    setPrice("");
    setStock("");

    onClose();

  },

});


const handleSubmit = (
e: FormEvent<HTMLFormElement>
) => {


e.preventDefault();

if (
  !name.trim() ||
  !description.trim() ||
  !price ||
  !stock
) {

  alert(
    "Please fill all fields"
  );

  return;

}

createMutation.mutate();


};

if (!isOpen) {


return null;


}

return (


<div
  className="
    fixed
    inset-0
    z-50
    flex
    items-center
    justify-center
    bg-black/70
    backdrop-blur-sm
    p-4
  "
  onClick={() => {

    if (
      !createMutation.isPending
    ) {

      onClose();

    }

  }}
>

  <div
    className="
      w-full
      max-w-2xl
      rounded-3xl
      border
      border-slate-800
      bg-slate-900
      shadow-2xl
    "
    onClick={(e) =>
      e.stopPropagation()
    }
  >

    <div
      className="
        flex
        items-center
        justify-between
        border-b
        border-slate-800
        p-6
      "
    >

      <div>

        <h2
          className="
            text-3xl
            font-bold
            text-white
          "
        >
          Create Product
        </h2>

        <p
          className="
            mt-1
            text-slate-400
          "
        >
          Add a new product to
          your store
        </p>

      </div>

      <button
        onClick={onClose}
        className="
          h-10
          w-10
          rounded-xl
          bg-slate-800
          text-slate-300
          hover:bg-slate-700
        "
      >
        ✕
      </button>

    </div>

    <form
      onSubmit={handleSubmit}
      className="
        space-y-5
        p-6
      "
    >

      {createMutation.isError && (

        <div
          className="
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            p-4
            text-red-300
          "
        >
          Failed to create product.
        </div>

      )}

      <div>

        <label
          className="
            mb-2
            block
            text-sm
            text-slate-300
          "
        >
          Product Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          placeholder="Enter product name"
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-800
            px-4
            py-3
            text-white
            outline-none
            focus:border-violet-500
          "
        />

      </div>

      <div>

        <label
          className="
            mb-2
            block
            text-sm
            text-slate-300
          "
        >
          Description
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Enter product description"
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-800
            px-4
            py-3
            text-white
            outline-none
            focus:border-violet-500
          "
        />

      </div>

      <div
        className="
          grid
          gap-5
          md:grid-cols-2
        "
      >

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              text-slate-300
            "
          >
            Price
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-white
              outline-none
              focus:border-violet-500
            "
          />

        </div>

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              text-slate-300
            "
          >
            Stock
          </label>

          <input
            type="number"
            value={stock}
            onChange={(e) =>
              setStock(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-white
              outline-none
              focus:border-violet-500
            "
          />

        </div>

      </div>

      <div
        className="
          flex
          justify-end
          gap-3
          pt-4
        "
      >

        <button
          type="button"
          onClick={onClose}
          className="
            rounded-xl
            bg-slate-800
            px-6
            py-3
            text-white
            hover:bg-slate-700
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            createMutation.isPending
          }
          className="
            rounded-xl
            bg-violet-600
            px-6
            py-3
            font-semibold
            text-white
            hover:bg-violet-700
            disabled:opacity-50
          "
        >
          {createMutation.isPending
            ? "Creating..."
            : "Create Product"}
        </button>

      </div>

    </form>

  </div>

</div>


);

};

export default CreateProductModal;
