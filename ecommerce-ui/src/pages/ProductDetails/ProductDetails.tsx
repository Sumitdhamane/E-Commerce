

import { useParams } from "react-router-dom";

import { getProductById }
from "../../api/productApi";



import {useQuery} from "@tanstack/react-query";


const fetchProduct =
  async (
    id: string
  ) => {

     return await getProductById(id);

    
};

const ProductDetails = () => {

  const { id } = useParams();

  // const [product, setProduct] =
  //   useState<Product | null>(null);

  // const [loading, setLoading] =
  //   useState(true);

  // const [error, setError] =
  //   useState("");

  // useEffect(() => {

  //   const fetchProduct = async () => {

  //     try {

  //       setLoading(true);

  //       if (!id) return;

  //       const data =
  //         await getProductById(id);

  //       setProduct(data);

  //     } catch (error) {

  //       console.log(error);

  //       setError(
  //         "Failed to fetch product"
  //       );

  //     } finally {

  //       setLoading(false);

  //     }

  //   };

  //   fetchProduct();

  // }, [id]);

  const {
  data: product,
  isLoading,
  error,
} = useQuery({

  queryKey: ["product", id],

  queryFn: () =>
    fetchProduct(id!),

  staleTime: 1000 * 60,

});

  // Loading State
  if (isLoading) {
    return (
      <h1 className="text-white text-3xl p-10">
        Loading product...
      </h1>
    );
  }

  // Error State
  if (error) {
    return (
      <h1 className="text-red-500 text-3xl p-10">
        Failed to load product
      </h1>
    );
  }

  // No Product
  if (!product) {
    return (
      <h1 className="text-white text-3xl p-10">
        Product not found
      </h1>
    );
  }

  return (

    <div
      className="
        text-white
        p-10
      "
    >

      <div
        className="
          bg-slate-900
          rounded-2xl
          p-10
        "
      >

        <h1
          className="
            text-5xl
            font-bold
            mb-6
          "
        >
          {product.name}
        </h1>

        <p
          className="
            text-slate-300
            text-xl
            mb-6
          "
        >
          {product.description}
        </p>

        <h2
          className="
            text-violet-400
            text-4xl
            font-bold
            mb-6
          "
        >
          ₹ {product.price}
        </h2>

        <p className="text-lg">
          Stock: {product.stock}
        </p>

      </div>

    </div>

  );
};

export default ProductDetails;