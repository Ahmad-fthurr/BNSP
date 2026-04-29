import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";

const CheckoutSelesai = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  const orderId = params.get("order_id") || "";
  const [pesanan, setPesanan] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyState = location.state?.dummyData;

  useEffect(() => {
    if (dummyState) {
      setPesanan({
        pelanggan: { nama: dummyState.customerName },
        tanggal: dummyState.date,
      });
      setItems([
        {
          id: "dummy-1",
          harga: dummyState.price,
          qty: dummyState.qty,
          produk: { nama_produk: dummyState.productName },
        },
      ]);
      setLoading(false);
      return;
    }

    if (!orderId) return;
    const pesananId = orderId.includes("-") ? orderId.split("-")[1] : orderId;
    if (!pesananId) return;
    fetchDetail(pesananId);
  }, [orderId, dummyState]);

  const fetchDetail = async (pesananId) => {
    setLoading(true);
    try {
      const resPesanan = await axiosInstance.get("/pesanan");
      const allOrders = Array.isArray(resPesanan.data)
        ? resPesanan.data
        : resPesanan.data.data || [];
      const dataPesanan = allOrders.find(
        (p) => String(p.id) === String(pesananId),
      );
      setPesanan(dataPesanan);

      const resItems = await axiosInstance.get("/pesanan-items");
      const allItems = Array.isArray(resItems.data)
        ? resItems.data
        : resItems.data.data || [];
      const dataItems = allItems.filter(
        (item) => String(item.pesanan_id) === String(pesananId),
      );
      setItems(dataItems);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.harga * item.qty, 0);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Memuat detail pesanan...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.successIcon}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 style={styles.title}>Pesanan Berhasil!</h2>
          <p style={styles.subtitle}>
            Terima kasih telah berbelanja di COREFOOD
          </p>
        </div>

        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>No. Pesanan</span>
            <span style={styles.infoValue}># {orderId}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Pelanggan</span>
            <span style={styles.infoValue}>
              {pesanan?.pelanggan?.nama || pesanan?.user?.nama || "Pelanggan"}
            </span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Metode</span>
            <span style={styles.infoValue}>Payment gateway</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Tanggal</span>
            <span style={styles.infoValue}>
              {pesanan?.tanggal
                ? new Date(pesanan.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </span>
          </div>
        </div>

        <div style={styles.divider}></div>

        <div style={styles.itemsList}>
          <h3 style={styles.sectionTitle}>Rincian Item</h3>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} style={styles.productRow}>
                <div style={styles.productInfo}>
                  <span style={styles.productName}>
                    {item?.produk?.nama_produk ||
                      item?.produk?.nama_barang ||
                      "Produk"}
                  </span>
                  <span style={styles.productMeta}>
                    {item.qty} x Rp{" "}
                    {Number(item.harga || 0).toLocaleString("id-ID")}
                  </span>
                </div>
                <span style={styles.productTotal}>
                  Rp{" "}
                  {(Number(item.harga || 0) * item.qty).toLocaleString("id-ID")}
                </span>
              </div>
            ))
          ) : (
            <p style={styles.noItems}>Tidak ada rincian item.</p>
          )}
        </div>

        <div style={styles.totalSection}>
          <span style={styles.totalLabel}>Total Pembayaran</span>
          <span style={styles.totalValue}>
            Rp {calculateTotal().toLocaleString("id-ID")}
          </span>
        </div>

        <div style={styles.paymentInfo}>
          <div style={styles.infoIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <span>
            Pembayaran Berhasil! Transaksi Anda telah kami catat dalam sistem
            COREFOOD.
          </span>
        </div>

        <button onClick={() => navigate("/")} style={styles.btnHome}>
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "3rem 1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
  },
  card: {
    background: "#ffffff",
    borderRadius: "24px",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "550px",
    border: "1px solid #f1f5f9",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  successIcon: {
    width: "80px",
    height: "80px",
    background: "#f0fdf4",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 1.5rem",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "0.5rem",
    letterSpacing: "-0.025em",
  },
  subtitle: {
    color: "#64748b",
    fontSize: "1rem",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  infoLabel: {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  infoValue: {
    fontSize: "0.9375rem",
    fontWeight: "700",
    color: "#334155",
  },
  divider: {
    height: "1px",
    background: "#f1f5f9",
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "1.25rem",
  },
  itemsList: {
    marginBottom: "2rem",
  },
  productRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    padding: "0.75rem",
    borderRadius: "12px",
    background: "#f8fafc",
  },
  productInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "0.125rem",
  },
  productName: {
    fontSize: "0.9375rem",
    fontWeight: "600",
    color: "#334155",
  },
  productMeta: {
    fontSize: "0.8125rem",
    color: "#64748b",
  },
  productTotal: {
    fontSize: "0.9375rem",
    fontWeight: "700",
    color: "#1e293b",
  },
  noItems: {
    textAlign: "center",
    color: "#94a3b8",
    fontStyle: "italic",
  },
  totalSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.25rem",
    background: "#eff6ff",
    borderRadius: "16px",
    marginBottom: "1.5rem",
  },
  totalLabel: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#1e3a8a",
  },
  totalValue: {
    fontSize: "1.25rem",
    fontWeight: "800",
    color: "#1d4ed8",
  },
  paymentInfo: {
    display: "flex",
    gap: "0.75rem",
    background: "#fff9eb",
    padding: "1rem",
    borderRadius: "12px",
    fontSize: "0.875rem",
    color: "#92400e",
    marginBottom: "2rem",
    border: "1px solid #fde68a",
  },
  infoIcon: {
    flexShrink: 0,
  },
  btnHome: {
    width: "100%",
    padding: "1rem",
    background: "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
    gap: "1rem",
    color: "#64748b",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #f1f5f9",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Add keyframes for spinner
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default CheckoutSelesai;
