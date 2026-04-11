import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Pesanan.css";
import LogoPetik from "../../assets/petik.jpeg";

const Pesanan = () => {
  const [orders, setOrders] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/pesanan`);
      setOrders(result.data.data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE) || 1;

  const paginatedData = orders.slice(
    (currentpage - 1) * ITEMS_PER_PAGE,
    currentpage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (uuid) => {
    const msg = window.confirm("Yakin ingin menghapus pesanan ini?");
    if (!msg) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/pesanan/${uuid}`);
      getOrders();
    } catch (error) {
      console.log("Error deleting order:", error);
    }
  };

  return (
    <div className="kategori-container">
      <div className="kategori-top-bar">
        <div className="kategori-header">
          <h3>Daftar Pesanan</h3>
        </div>

        <div className="action-group">
          <img src={LogoPetik} alt="logo" className="logo-above-btn" />
          <NavLink to="/dashboard/pesanan/add" className="btn-add">
            Tambah Pesanan
          </NavLink>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pelanggan</th>
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
              paginatedData.map((order, index) => (
                <tr key={order.uuid || index}>
                  <td>{(currentpage - 1) * ITEMS_PER_PAGE + 1 + index}</td>
                  <td>{order.pelanggan.nama}</td>
                  <td>
                    <span className="status-label">
                      {order.pelanggan.no_hp}
                    </span>
                  </td>
                  <td className="text-center">
                    <button className="btn-edit">Edit</button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(order.uuid)}
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
        <div className="pagination" style={{ marginTop: "20px" }}>
          <button
            className="btn-page"
            disabled={currentpage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            &laquo; Prev
          </button>

          <span style={{ margin: "0 15px" }}>
            Halaman {currentpage} dari {totalPages}
          </span>

          <button
            className="btn-page"
            disabled={currentpage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default Pesanan;
