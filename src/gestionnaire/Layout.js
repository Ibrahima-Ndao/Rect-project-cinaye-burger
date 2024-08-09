import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Dashboard.css";

const Layout = () => {
  return (
    <div className="bo">
      <div class="navbar">
        <Link to={"/"} className="btn btn-warnig">
          Accueil
        </Link>
        <Link to={"/gestionnaire"}>
          <h1>CINAYE BURGER</h1>
        </Link>
      </div>
      <div class="container">
        <div class="sidebar">
          <Link to={"/gestionnaire/burgers"}>Burgers</Link>
          <Link to={"/gestionnaire/commandes"}>Commandes</Link>
          <Link to={"/gestionnaire"}>Statistiques</Link>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
    // <Dashboard />
  );
};

export default Layout;
