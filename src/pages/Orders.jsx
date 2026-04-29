import React, { useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import ayamgeprek from "../assets/ayamgeprek.png";
import bakso from "../assets/bakso.png";
import eskelapa from "../assets/eskelapa.png";
import esteh from "../assets/esteh.png";
import iphone from "../assets/iphone.png";
import jusapel from "../assets/jusapel.png";
import mieayam from "../assets/mieayam.png";
import radio from "../assets/radio.png";
import tv from "../assets/tv.png";
import defaultImg from "../assets/mie.png";

const Orders = () => {
  const { orders, fetchOrders, loadingOrders } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchOrders(user.id);
    }
  }, [user]);

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container animate-fade-in" style={styles.container}>
      <h1 style={styles.title}>Riwayat Pesanan</h1>
      <p style={styles.subtitle}>Pantau status pesanan Anda disini.</p>

      {loadingOrders ? (
        <div style={styles.loading}>Memuat pesanan...</div>
      ) : orders.length > 0 ? (
        <div style={styles.orderList}>
          {orders.map((order) => (
            <div key={order.id} style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <div>
                  <span style={styles.orderDate}>
                    {formatDate(order.createdAt)}
                  </span>
                  <span style={styles.orderId}>
                    ID Pesanan:{" "}
                    <span style={{ fontWeight: 600 }}>#{order.id}</span>
                  </span>
                </div>
                <div
                  style={{
                    ...styles.status,
                    backgroundColor:
                      order.status === "selesai" ? "#dcfce7" : "#fef9c3",
                    color: order.status === "selesai" ? "#166534" : "#854d0e",
                  }}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>
              <div style={styles.orderBody}>
                <div style={styles.productInfo}>
                  <div style={styles.imageWrapper}>
                    <img
                      src={getProductImage(order.produk?.nama_produk)}
                      alt={order.produk?.nama_produk}
                      style={styles.productImage}
                    />
                  </div>
                  <div>
                    <h3 style={styles.productName}>
                      {order.produk?.nama_produk || "Produk Tidak Diketahui"}
                    </h3>
                    <p style={styles.productMeta}>
                      {order.jumlah} barang x{" "}
                      {formatPrice(order.produk?.harga || 0)}
                    </p>
                  </div>
                </div>
                <div style={styles.totalSection}>
                  <p style={styles.totalLabel}>Total Belanja</p>
                  <p style={styles.totalValue}>
                    {formatPrice(order.total_harga)}
                  </p>
                </div>
              </div>
              <div style={styles.orderFooter}>
                <button
                  className="btn btn-outline"
                  style={{ fontSize: "0.875rem", padding: "0.5rem 1.5rem" }}
                  onClick={() => navigate("/")}
                >
                  Beli Lagi
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.empty}>
          <p>Anda belum memiliki pesanan.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
            style={{ marginTop: "1rem" }}
          >
            Mulai Belanja
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem 0",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "0.5rem",
    color: "var(--text-main)",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    color: "var(--text-muted)",
    marginBottom: "2.5rem",
    fontSize: "1rem",
  },
  loading: {
    textAlign: "center",
    padding: "5rem 0",
    color: "var(--text-muted)",
  },
  orderList: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  orderCard: {
    backgroundColor: "var(--surface, #ffffff)",
    borderRadius: "var(--radius-lg, 12px)",
    border: "1px solid var(--border, #e2e8f0)",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)",
    overflow: "hidden",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderBottom: "1px solid var(--border, #e2e8f0)",
    padding: "1rem 1.5rem",
  },
  orderDate: {
    fontWeight: 600,
    marginRight: "1rem",
    color: "var(--text-main)",
  },
  orderId: {
    fontSize: "0.875rem",
    color: "var(--text-muted)",
  },
  status: {
    padding: "0.35rem 0.85rem",
    borderRadius: "100px",
    fontSize: "0.75rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  orderBody: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem",
  },
  productInfo: {
    display: "flex",
    alignItems: "center",
    gap: "1.25rem",
  },
  imageWrapper: {
    width: "70px",
    height: "70px",
    borderRadius: "8px",
    backgroundColor: "#f1f5f9",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  productName: {
    fontSize: "1.125rem",
    fontWeight: 700,
    marginBottom: "0.35rem",
    color: "var(--text-main)",
  },
  productMeta: {
    fontSize: "0.875rem",
    color: "var(--text-muted)",
  },
  totalSection: {
    textAlign: "right",
    paddingLeft: "1.5rem",
    borderLeft: "1px dashed var(--border, #e2e8f0)",
  },
  totalLabel: {
    fontSize: "0.875rem",
    color: "var(--text-muted)",
    marginBottom: "0.25rem",
  },
  totalValue: {
    fontSize: "1.25rem",
    fontWeight: 800,
    color: "var(--primary)",
  },
  orderFooter: {
    padding: "1rem 1.5rem",
    backgroundColor: "#ffffff",
    borderTop: "1px solid var(--border, #f1f5f9)",
    display: "flex",
    justifyContent: "flex-end",
  },
  empty: {
    textAlign: "center",
    padding: "5rem 0",
    backgroundColor: "var(--surface)",
    borderRadius: "var(--radius-lg, 12px)",
    border: "1px dashed var(--border)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
};

export default Orders;
