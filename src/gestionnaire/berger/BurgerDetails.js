import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./berger.css";
import * as Icone from "react-bootstrap-icons";

const BurgerDetails = () => {
  const { id } = useParams();
  const [burger, setBurger] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3000/burgers/" + id)
      .then((resp) => setBurger(resp.data))
      .catch((err) => console.log(err));
  }, [id]);
  const hamdleDeleteBurger = () => {
    axios.delete("http://localhost:3000/burgers/" + id).then()
  };
  const hamdleUpdateBurger = () => {};
  return (
    <div className="d-flex flex-column  justify-content-center">
      <div className="w-100 rounded   p-4">
        <div className="card card-form ">
          <img src={burger.image} className="img-thumbnail" alt={burger.nom} />
          <div className="card-body">
            <h5 className="card-title">{burger.nom}</h5>
            <p className="card-text">{burger.description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Prix: </strong> {burger.prix}F CFA
            </li>
          </ul>
          <div className="card-body">
            <button
              onClick={() => {
                hamdleDeleteBurger();
              }}
              className="btn btn-primary"
            >
              <Icone.Pencil />
            </button>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <button
              onClick={() => {
                hamdleUpdateBurger();
              }}
              className="btn btn-danger"
            >
              <Icone.Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerDetails;
