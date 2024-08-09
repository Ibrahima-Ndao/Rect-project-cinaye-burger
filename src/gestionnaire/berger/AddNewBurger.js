import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const AddNewBurger = ({ show, handleClose }) => {
  const [newBurger, setNewBurger] = useState({
    nom: "",
    prix: 0,
    image: "",
    description: "",
  });

  const handleNewBurger = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/burgers", newBurger)
      .then((resp) => {
        alert("un nouveau burger a été créé avec succès!");
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewBurger({ ...newBurger, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un Burger</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleNewBurger}>
          <Form.Group controlId="burgerName" className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrer le nom"
              required
              onChange={(e) =>
                setNewBurger({ ...newBurger, nom: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="burgerPrice" className="mb-3">
            <Form.Label>Prix</Form.Label>
            <Form.Control
              type="number"
              placeholder="Entrer le prix"
              required
              onChange={(e) =>
                setNewBurger({ ...newBurger, prix: e.target.value })
              }
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
              required
              onChange={(e) =>
                setNewBurger({ ...newBurger, description: e.target.value })
              }
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewBurger;
