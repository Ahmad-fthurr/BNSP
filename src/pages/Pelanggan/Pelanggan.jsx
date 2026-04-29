import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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
        `${import.meta.env.VITE_API_URL || "https://fathur.petik.or.id"}/api/user`,
      );
      // Filter out test user to clean up data
      const validUsers = result.data.filter(user => user.email !== "test12345@test.com");
      setCustomers(validUsers);
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

  const handleDelete = async (id) => {
    const msg = window.confirm("Yakin ingin menghapus data pelanggan ini?");
    if (!msg) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL || "https://fathur.petik.or.id"}/api/user/${id}`);
      getCustomers();
    } catch (error) {
      console.log("Error deleting customer:", error);
    }
  };

  const getAvatarColor = (name) => {
    if (!name) return "94a3b8";
    const colors = ["ef4444", "f97316", "f59e0b", "84cc16", "10b981", "06b6d4", "3b82f6", "6366f1", "8b5cf6", "d946ef", "f43f5e"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="kategori-container">
      <div className="kategori-top-bar" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="kategori-header">
          <h3 style={{ margin: 0, color: "var(--text-main)" }}>Daftar Pelanggan</h3>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-muted)" }}>Kelola data pengguna terdaftar</p>
        </div>

        <div className="action-group">
          <NavLink to="/dashboard/pelanggan/add" className="btn btn-primary">
            + Tambah Pelanggan
          </NavLink>
        </div>
      </div>

      <style>{`
        .customer-row:hover td {
          background-color: #f8fafc;
        }
        .customer-row td {
          transition: background-color 0.2s ease;
        }
      `}</style>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>No</th>
              <th style={styles.th}>Nama Pelanggan</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={{...styles.th, textAlign: "center"}}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}
                >
                  Memuat data...
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((customer, index) => (
                <tr key={customer.id || customer.uuid || index} className="customer-row" style={styles.tr}>
                  <td style={styles.td}>{(currentPage - 1) * ITEMS_PER_PAGE + 1 + index}</td>
                  <td style={styles.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(customer.nama || "User")}&background=${getAvatarColor(customer.nama || "User")}&color=fff&size=40`}
                        alt={customer.nama}
                        style={{ borderRadius: "50%", width: "40px", height: "40px", objectFit: "cover", border: "2px solid #e2e8f0" }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{customer.nama}</span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ID: #{customer.id || "N/A"}</span>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      {customer.email}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      padding: "4px 10px", 
                      borderRadius: "100px", 
                      fontSize: "0.7rem", 
                      fontWeight: "700",
                      letterSpacing: "0.05em",
                      backgroundColor: customer.role === "admin" ? "#fef08a" : "#e0e7ff",
                      color: customer.role === "admin" ? "#854d0e" : "#3730a3"
                    }}>
                      {customer.role?.toUpperCase() || "CUSTOMER"}
                    </span>
                  </td>
                  <td style={styles.actionTd}>
                    <button style={styles.btnEdit}>Edit</button>
                    <button
                      style={styles.btnDelete}
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}
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

const styles = {
  tableWrapper: {
    backgroundColor: "var(--surface, #ffffff)",
    borderRadius: "var(--radius-lg, 12px)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    border: "1px solid var(--border, #e2e8f0)",
    overflow: "hidden",
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    padding: "1rem 1.5rem",
    backgroundColor: "#f8fafc",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "var(--text-muted, #64748b)",
    borderBottom: "1px solid var(--border, #e2e8f0)",
  },
  td: {
    padding: "1.25rem 1.5rem",
    fontSize: "0.875rem",
    borderBottom: "1px solid var(--border, #e2e8f0)",
    color: "var(--text-main, #1e293b)",
  },
  tr: {
    transition: "background-color 0.2s",
  },
  actionTd: {
    padding: "1.25rem 1.5rem",
    borderBottom: "1px solid var(--border, #e2e8f0)",
    display: "flex",
    gap: "0.5rem",
    justifyContent: "center",
  },
  btnEdit: {
    padding: "0.4rem 1rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#0ea5e9",
    backgroundColor: "#e0f2fe",
    border: "1px solid #bae6fd",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  btnDelete: {
    padding: "0.4rem 1rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#ef4444",
    backgroundColor: "#fee2e2",
    border: "1px solid #fecaca",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
};

export default Pelanggan;
