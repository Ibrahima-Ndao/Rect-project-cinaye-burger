import axios from "axios";
import React, { useEffect, useState } from "react";
import "./berger.css";
// import { useNavigate } from "react-router-dom";
import AddNewBurger from "./AddNewBurger";
import * as Icone from "react-bootstrap-icons";
import { Button, Form, Modal } from "react-bootstrap";

const Bergers = () => {
  // const navigate = useNavigate();
  const [burgers, setBurgers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBurger, setSelectedBurger] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/burgers")
      .then((res) => {
        setBurgers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteBurger = (id) => {
    axios
      .delete(`http://localhost:3000/burgers/${id}`)
      .then((res) => {
        setBurgers(burgers.filter((burger) => burger.id !== id));
        setShowDeleteModal(false);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateBurger = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/burgers/${selectedBurger.id}`, selectedBurger)
      .then((res) => {
        setBurgers(
          burgers.map((burger) =>
            burger.id === selectedBurger.id ? res.data : burger
          )
        );
        setShowUpdateModal(false);
      })
      .catch((err) => console.log(err));
  };

  const handleViewBurger = (burger) => {
    setSelectedBurger(burger);
    setShowViewModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBurger({ ...selectedBurger, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedBurger({ ...selectedBurger, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="w-100 rounded p-4">
        <Button
          variant="primary"
          className="float-end"
          onClick={() => setShowAddModal(true)}
        >
          + Add New Burger
        </Button>
        <AddNewBurger
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
        />

        <div className="catalogue container">
          <div className="row">
            {burgers.map((burger) => (
              <div key={burger.id} className="col-md-4 mb-4">
                <div className="card burger-details-gestionnaire">
                  <img
                    src={burger.image}
                    className="img-thumbnail"
                    alt={burger.nom}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{burger.nom}</h5>
                  </div>
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <Button
                      variant="info"
                      onClick={() => handleViewBurger(burger)}
                    >
                      <Icone.Eye />
                    </Button>
                    <Button
                      variant="primary"
                      className="mx-2"
                      onClick={() => {
                        setSelectedBurger(burger);
                        setShowUpdateModal(true);
                      }}
                    >
                      <Icone.Pencil />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setSelectedBurger(burger);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Icone.Trash />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBurger?.nom}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedBurger?.image}
            alt={selectedBurger?.nom}
            className="img-thumbnail mb-3"
          />
          <p>{selectedBurger?.description}</p>
          <p>Prix: {selectedBurger?.prix} €</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Burger</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateBurger}>
            <Form.Group controlId="burgerName" className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={selectedBurger?.nom}
                required
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="burgerPrice" className="mb-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                name="prix"
                value={selectedBurger?.prix}
                required
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Form.Group controlId="burgerDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={selectedBurger?.description}
                required
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Burger</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedBurger?.nom}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteBurger(selectedBurger?.id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Bergers;
