import React, { useEffect, useState } from "react";
import { ListBergers } from "./bergers/ListBergers";
import axios from "axios";
import Header from "./Header";

const HomePage = () => {
  // const navigate = useNavigate();
  // const { id } = useParams();
  // const [selectedBurger, setSelectedBurger] = useState(null);
  // const [orders, setOrders] = useState([]);
  const [burgers, setBergers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/burgers")
      .then((res) => {
        setBergers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  /* const handleBurgerSelect = (burger) => {
    setSelectedBurger(burger);
  }; */

  // const handleOrderSubmit = (e) => {
  // e.preventDefault();
  /* const form = e.target;
    const order = {
      burger: selectedBurger,
      clientName: form.clientName.value,
      clientPhone: form.clientPhone.value,
      status: "En cours",
      date: moment().format("MMMM DD YYYY"),
      time: moment().format("HH mm ss"),
    };
    setOrders([...orders, order]);
    //setSelectedBurger(null);
    //form.reset();
    alert("Commande passée avec succès !");
    axios.post("http://localhost:3000/commandes", orders).then((res) => {
      console.log(res.data);
      setOrders(res.data);
      navigate("/");
    }); */
  // };

  return (
    <div className="client-home-page">
      <Header burger={burgers} />
      {/* <main>
        {!selectedBurger ? (
          <ListBergers burgers={burgers} onBurgerSelect={handleBurgerSelect} />
        ) : (
          <IndexBerger
            burger={selectedBurger}
            onOrderSubmit={handleOrderSubmit}
          />
        )}
      </main> */}
      <ListBergers burgers={burgers} />
    </div>
  );
};
export default HomePage;
