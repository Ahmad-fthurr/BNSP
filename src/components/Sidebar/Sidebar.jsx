import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  
  const allMenuItems = [
    { name: "Beranda", path: "/dashboard", icon: "🏠", roles: ["admin", "customer"] },
    { name: "Produk", path: "/dashboard/produk", icon: "📦", roles: ["admin"] },
    { name: "Kategori", path: "/dashboard/kategori", icon: "📂", roles: ["admin"] },
    { name: "Manajemen Pesanan", path: "/dashboard/pesanan", icon: "📋", roles: ["admin"] },
    { name: "Pelanggan", path: "/dashboard/pelanggan", icon: "👥", roles: ["admin"] },
    { name: "Pesanan", path: "/dashboard/pesanan-saya", icon: "🛍️", roles: ["customer", "admin"] },
  ];

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter(item => 
    item.roles.includes(user?.role || "customer")
  );

  return (
    <aside style={styles.sidebar}>
      <div style={styles.menu}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {}),
            })}
          >
            <span style={styles.icon}>{item.icon}</span>
            <span style={styles.name}>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "260px",
    backgroundColor: "var(--surface)",
    borderRight: "1px solid var(--border)",
    padding: "2rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    position: "sticky",
    top: "70px",
    height: "calc(100vh - 70px)",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  link: {
    display: "flex",
    alignItems: "center",
    padding: "0.875rem 1rem",
    borderRadius: "var(--radius-md)",
    color: "var(--text-muted)",
    fontWeight: 500,
    textDecoration: "none",
    transition: "all 0.2s ease",
  },
  activeLink: {
    backgroundColor: "#eff6ff",
    color: "var(--primary)",
  },
  icon: {
    marginRight: "0.75rem",
    fontSize: "1.25rem",
  },
  name: {
    fontSize: "0.875rem",
  },
};

export default Sidebar;