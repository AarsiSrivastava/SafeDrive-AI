
import {
  FaHome,
  FaVideo,
  FaExclamationTriangle,
  FaChartBar,
  FaHistory,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "calc(100vh - 70px)",
        background: "#111827",
        color: "white",
        padding: "25px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>Menu</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        <div><FaHome /> Dashboard</div>
        <div><FaVideo /> Live Detection</div>
        <div><FaExclamationTriangle /> Alerts</div>
        <div><FaChartBar /> Analytics</div>
        <div><FaHistory /> Trip Logs</div>
        <div><FaCog /> Settings</div>
      </div>
    </div>
  );
}

export default Sidebar;