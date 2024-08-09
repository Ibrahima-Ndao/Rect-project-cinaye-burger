import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Statistic = () => {
  const [stats, setStats] = useState({
    commandesEnCours: 0,
    commandesValidees: 0,
    commandesTerminees: 0,
    commandesAnnulees: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      // Fetch data from the endpoints
      const [commandesRes] = await Promise.all([
        axios.get("http://localhost:3000/commandes"),
      ]);

      const commandes = commandesRes.data;

      // Process statistics
      const enCours = commandes.filter(
        (cmd) => cmd.status === "En cours"
      ).length;
      const validees = commandes.filter((cmd) => cmd.status === "Payée").length;
      const terminees = commandes.filter(
        (cmd) => cmd.status === "Terminée"
      ).length;
      const annulees = commandes.filter(
        (cmd) => cmd.status === "Annulée"
      ).length;

      setStats({
        commandesEnCours: enCours,
        commandesValidees: validees,
        commandesTerminees: terminees,
        commandesAnnulees: annulees,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Chart Data Configurations
  const barChartData = {
    labels: [
      "Commandes en Cours",
      "Commandes Payée",
      "Commandes Terminées",
      "Commandes Annulées",
    ],
    datasets: [
      {
        label: "Nombre de Commandes",
        data: [
          stats.commandesEnCours,
          stats.commandesValidees,
          stats.commandesTerminees,
          stats.commandesAnnulees,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0", "#FFCE56"],
        borderColor: ["#FF6384", "#36A2EB", "#4BC0C0", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["Commandes"],
    datasets: [
      {
        label: "Nombre Total de Commandes",
        data: [
          stats.commandesEnCours +
            stats.commandesValidees +
            stats.commandesTerminees +
            stats.commandesAnnulees,
        ],
        borderColor: "#4BC0C0",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const doughnutChartData = {
    labels: [
      "Commandes en Cours",
      "Commandes Payée",
      "Commandes Terminées",
      "Commandes Annulées",
    ],
    datasets: [
      {
        data: [
          stats.commandesEnCours,
          stats.commandesValidees,
          stats.commandesTerminees,
          stats.commandesAnnulees,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0", "#FFCE56"],
        borderColor: ["#FFFFFF"],
        borderWidth: 2,
      },
    ],
  };

  const pieChartData = {
    labels: ["Commandes payée", "Commandes Terminées", "Commandes Annulées"],
    datasets: [
      {
        data: [
          stats.commandesValidees,
          stats.commandesTerminees,
          stats.commandesAnnulees,
        ],
        backgroundColor: ["#36A2EB", "#4BC0C0", "#FFCE56"],
        borderColor: ["#FFFFFF"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="statistic-container">
      <h3 className="text-center mb-4">Statistiques</h3>
      <div className="chart-grid">
        <div class="container text-center">
          <div class="row row-cols-2">
            <div class="col">
              <div className="chart-item">
                <h4>Distribution des Commandes</h4>
                <Bar
                  data={barChartData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "top" } },
                  }}
                />
              </div>
            </div>
            <div class="col">
              <div className="chart-item">
                <h4>Total des Commandes</h4>
                <Line
                  data={lineChartData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "top" } },
                  }}
                />
              </div>
              <hr />
            </div>

            <div class="col">
              <div className="chart-item">
                <h4>Distribution des Commandes</h4>
                <Doughnut
                  data={doughnutChartData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "top" } },
                  }}
                />
              </div>
            </div>
            <div class="col">
              <div className="chart-item">
                <h4>Répartition des Commandes</h4>
                <Pie
                  data={pieChartData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "top" } },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
