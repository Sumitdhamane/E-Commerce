import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div
      className="
        w-64
        min-h-screen
        bg-slate-900
        p-6
      "
    >
      <h1
        className="
          text-white
          text-3xl
          font-bold
          mb-10
        "
      >
        Admin
      </h1>

      <div className="space-y-6">
        <Link to="/admin/dashboard" className="block text-white">
          Dashboard
        </Link>

        <Link to="/admin/products" className="block text-white">
          Products
        </Link>

        <Link to="/admin/orders" className="block text-white">
          Orders
        </Link>
        <Link to="/" className="block text-white">
          Home
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
