import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../../api/productApi";

import ProductCard from "../../components/ProductCard/ProductCard";

import type { Product } from "../../types/product";

// Fetch Products
const fetchProducts = async () => {
  const products = await getProducts();

  console.log(products);

  return products;
};
const Products = () => {
  const [search, setSearch] = useState("");

  // Query
  const {
    data = [],
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],

    queryFn: fetchProducts,

    staleTime: 1000 * 60,
  });

  // Safe Products
  const products = Array.isArray(data) ? data : [];

  // Filter Products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

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
        min-h-screen
        bg-[#030712]
        text-white
        p-10
      "
    >
      {/* Header */}
      <div className="mb-12">
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
          Premium Collection
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
          Explore
          <span
            className="
              text-violet-500
            "
          >
            {" "}
            Products
          </span>
        </h1>

        <p
          className="
            text-slate-400
            text-lg
            max-w-2xl
          "
        >
          Discover premium products with seamless shopping experience.
        </p>
      </div>

      {/* Search */}
      <div className="mb-12">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            h-16
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            px-6
            text-white
            text-lg
            outline-none
            focus:border-violet-500
            transition-all
          "
        />
      </div>

      {/* Empty */}
      {filteredProducts.length === 0 && (
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
            Try searching with another keyword.
          </p>
        </div>
      )}

      {/* Products */}
      {filteredProducts.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
