import React from "react";
import { Link } from "react-router-dom";

const Header = ({ burger }) => {
  return (
    <div>
      <header className="header">
        <Link to={"/"} className="text-decoration-none text-white">
          <h1>CINAYE BURGER</h1>
        </Link>

        <Link
          to="/"
          // onClick={() => setSelectedBurger(null)}
          className="btn btn-secondary"
        >
          {!burger.id ? "Accueil" : "Catalogue"}
        </Link>
      </header>
    </div>
  );
};

export default Header;
