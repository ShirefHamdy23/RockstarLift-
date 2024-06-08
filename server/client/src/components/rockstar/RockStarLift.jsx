import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Layout from "../dashboard/layout/Layout";
import Property from "../dashboard/Properties/Property";
import Create from "../dashboard/Properties/Create";
import PropertyView from "../dashboard/Properties/PropertyView";
import UpdateSellerProperty from "../dashboard/Properties/UpdateSellerProperty";
import Buyers from "../dashboard/buyers/Buyers";
import Offer from "../dashboard/offers/Offer";
import Dashboard from "../dashboard/Homepage/Dashboard";
import AdminDashboard from "../Admin Dashboard/AdminDashboard";
import Users from "../Admin Dashboard/Users";
import Sellers from "../Admin Dashboard/Sellers";
import Profile from "../Profile/Profile";
import ProfilePage from "../Settings/Profile/ProfilePage";
import DisplayOffers from "../Settings/Display/DisplayOffers";
import DisplayMsgs from "../Settings/Display/DisplayMsgs";
import DisplayRequests from "../Settings/Display/DisplayRequests";
import PropertyPage from "../Property/PropertyPage";
import PropertyDescription from "../Property/PropertyDescription";
import AdminBuyers from "../Admin Dashboard/Buyers";
import RockStarLanding from "./RockStarLanding";
import NavbarLayoutRockStart from "./NavbarLayoutRockStart";
import { useEffect } from "react";
import Message from "../dashboard/messages/Message";
import MarketingCampaign from "../dashboard/Properties/MarketingCampaign";
import OfferForProperty from "../dashboard/Properties/OfferForProperty";
import Request from "../dashboard/Request/Request";
const RockStarLift = () => {
  useEffect(() => {
    document.title = "RockStarLift";
  }, []);
  return (
    <div>
      <div className="app">
        <Routes>
          <Route exact element={<NavbarLayoutRockStart />}>
            <Route exact path="/rockstar-lift" element={<RockStarLanding />} />
            <Route exact path="/rockstar-lift/login" element={<Login />} />
            <Route
              exact
              path="/rockstar-lift/register"
              element={<Register />}
            />
            <Route
              exact
              path="/rockstar-lift/properties"
              element={<PropertyPage />}
            />
            <Route
              exact
              path="/rockstar-lift/properties/:id"
              element={<PropertyDescription />}
            />
            <Route
              path="/rockstar-lift/user/profile"
              element={<ProfilePage />}
            />
            <Route
              path="/rockstar-lift/Show/my-offers"
              element={<DisplayOffers />}
            />
            <Route
              path="/rockstar-lift/Show/my-requests"
              element={<DisplayRequests />}
            />
            <Route
              path="/rockstar-lift/Show/my-messages"
              element={<DisplayMsgs />}
            />
          </Route>

          {/* <>{============================================================}</> */}
          {/* <Route exact element={<NavbarLayoutRockStart />}></Route> */}

          <Route element={<Layout />}>
            <Route
              exact
              path="/rockstar-lift/seller/properties"
              element={<Property />}
            />
            <Route path="/rockstar-lift/seller/buyers" element={<Buyers />} />
            <Route path="/rockstar-lift/seller/offers" element={<Offer />} />
            <Route
              path="/rockstar-lift/seller/messages"
              element={<Message />}
            />
            <Route
              path="/rockstar-lift/seller/requests"
              element={<Request />}
            />
            <Route
              path="/rockstar-lift/seller/properties/create"
              element={<Create />}
            />
            <Route
              exact
              path="/rockstar-lift/seller/properties/:id"
              element={<PropertyView />}
            />
            <Route
              exact
              path="/seller/property/edit/:id"
              element={<UpdateSellerProperty />}
            />
            <Route
              exact
              path="/rockstar-lift/seller/properties/:id/campaign"
              element={<MarketingCampaign />}
            />
            <Route
              exact
              path="/rockstar-lift/seller/properties/:id/offers"
              element={<OfferForProperty />}
            />
            <Route
              path="/rockstar-lift/seller/dashboard"
              element={<Dashboard />}
            />
            {/* <>{============================================================}</> */}
            <Route
              path="/rockstar-lift/admin-dashboard"
              element={<AdminDashboard />}
            />
            <Route
              exact
              path="/rockstar-lift/admin-dashboard/properties"
              element={<Property />}
            />
            <Route
              path="/rockstar-lift/admin-dashboard/buyers"
              element={<Buyers />}
            />
            <Route
              path="/rockstar-lift/admin-dashboard/offers"
              element={<Offer />}
            />
            <Route
              path="/rockstar-lift/admin-dashboard/requests"
              element={<Request />}
            />
            <Route
              path="/rockstar-lift/admin-dashboard/properties/create"
              element={<Create />}
            />
            <Route
              exact
              path="/rockstar-lift/admin-dashboard/properties/:id"
              element={<PropertyView />}
            />
            <Route
              path="/rockstar-lift/admin-dashboard/messages"
              element={<Message />}
            />
            <Route
              exact
              path="/rockstar-lift/admin-dashboard/property/edit/:id"
              element={<UpdateSellerProperty />}
            />
            <Route
              exact
              path="/rockstar-lift/admin-dashboard/properties/:id/campaign"
              element={<MarketingCampaign />}
            />
            <Route
              exact
              path="/rockstar-lift/admin-dashboard/properties/:id/offers"
              element={<OfferForProperty />}
            />
            <Route
              path="/rockstar-lift/admin-dashboard/users"
              element={<Users />}
            />
            <Route
              path="/rockstar-lift/admin-dashboard/admin-buyers"
              element={<AdminBuyers />}
            />
            <Route
              path="/rockstar-lift/admin-dashboard/sellers"
              element={<Sellers />}
            />
            <Route
              path="/rockstar-lift/admin-dashboard/profile"
              element={<ProfilePage />}
            />
            {/* <>{============================================================}</> */}
            <Route path="/rockstar-lift/Retail" element={<AdminDashboard />} />
            <Route
              exact
              path="/rockstar-lift/Retail/properties"
              element={<Property />}
            />
            <Route path="/rockstar-lift/Retail/buyers" element={<Buyers />} />
            <Route path="/rockstar-lift/Retail/offers" element={<Offer />} />
            <Route
              path="/rockstar-lift/Retail/requests"
              element={<Request />}
            />
            <Route
              path="/rockstar-lift/Retail/properties/create"
              element={<Create />}
            />
            <Route
              exact
              path="/rockstar-lift/Retail/properties/:id"
              element={<PropertyView />}
            />
            <Route
              path="/rockstar-lift/Retail/messages"
              element={<Message />}
            />
            <Route
              exact
              path="/Retail/property/edit/:id"
              element={<UpdateSellerProperty />}
            />
            <Route
              exact
              path="/rockstar-lift/Retail/properties/:id/campaign"
              element={<MarketingCampaign />}
            />
            <Route
              exact
              path="/rockstar-lift/Retail/properties/:id/offers"
              element={<OfferForProperty />}
            />

            <Route
              path="/rockstar-lift/Retail/profile"
              element={<ProfilePage />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default RockStarLift;
