/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, Component } from "react";
import { useLocation, Route, Switch, useHistory } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes/routes.js";

import sidebarImage from "assets/img/sidebar-3.jpg";
import Dashboard from "views/Dashboard";

function Admin() {
  const navigate = useHistory();

  // I think not needed, since I gate access in routing. But to be safe
  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (!token) {
      console.log("No login token found. Redirecting to login page.");
      navigate.push("/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="wrapper">
        {/* <Sidebar color={color} image={hasImage ? image : ""} routes={routes} /> */}
        <div className="main-panel">
          <AdminNavbar />
          <div className="content">
            <Dashboard/>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
