
const UpdateBurger = ({newBurger, setNewBurger, handleNewBurger}) => {
  return (
    <div className="container">
      <div className="section ">
        <form onSubmit={handleNewBurger}>
          <div className="mb-3">
            <label htmlFor="burgerName" className="form-label">
              Prénom et Nom
            </label>
            <input
              type="text"
              className="form-control form-select-lg"
              id="burgerName"
              required
              value={newBurger.nom}
              onChange={(e) => {
                setNewBurger({
                  ...newBurger,
                  nom: `/image/${e.target.value}.jpg`,
                });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="burgerPrice" className="form-label">
              Prix
            </label>
            <input
              type="number"
              className="form-control form-select-lg"
              id="burgerPrice"
              required
              value={newBurger.prix}
              onChange={(e) => {
                setNewBurger({ ...newBurger, prix: e.target.value });
              }}
            />
          </div>

          <div class="mb-3">
            <label for="formFileMultiple" class="form-label">
              image
            </label>
            <input
              class="form-control"
              type="file"
              id="formFileMultiple"
              multiple
              value={newBurger.image}
              onChange={(e) => {
                setNewBurger({ ...newBurger, image: e.target.value });
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="burgerDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control form-select-lg"
              id="burgerDescription"
              rows="3"
              required
              value={newBurger.description}
              onChange={(e) => {
                setNewBurger({ ...newBurger, description: e.target.value });
              }}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBurger;
