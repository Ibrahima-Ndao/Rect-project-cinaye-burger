import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./client/HomePage";
import { IndexBerger } from "./client/bergers/IndexBerger";
import Layout from "./gestionnaire/Layout";
import ListCommande from "./gestionnaire/commande/ListCommande";
import Bergers from "./gestionnaire/berger/Bergers";
import "./App.css";
import BurgerDetails from "./gestionnaire/berger/BurgerDetails";
import AddNewBurger from "./gestionnaire/berger/AddNewBurger";
import Home from "./Home";
import LayoutClient from "./client/LayoutClient";
import Statistic from "./gestionnaire/Statistic";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<LayoutClient />}>
          <Route path="/client" element={<HomePage />} />
          <Route path="/burgers/:id" element={<IndexBerger />} />
        </Route>
        <Route path="/gestionnaire" element={<Layout />}>
          <Route path="" element={<Statistic />} />
          <Route path="commandes" element={<ListCommande />} />
          <Route path="burgers" element={<Bergers />} />
          <Route path="addBurger" element={<AddNewBurger />} />
          <Route path="burgers/:id" element={<BurgerDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
