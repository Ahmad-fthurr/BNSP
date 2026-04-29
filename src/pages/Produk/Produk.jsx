import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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

const Produk = () => {
  const navigate = useNavigate();
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://fathur.petik.or.id/api";

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/produk`);
      setProduk(res.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProductImage = (name) => {
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

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      await axios.delete(`${API_URL}/produk/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProduk((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log("DELETE ERROR:", error.response);
      alert(error.response?.data?.message || "Gagal menghapus produk");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Manajemen Produk</h2>
          <p style={styles.subtitle}>Kelola daftar produk toko Anda</p>
        </div>
        <Link to="/dashboard/produk/add" className="btn btn-primary">
          + Tambah Produk
        </Link>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>No</th>
              <th style={styles.th}>Produk</th>
              <th style={styles.th}>Kategori</th>
              <th style={styles.th}>Harga</th>
              <th style={styles.th}>Stok</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={styles.tdCenter}>
                  Memuat data...
                </td>
              </tr>
            ) : produk.length > 0 ? (
              produk.map((pro, index) => (
                <tr key={pro.id} style={styles.tr}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>
                    <div style={styles.productInfo}>
                      <img
                        src={getProductImage(pro.nama_produk)}
                        alt=""
                        style={styles.avatar}
                      />
                      <span style={styles.productNameText}>
                        {pro.nama_produk}
                      </span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.badge}>
                      {pro.kategori?.nama_kategori || "-"}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.priceText}>
                      Rp {Number(pro.harga).toLocaleString("id-ID")}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.stockBadge}>{pro.stok}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button
                        className="btn btn-outline btn-sm"
                        style={styles.actionBtn}
                        onClick={() =>
                          navigate(`/dashboard/produk/edit/${pro.id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline btn-sm"
                        style={{
                          ...styles.actionBtn,
                          color: "#ef4444",
                          borderColor: "#fee2e2",
                        }}
                        onClick={() => handleDelete(pro.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.tdCenter}>
                  Tidak ada produk.
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
    marginBottom: "2.5rem",
  },
  title: {
    fontSize: "1.875rem",
    fontWeight: 800,
    color: "var(--text-main)",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    color: "var(--text-muted)",
    fontSize: "0.9375rem",
    marginTop: "0.25rem",
  },
  tableWrapper: {
    backgroundColor: "var(--surface)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-md)",
    border: "1px solid var(--border)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    padding: "1.25rem 1.5rem",
    backgroundColor: "#f8fafc",
    fontSize: "0.75rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "var(--text-muted)",
    borderBottom: "1px solid var(--border)",
  },
  td: {
    padding: "1.25rem 1.5rem",
    fontSize: "0.9375rem",
    borderBottom: "1px solid var(--border)",
    verticalAlign: "middle",
  },
  tdCenter: {
    padding: "4rem",
    textAlign: "center",
    color: "var(--text-muted)",
    fontSize: "1rem",
  },
  tr: {
    transition: "all 0.2s ease",
  },
  productInfo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  productNameText: {
    fontWeight: 600,
    color: "var(--text-main)",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "var(--radius-md)",
    objectFit: "cover",
    border: "1px solid var(--border)",
  },
  badge: {
    backgroundColor: "var(--primary-light)",
    color: "var(--primary)",
    padding: "0.375rem 0.75rem",
    borderRadius: "100px",
    fontSize: "0.75rem",
    fontWeight: 700,
  },
  priceText: {
    fontWeight: 700,
    color: "var(--text-main)",
  },
  stockBadge: {
    fontWeight: 600,
    color: "var(--text-muted)",
  },
  actions: {
    display: "flex",
    gap: "0.75rem",
  },
  actionBtn: {
    fontWeight: 600,
  },
};

export default Produk;
