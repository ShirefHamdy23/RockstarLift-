import { Image, ListGroup } from "react-bootstrap";
import profile from "../../../assets/profile.avif";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFile,
  faGears,
  faHandshake,
  faMessage,
  faQuestionCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { fetchMyProfile } from "../../../redux/action/userAction";
import { useEffect, useState } from "react";
import Loader from "../../../Loader";
import "./Sidebar.css"; // Import the custom CSS

const Sidebar = (props) => {
  const { profile, loading } = props;
  const [load, setLoad] = useState(true);
  useEffect(() => {
    props.fetchMyProfile();
  }, [props.fetchMyProfile]);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  if (loading || !profile) {
    return <Loader load={true} />;
  }
  const sideBarList = () => {
    if (path === "seller") {
      return [
        {
          name: "Dashboard",
          path: "/rockstar-lift/seller/dashboard",
          icon: faBars,
        },
        {
          name: "Properties",
          path: "rockstar-lift/seller/properties",
          icon: faFile,
        },
        {
          name: "Buyers",
          path: "rockstar-lift/seller/buyers",
          icon: faUsers,
        },
        {
          name: "Offers",
          path: "rockstar-lift/seller/offers",
          icon: faHandshake,
        },
        {
          name: "Requests",
          path: "/rockstar-lift/seller/requests",
          icon: faHandshake,
        },
        {
          name: "Message",
          path: "/rockstar-lift/seller/messages",
          icon: faMessage,
        },
      ];
    }
    if (path === "admin-dashboard") {
      return [
        {
          name: "Dashboard",
          path: "/rockstar-lift/admin-dashboard",
          icon: faBars,
        },

        {
          name: "Properties",
          path: "/rockstar-lift/admin-dashboard/properties",
          icon: faFile,
        },
        {
          name: "Offers",
          path: "/rockstar-lift/admin-dashboard/Offers",
          icon: faHandshake,
        },
        {
          name: "Requests",
          path: "/rockstar-lift/admin-dashboard/Requests",
          icon: faQuestionCircle,
        },
        {
          name: "Users",
          path: "/rockstar-lift/admin-dashboard/users",
          icon: faUsers,
        },
        {
          name: "Buyers",
          path: "/rockstar-lift/admin-dashboard/admin-buyers",
          icon: faUsers,
        },
        {
          name: "Sellers",
          path: "/rockstar-lift/admin-dashboard/sellers",
          icon: faUsers,
        },
        {
          name: "Message",
          path: "/rockstar-lift/admin-dashboard/messages",
          icon: faMessage,
        },
      ];
    }
    if (path === "Retail") {
      return [
        {
          name: "Dashboard",
          path: "/rockstar-lift/seller/dashboard",
          icon: faBars,
        },
        {
          name: "Properties",
          path: "rockstar-lift/seller/properties",
          icon: faFile,
        },
        {
          name: "Buyers",
          path: "rockstar-lift/seller/buyers",
          icon: faUsers,
        },
        {
          name: "Offers",
          path: "rockstar-lift/seller/offers",
          icon: faHandshake,
        },
        {
          name: "Requests",
          path: "/rockstar-lift/seller/requests",
          icon: faHandshake,
        },
        {
          name: "Message",
          path: "/rockstar-lift/seller/messages",
          icon: faMessage,
        },
      ];
    }
  };

  return (
    // <div className="sidebar">
    //   <div className="user_profile">
    //     <div className="image">
    //       <Image
    //         src={`http://localhost:8000/api/user/image/${profile._id}`}
    //         className="w-50"
    //         style={{
    //           width: "180px",
    //           height: "130px",
    //           borderRadius: "50%",
    //           display: "block",
    //           margin: "0px auto",
    //         }}
    //       />
    //     </div>
    //     <div className="name">
    //       {profile.firstName + " " + profile.lastName}{" "}
    //     </div>
    //   </div>
    //   <div className="menu_list">
    //     <ListGroup as="ul" className="list">
    //       {sideBarList().map((item, index) => (
    //         <ListGroup.Item as="li" key={index} className="list_item">
    //           <i className="list_item_icon">
    //             <FontAwesomeIcon icon={item.icon} />
    //           </i>
    //           <Link to={item.path}>{item.name}</Link>
    //         </ListGroup.Item>
    //       ))}
    //     </ListGroup>
    //   </div>
    // </div>
    <div className="sidebar">
      <div className="user_profile">
        <div className="image">
          <Image
            src={`http://localhost:8000/api/user/image/${profile._id}`}
            className="w-50"
            style={{
              width: "180px",
              height: "130px",
              borderRadius: "50%",
              display: "block",
              margin: "0px auto",
            }}
          />
        </div>
        <div className="name">
          {profile.firstName + " " + profile.lastName}{" "}
        </div>
      </div>
      <div className="menu_list">
        <ListGroup as="ul" className="list">
          {sideBarList().map((item, index) => (
            <ListGroup.Item as="li" key={index} className="list_item">
              <i className="list_item_icon">
                <FontAwesomeIcon icon={item.icon} />
              </i>
              <Link to={item.path}>{item.name}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  profile: state.auth.profile?.profile,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, {
  fetchMyProfile,
})(Sidebar);
