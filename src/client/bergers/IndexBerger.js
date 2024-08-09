import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../HomePage.css";
import moment from "moment";
import Header from "../Header";

export const IndexBerger = () => {
  const [burger, setBurger] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/burgers/" + id)
      .then((res) => {
        setBurger(res.data);
        setCommande((prevCommande) => ({
          ...prevCommande,
          burger: res.data,
        }));
      })
      .catch((err) => console.log(err));
  }, [id]);

  const [commande, setCommande] = useState({
    burger: {},
    clientName: "",
    clientPhone: "",
    status: "En cours",
    date: moment().format("MMMM DD YYYY"),
    time: moment().format("HH mm ss"),
  });

  const handleCommande = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/commandes/", commande)
      .then((res) => navigate("/client"));
    alert("Commande réussie!");
  };

  return (
    <>
      <Header burger={burger} />
      <div className="client-home-page container w-50">
        <div className="burger-details">
          <h2 className="text-warning text-center">Détails du Burger</h2>
          <div className="card">
            <img
              src={burger.image}
              className="img-thumbnail rounded card-img-top"
              alt={burger.name}
            />
            <div className="card-body">
              <h5 className="card-title">{burger.nom}</h5>
              <p className="card-text text-success-emphasis">
                {burger.description}
              </p>
              <p className="card-text">Prix: {burger.prix}F cfa</p>
            </div>
          </div>
          <h3 className="text-warning text-center">Commander ce Burger</h3>
          <form onSubmit={handleCommande}>
            <div className="mb-3">
              <label htmlFor="clientName" className="form-label">
                Prénom et Nom
              </label>
              <input
                type="text"
                className="form-control"
                id="clientName"
                name="clientName"
                required
                onChange={(e) =>
                  setCommande({ ...commande, clientName: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clientPhone" className="form-label">
                Téléphone
              </label>
              <input
                type="tel"
                className="form-control"
                id="clientPhone"
                name="clientPhone"
                required
                onChange={(e) =>
                  setCommande({ ...commande, clientPhone: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Commander
            </button>
            <button
              onClick={() => navigate("/client")}
              className="btn btn-warning float-end"
            >
              Back
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
