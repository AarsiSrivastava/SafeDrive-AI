
function Navbar() {
  return (
    <nav
      style={{
        height: "70px",
        background: "#111827",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "1px solid #1f2937",
      }}
    >
      <h2>🚗 SafeDrive AI</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <span>Dashboard</span>
        <span>Analytics</span>
        <span>Settings</span>
      </div>
    </nav>
  );
}

export default Navbar;