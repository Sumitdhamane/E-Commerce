import { useCart }
from "../../context/CartContext";

const Cart = () => {

  const {
    cartItems,
    removeFromCart,
  } = useCart();

  const totalPrice = cartItems.reduce(

  (total, item) =>
    total + item.price,

  0

);

  return (

    <div className="p-10 text-white">

      <h1
        className="
          text-5xl
          font-bold
          mb-10
        "
      >
        Cart
      </h1>

      {cartItems.length === 0 && (

        <h2>
          Cart is empty
        </h2>

      )}

      <div className="space-y-6">

  {cartItems.map((item) => (

    <div
      key={item.id}

      className="
        bg-slate-900
        p-6
        rounded-xl
        flex
        justify-between
        items-center
      "
    >

      <div>

        <h2 className="text-2xl">
          {item.name}
        </h2>

        <p>
          ₹ {item.price}
        </p>

      </div>

      <button

        onClick={() =>
          removeFromCart(item.id)
        }

        className="
          bg-red-500
          px-4
          py-2
          rounded-lg
        "
      >
        Remove
      </button>

    </div>

  ))}

</div>

{/* Total Price */}

<div
  className="
    mt-10
    bg-slate-900
    p-6
    rounded-xl
  "
>

  <h2
    className="
      text-3xl
      font-bold
    "
  >
    Total: ₹ {totalPrice}
  </h2>

</div>
    </div>

  );
};

export default Cart;