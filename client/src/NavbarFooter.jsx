import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";

const NavbarFooter = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default NavbarFooter;
