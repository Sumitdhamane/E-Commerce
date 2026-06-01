import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import API from "../../api/axios";

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateProductModal = ({ isOpen, onClose }: CreateProductModalProps) => {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const createMutation = useMutation({
    mutationFn: async () =>
      await API.post("/admin/products", {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      onClose();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4 py-6 sm:px-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[calc(100vh-120px)] overflow-hidden rounded-4xl border border-slate-800 bg-[#111827] shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full flex-col gap-4 p-4 sm:p-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Add New Product
                </h2>
                <p className="text-slate-400">
                  Create a product without leaving the admin products page.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 overflow-y-auto max-h-[calc(100vh-240px)] pr-2"
          >
            {createMutation.isError && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300">
                Failed to create product.
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="w-full rounded-2xl border border-slate-800 bg-[#0B1220] px-5 py-4 text-white outline-none transition focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Product Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write product description..."
                className="w-full rounded-2xl border border-slate-800 bg-[#0B1220] px-5 py-4 text-white outline-none transition focus:border-violet-500 resize-none"
                rows={5}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Product Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-2xl border border-slate-800 bg-[#0B1220] px-4 py-4 pl-12 text-white outline-none transition focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Available Stock
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter stock"
                  className="w-full rounded-2xl border border-slate-800 bg-[#0B1220] px-5 py-4 text-white outline-none transition focus:border-violet-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-400">
                Product will be visible instantly after successful creation.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-14 rounded-2xl bg-slate-800 px-6 font-medium text-slate-200 transition hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="h-14 rounded-2xl bg-violet-600 px-8 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
                >
                  {createMutation.isPending ? "Creating..." : "Create Product"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
