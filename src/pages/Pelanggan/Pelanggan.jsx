import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoPetik from "../../assets/petik.jpeg";

const Pelanggan = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/pelanggan`,
      );
      setCustomers(result.data.data);
    } catch (error) {
      console.log("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(customers.length / ITEMS_PER_PAGE) || 1;
  const paginatedData = customers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (uuid) => {
    const msg = window.confirm("Yakin ingin menghapus data pelanggan ini?");
    if (!msg) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/pelanggan/${uuid}`);
      getCustomers();
    } catch (error) {
      console.log("Error deleting customer:", error);
    }
  };

  return (
    <div className="kategori-container">
      <div className="kategori-top-bar" style={{ marginBottom: "10px" }}>
        <div className="kategori-header">
          <h3>Daftar Pelanggan</h3>
        </div>

        <div className="action-group">
          <img src={LogoPetik} alt="logo" className="logo-above-btn" />
          <NavLink to="/dashboard/pelanggan/add" className="btn-add">
            Tambah Pelanggan
          </NavLink>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pelanggan</th>
              <th>Alamat</th>
              <th>No Hp</th>
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
              paginatedData.map((customer, index) => (
                <tr key={customer.uuid || index}>
                  <td>{(currentPage - 1) * ITEMS_PER_PAGE + 1 + index}</td>
                  <td>{customer.nama}</td>
                  <td>{customer.alamat}</td>
                  <td>{customer.no_hp}</td>
                  <td className="text-center">
                    <button className="btn-edit">Edit</button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(customer.uuid)}
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
                  Data tidak tersedia.
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

export default Pelanggan;
