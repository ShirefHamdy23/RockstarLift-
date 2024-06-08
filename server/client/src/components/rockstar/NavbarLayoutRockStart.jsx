import { Outlet } from "react-router-dom";
import RockStartNavigation from "./RockStartNavigation";
import Footer from "../layout/Footer";

const NavbarLayoutRockStart = () => {
  return (
    <div>
      <RockStartNavigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default NavbarLayoutRockStart;
