import { Link } from "react-router-dom";

import type { Product }
from "../../types/product";

import { useCart }
from "../../context/CartContext";

import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({
  product,
}: ProductCardProps) => {

  const { addToCart } = useCart();

  return (

    <Link
      to={`/products/${product.id}`}
      className="block"
    >

      <div className="product-card">

        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <h3>₹ {product.price}</h3>

        <span>
          Stock: {product.stock}
        </span>

        <button
          className="buy-btn"

          onClick={(e) => {

            e.preventDefault();

            addToCart(product);

          }}
        >
          Add To Cart
        </button>

      </div>

    </Link>

  );
};

export default ProductCard;