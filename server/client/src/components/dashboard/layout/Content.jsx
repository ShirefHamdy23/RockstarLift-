import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Content = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      Navigate("/rockstar-lift/login");
    }
  }, []);
  return (
    <div className="content">
      <>
        <Outlet />
      </>
    </div>
  );
};

export default Content;
