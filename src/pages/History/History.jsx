import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoPetik from "../../assets/petik.jpeg";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    setLoading(true);
    try {
    
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/history`);
      setHistoryData(result.data.data);
    } catch (error) {
      console.log("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };


  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(historyData.length / ITEMS_PER_PAGE) || 1;
  const paginatedData = historyData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (uuid) => {
    const msg = window.confirm("Yakin ingin menghapus riwayat ini?");
    if (!msg) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/history/${uuid}`);
      getHistory(); 
    } catch (error) {
      console.log("Error deleting history:", error);
    }
  };

  return (
    <div className="kategori-container">

      <div className="kategori-top-bar" style={{ marginBottom: "10px" }}>
        <div className="kategori-header">
          <h3>Riwayat Transaksi (History)</h3>
        </div>

        <div className="action-group">
          <img src={LogoPetik} alt="logo" className="logo-above-btn" />
          <NavLink to="/dashboard/history/add" className="btn-add">
            Tambah Riwayat
          </NavLink>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Table</th>
              <th>Keterangan / Aktivitas</th>
              <th>Value</th>
              <th>Users</th>
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
              paginatedData.map((item, index) => (
                <tr key={item.uuid || index}>
                  <td>{(currentPage - 1) * ITEMS_PER_PAGE + 1 + index}</td>
                  <td>
                    {item.table}
                  </td>
                  <td>{item.action}</td>
                  <td>{item.value}</td>
                  <td>{item.user.username}</td>
                  <td className="text-center">
                    <button className="btn-edit">Edit</button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item.uuid)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td></td>
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

export default History;
