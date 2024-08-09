import React from "react";
import "./Dashboard.css";
const Dashboard = () => {
  return (
    <div className="bo">
      <h2>Ajouter un Burger</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="burgerName" className="form-label">
            Nom
          </label>
          <input
            type="text"
            className="form-control"
            id="burgerName"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="burgerPrice" className="form-label">
            Prix
          </label>
          <input
            type="number"
            className="form-control"
            id="burgerPrice"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="burgerImage" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            id="burgerImage"
            defaultValue="default_image.jpg"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="burgerDescription" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="burgerDescription"
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
