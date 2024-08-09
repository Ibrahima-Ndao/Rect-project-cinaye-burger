import { useNavigate } from "react-router-dom";
import "../HomePage.css";
import * as Icone from "react-bootstrap-icons";

export const ListBergers = ({ burgers }) => {
  const navigate = useNavigate();
  return (
    <div className="catalogue container">
      {/* <h2 className="text-center">Catalogue de Burgers</h2> */}
      <div className="row">
        {burgers.map((burger) => (
          <div key={burger.id} className="col-md-4">
            <div className="card mb-4 burger-list">
              <img
                src={burger.image}
                className="img-thumbnail"
                alt={burger.name}
              />
              <div className="card-body">
                <h5 className="card-title">{burger.name}</h5>
                <button
                  className="btn btn-info"
                  // onClick={() => onBurgerSelect(burger)}
                  onClick={() => navigate(`/burgers/${burger.id}`)}
                >
                  <Icone.Eye />
                  Plus de détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
