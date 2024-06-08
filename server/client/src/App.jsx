// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";

import "./app.css";
// Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import NavbarFooter from "./NavbarFooter";
import Layout from "./components/dashboard/layout/Layout";
import Create from "./components/dashboard/Properties/Create";
import Buyers from "./components/dashboard/buyers/Buyers";
import Services from "./components/Service/Services";
import Privacy from "./components/Privacy/Privacy";
import Contact from "./components/Contact/Contact";
import Offer from "./components/dashboard/offers/Offer";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/dashboard/Homepage/Dashboard";
import Profile from "./components/Profile/Profile";
import PropertyPage from "./components/Property/PropertyPage";
import Property from "./components/dashboard/Properties/Property";
import PropertyDescription from "./components/Property/PropertyDescription";
import Footer from "./components/layout/Footer";
import PropertyView from "./components/dashboard/Properties/PropertyView";
import AdminDashboard from "./components/Admin Dashboard/AdminDashboard";
import Users from "./components/Admin Dashboard/Users";
import Sellers from "./components/Admin Dashboard/Sellers";
import AdminBuyers from "./components/Admin Dashboard/Buyers";
import "leaflet/dist/leaflet.css";
import { Provider } from "react-redux";
import store from "./store";
import ProfilePage from "./components/Settings/Profile/ProfilePage";
import DisplayOffers from "./components/Settings/Display/DisplayOffers";
import DisplayRequests from "./components/Settings/Display/DisplayRequests";
import DisplayMsgs from "./components/Settings/Display/DisplayMsgs";
import CostCalculatorPage from "./components/Service/CostCalculate/CostCalculatorPage";
import UpdateSellerProperty from "./components/dashboard/Properties/UpdateSellerProperty";
import RockStarLift from "./components/rockstar/RockStarLift";
import Message from "./components/Messages/Message";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = "RockStarCallers";
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <Provider store={store}>
      <div className="app">
        <RockStarLift />
        <Routes>
          <Route exact element={<NavbarFooter />}>
            {/* <Route exact path="/msg" element={<Message />} /> */}

            <Route exact path="/" element={<Landing />} />
            <Route exact path="/service" element={<Services />} />
            <Route
              exact
              path="/services/cost"
              element={<CostCalculatorPage />}
            />
            <Route exact path="/privacy" element={<Privacy />} />
            <Route exact path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
