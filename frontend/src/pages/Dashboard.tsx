import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SpeedCard from "../components/SpeedCard";
import RiskCard from "../components/RiskCard";
import AlertCard from "../components/AlertCard";
import CameraFeed from "../components/CameraFeed";
function Dashboard() {
  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          background: "#0f172a",
          color: "white",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <Sidebar />

        <div style={{ flex: 1, padding: "30px" }}>
          <h1>SafeDrive AI Dashboard</h1>

          <p>AI-powered Driver Assistance & Collision Prevention System</p>
          <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "30px",
  }}
>
  <SpeedCard />
  <RiskCard />
  <AlertCard />
</div>

<CameraFeed />
        </div>
      </div>
    </>
  );
}

export default Dashboard;