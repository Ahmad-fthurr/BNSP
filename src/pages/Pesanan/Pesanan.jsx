import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Image Assets
import ayamgeprek from "../../assets/ayamgeprek.png";
import bakso from "../../assets/bakso.png";
import eskelapa from "../../assets/eskelapa.png";
import esteh from "../../assets/esteh.png";
import iphone from "../../assets/iphone.png";
import jusapel from "../../assets/jusapel.png";
import mieayam from "../../assets/mieayam.png";
import radio from "../../assets/radio.png";
import tv from "../../assets/tv.png";
import defaultImg from "../../assets/mie.png";

const Pesanan = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const API_URL = "https://fathur.petik.or.id/api";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/order`);
      setOrders(res.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus pesanan ini?")) {
      try {
        await axios.delete(`${API_URL}/order/${id}`);
        fetchOrders();
      } catch (error) {
        alert("Gagal menghapus pesanan");
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getProductImage = (name) => {
    if (!name) return defaultImg;
    const lowerName = name.toLowerCase();
    if (lowerName.includes("ayam geprek")) return ayamgeprek;
    if (lowerName.includes("bakso")) return bakso;
    if (lowerName.includes("es kelapa")) return eskelapa;
    if (lowerName.includes("es teh")) return esteh;
    if (lowerName.includes("iphone")) return iphone;
    if (lowerName.includes("jus apel")) return jusapel;
    if (lowerName.includes("mie ayam")) return mieayam;
    if (lowerName.includes("radio")) return radio;
    if (lowerName.includes("tv")) return tv;
    return defaultImg;
  };

  const filteredOrders = orders.filter((order) => {
    if (!startDate && !endDate) return true;
    const orderDate = new Date(order.createdAt).getTime();
    const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : 0;
    const end = endDate
      ? new Date(endDate).setHours(23, 59, 59, 999)
      : Infinity;
    return orderDate >= start && orderDate <= end;
  });

  const getAvatarColor = (name) => {
    if (!name) return "94a3b8";
    const colors = [
      "ef4444",
      "f97316",
      "f59e0b",
      "84cc16",
      "10b981",
      "06b6d4",
      "3b82f6",
      "6366f1",
      "8b5cf6",
      "d946ef",
      "f43f5e",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Laporan & Manajemen Pesanan</h2>
          <p style={styles.subtitle}>Pantau dan kelola semua pesanan masuk</p>
        </div>

        <div style={styles.filterContainer}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Tanggal Mulai</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={styles.dateInput}
            />
          </div>
          <span style={styles.filterSeparator}>-</span>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Tanggal Akhir</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={styles.dateInput}
            />
          </div>
          <button
            style={styles.btnReset}
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            disabled={!startDate && !endDate}
          >
            Reset Filter
          </button>
        </div>
      </div>

      <style>{`
        .order-row:hover td {
          background-color: #f8fafc;
        }
        .order-row td {
          transition: background-color 0.2s ease;
        }
      `}</style>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Pelanggan</th>
              <th style={styles.th}>Produk</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Tanggal</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={styles.tdCenter}>
                  Memuat data...
                </td>
              </tr>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="order-row" style={styles.tr}>
                  <td
                    style={{
                      ...styles.td,
                      fontWeight: 700,
                      color: "var(--text-muted)",
                    }}
                  >
                    #{order.id}
                  </td>
                  <td style={styles.td}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(order.user?.nama || "Guest")}&background=${getAvatarColor(order.user?.nama || "Guest")}&color=fff&size=36`}
                        alt={order.user?.nama}
                        style={{
                          borderRadius: "50%",
                          width: "36px",
                          height: "36px",
                          objectFit: "cover",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            color: "var(--text-main)",
                          }}
                        >
                          {order.user?.nama || "Guest"}
                        </span>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          {order.user?.email || "-"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={getProductImage(order.produk?.nama_produk)}
                        alt="Product"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "8px",
                          objectFit: "cover",
                          border: "1px solid var(--border)",
                        }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            color: "var(--text-main)",
                          }}
                        >
                          {order.produk?.nama_produk || "Produk Dihapus"}
                        </span>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          Qty: {order.jumlah || 1}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    Rp {Number(order.total_harga).toLocaleString("id-ID")}
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        backgroundColor:
                          order.status === "selesai" ? "#dcfce7" : "#fef9c3",
                        color:
                          order.status === "selesai" ? "#166534" : "#854d0e",
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td style={styles.td}>{formatDate(order.createdAt)}</td>
                  <td style={styles.actionTd}>
                    <button
                      style={styles.btnDelete}
                      onClick={() => handleDelete(order.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={styles.tdCenter}>
                  Tidak ada pesanan pada rentang tanggal ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "1rem 0",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "var(--text-main)",
  },
  subtitle: {
    color: "var(--text-muted)",
    fontSize: "0.875rem",
  },
  filterContainer: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-end",
    backgroundColor: "var(--surface)",
    padding: "16px",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-sm)",
    border: "1px solid var(--border)",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
  },
  filterLabel: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "var(--text-muted)",
    marginBottom: "6px",
    textTransform: "uppercase",
  },
  dateInput: {
    padding: "8px 12px",
    border: "1px solid var(--border)",
    borderRadius: "6px",
    fontSize: "0.875rem",
    outline: "none",
    color: "var(--text-main)",
  },
  filterSeparator: {
    marginBottom: "10px",
    color: "var(--text-muted)",
    fontWeight: 700,
  },
  btnReset: {
    padding: "9px 16px",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "0.875rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  tableWrapper: {
    backgroundColor: "var(--surface, #ffffff)",
    borderRadius: "var(--radius-lg, 12px)",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
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
  tdCenter: {
    padding: "3rem",
    textAlign: "center",
    color: "var(--text-muted)",
  },
  tr: {
    transition: "background-color 0.2s ease",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
  },
  userName: {
    fontWeight: 600,
    color: "var(--text-main)",
  },
  userEmail: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
  },
  statusBadge: {
    padding: "4px 10px",
    borderRadius: "100px",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  actionTd: {
    padding: "1.25rem 1.5rem",
    borderBottom: "1px solid var(--border, #e2e8f0)",
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

export default Pesanan;
