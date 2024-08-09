import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Importez les styles CSS

const Home = () => {
  const navigate = useNavigate();

  const handleClientClick = () => {
    navigate('/client'); // Redirige vers la page client
  };

  const handleGestionnaireClick = () => {
    navigate('/gestionnaire'); // Redirige vers la page gestionnaire
  };

  return (
    <div className="home-container">
      <h1>Bienvenue chez CINAYE BURGER</h1>
      <p>Choisissez votre rôle pour continuer</p>
      <div className="role-options">
        <button className="role-button" onClick={handleClientClick}>
          Je suis un Client
        </button>
        <button className="role-button" onClick={handleGestionnaireClick}>
          Je suis un Gestionnaire
        </button>
      </div>
    </div>
  );
};

export default Home;
