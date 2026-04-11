import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logoPetik from "../../assets/petik.jpeg"

const Sidebar = () => {
  return (
    <div className="sidebar-content">
      <div className="logo-section">
      <img src= {logoPetik} style={{width:"40px"}}/>
        <span className="petik">PeTIK Niaga</span>
      </div>
      <ul>
        <li>
          <NavLink to="/dashboard" end>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/pesanan">Pesanan</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/produk">Produk</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/kategori">Kategori</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/pelanggan">Pelanggan</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/kartu">Kartu</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/users">User</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/history">History</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;