import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import LogoPetik from "../../assets/petik.jpeg";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      setUsers(result.data.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE) || 1;
  const paginatedData = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (uuid) => {
    const msg = window.confirm("Yakin ingin menghapus user ini?");
    if (!msg) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${uuid}`);
      getUsers();
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  return (
    <div className="kategori-container">
      <div className="kategori-top-bar" style={{ marginBottom: "10px" }}>
        <div className="kategori-header">
          <h3>Daftar Pengguna (Users)</h3>
        </div>

        <div className="action-group">
          <img src={LogoPetik} alt="logo" className="logo-above-btn" />
          <NavLink to="/dashboard/users/add" className="btn-add">
            Tambah User
          </NavLink>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Lengkap</th>
              <th>Email / Role</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  Memuat data...
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((user, index) => (
                <tr key={user.uuid || index}>
                  <td>{(currentPage - 1) * ITEMS_PER_PAGE + 1 + index}</td>
                  <td>{user.username}</td>
                  <td>
                    {user.email} <br />
                    <small style={{ color: "#888" }}>
                      Role: {user.role}
                    </small>
                  </td>
                  <td className="text-center">
                    <button className="btn-edit">Edit</button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(user.uuid)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  Data user tidak tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div
          className="pagination"
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            className="btn-page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            &laquo; Prev
          </button>

          <span>
            Halaman {currentPage} dari {totalPages}
          </span>

          <button
            className="btn-page"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
