import { useState } from "react";

import {
  useQuery,
} from "@tanstack/react-query";

import { getProducts }
from "../../api/productApi";

import ProductCard
from "../../components/ProductCard/ProductCard";

import type { Product }
from "../../types/product";

// Fetch Products Function
const fetchProducts =
  async () => {

    const response =
      await getProducts();
 console.log(response);
    return response;
   
};

const Products = () => {

  const [search, setSearch] =
    useState("");

  // TanStack Query
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({

    queryKey: ["products"],

    queryFn: fetchProducts,

    staleTime: 1000 * 60,

  });

  // Filter Products
  const filteredProducts =
    products?.filter((product) =>

      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

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
        Loading products...
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
        Failed to load products
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
        Products
      </h1>

      {/* Search */}
      <div className="mb-10">

        <input

          type="text"

          placeholder="Search products..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          className="
            w-full
            p-4
            rounded-xl
            bg-slate-800
            text-white
            border
            border-slate-700
            outline-none
            focus:border-violet-500
          "
        />

      </div>

      {/* Empty State */}
      {filteredProducts?.length === 0 && (

        <h2
          className="
            text-white
            text-2xl
            mb-10
          "
        >
          No products found
        </h2>

      )}

      {/* Product Grid */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
      >

        {Array.isArray(
          filteredProducts
        ) &&

          filteredProducts.map(
            (product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            )
          )}

      </div>

    </div>

  );
};

export default Products;