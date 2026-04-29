import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useProducts();
  const navigate = useNavigate();

  const handleLogout = () => {
    const yakin = window.confirm("Apakah anda ingin keluar Aplikasi?");

    if (yakin) {
      logout();
      toast.info("Anda telah keluar Aplikasi 🚪");
      navigate("/login");
    } else {
      toast.info("Batal keluar 😊");
      navigate("/dashboard");
    }
  };
  return (
    <nav style={styles.navbar}>
      <div className="container" style={styles.navContainer}>
        <Link to="/" style={styles.logo}>
          CORE<span>FOOD</span>
        </Link>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Cari produk favoritmu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <span style={styles.searchIcon}>🔍</span>
        </div>

        <div style={styles.navLinks}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={styles.userInfo}>
                <div
                  style={{
                    ...styles.avatar,
                    backgroundColor:
                      user.role === "admin" ? "#fef08a" : "#e0e7ff",
                    color: user.role === "admin" ? "#854d0e" : "#3730a3",
                  }}
                >
                  {user.role === "admin"
                    ? "AD"
                    : (user.nama || user.name || "U").charAt(0).toUpperCase()}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={styles.welcome}>
                    Halo, {user.nama || user.name || "User"}
                  </span>
                  <span style={styles.roleText}>
                    {user.role === "admin" ? "Admin" : "Customer"}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-outline"
                style={styles.logoutBtn}
              >
                Keluar
              </button>
            </div>
          ) : (
            <div style={styles.authButtons}>
              <Link
                to="/login"
                className="btn btn-outline"
                style={styles.loginBtn}
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                style={styles.registerBtn}
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "var(--surface)",
    borderBottom: "1px solid var(--border)",
    padding: "0.75rem 0",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "var(--shadow-sm)",
  },
  navContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "var(--text-main)",
  },
  searchContainer: {
    flex: 1,
    maxWidth: "500px",
    margin: "0 2rem",
    position: "relative",
  },
  searchInput: {
    width: "100%",
    padding: "0.625rem 1rem 0.625rem 2.5rem",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--border)",
    backgroundColor: "#f1f5f9",
    outline: "none",
    transition: "all 0.2s ease",
  },
  searchIcon: {
    position: "absolute",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--text-muted)",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
  },
  authButtons: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
  },
  loginBtn: {
    borderColor: "var(--primary)",
    color: "var(--primary)",
    minWidth: "90px",
  },
  registerBtn: {
    minWidth: "90px",
  },
  logoutBtn: {
    marginLeft: "0.5rem",
    borderColor: "#ef4444",
    color: "#ef4444",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "100px",
    backgroundColor: "#f8fafc",
    border: "1px solid var(--border)",
    paddingRight: "1rem",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 800,
    fontSize: "0.9rem",
    letterSpacing: "0.05em",
  },
  welcome: {
    fontSize: "0.875rem",
    color: "var(--text-main)",
    fontWeight: 700,
    lineHeight: 1.2,
  },
  roleText: {
    fontSize: "0.7rem",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    fontWeight: 600,
    letterSpacing: "0.05em",
  },
};

export default Navbar;
