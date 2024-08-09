import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import "./ListCommande.css";

const ListCommande = () => {
  const [commandes, setCommandes] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = () => {
    axios
      .get("http://localhost:3000/commandes")
      .then((res) => setCommandes(res.data))
      .catch((err) => console.log(err));
  };

  const handleStatusChange = (id, newStatus) => {
    axios
      .put(`http://localhost:3000/commandes/${id}`, { status: newStatus })
      .then(() => {
        if (newStatus === "Annulée") {
          // Remove the command from the DOM
          setCommandes((prevCommandes) =>
            prevCommandes.filter((commande) => commande.id !== id)
          );
        } else {
          // Update status in the list of commandes
          setCommandes((prevCommandes) =>
            prevCommandes.map((commande) =>
              commande.id === id ? { ...commande, status: newStatus } : commande
            )
          );
        }
        setToastMessage(`La commande a été ${newStatus.toLowerCase()}e.`);
        setShowToast(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column justify-content-center bg-light p-4">
      <h1 className="text-center mb-4">LISTE DES COMMANDES</h1>
      {/* <div className="w-75 mx-auto rounded bg-white p-4 shadow"> */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">BURGER</th>
            <th scope="col">NOM CLIENT</th>
            <th scope="col">TÉLÉPHONE</th>
            <th scope="col">DATE COMMANDE</th>
            <th scope="col">STATUT</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((c) => (
            <tr key={c.id}>
              <td>
                <img
                  src={c.burger?.image}
                  className="img-burger img-thumbnail d-block"
                  alt={c.burger?.nom}
                />
                {c.burger?.nom}
              </td>
              <td>{c.clientName}</td>
              <td>{c.clientPhone}</td>
              <td>{c.date}</td>
              <td>{c.status}</td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    variant="outline-danger"
                    onClick={() => handleStatusChange(c.id, "Annulée")}
                    disabled={c.status === "Annulée" || c.status === "Payée"}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="outline-success"
                    onClick={() => handleStatusChange(c.id, "Payée")}
                    disabled={c.status === "Annulée" || c.status === "Payée"}
                  >
                    Payer
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleStatusChange(c.id, "Terminée")}
                    disabled={c.status === "Annulée" || c.status === "Payée"}
                  >
                    Terminer
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* </div> */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ListCommande;
