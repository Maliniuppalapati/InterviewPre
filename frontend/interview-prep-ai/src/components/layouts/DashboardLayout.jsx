import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar"; // Assuming Navbar is in components

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar />
      {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
