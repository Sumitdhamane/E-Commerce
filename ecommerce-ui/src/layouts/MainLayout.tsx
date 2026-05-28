import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-slate-950 min-h-screen">

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default MainLayout;