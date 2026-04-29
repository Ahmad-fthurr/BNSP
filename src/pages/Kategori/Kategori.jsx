import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Kategori = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://fathur.petik.or.id/api";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/kategori`);
      setCategories(res.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus kategori ini?")) {
      try {
        await axios.delete(`${API_URL}/kategori/${id}`);
        fetchCategories();
      } catch (error) {
        alert("Gagal menghapus kategori");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Manajemen Kategori</h2>
          <p style={styles.subtitle}>Atur kategori produk toko Anda</p>
        </div>
        <Link to="/dashboard/kategori/add" className="btn btn-primary">
          + Tambah Kategori
        </Link>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>No</th>
              <th style={styles.th}>Nama Kategori</th>
              <th style={styles.th}>Jumlah Produk</th>
              <th style={styles.th}>Dibuat Pada</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={styles.tdCenter}>Memuat data...</td></tr>
            ) : categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat.id} style={styles.tr}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>
                    <div style={styles.categoryInfo}>
                      <span style={styles.catName}>{cat.nama_kategori}</span>
                    </div>
                  </td>
                  <td style={styles.td}>-</td>
                  <td style={styles.td}>{new Date(cat.createdAt).toLocaleDateString("id-ID")}</td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button className="btn btn-outline" style={styles.actionBtn}>Edit</button>
                      <button 
                        className="btn btn-outline" 
                        style={{...styles.actionBtn, color: "#dc2626"}}
                        onClick={() => handleDelete(cat.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" style={styles.tdCenter}>Tidak ada kategori.</td></tr>
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
  tableWrapper: {
    backgroundColor: "var(--surface)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-sm)",
    border: "1px solid var(--border)",
    overflow: "hidden",
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
    color: "var(--text-muted)",
    borderBottom: "1px solid var(--border)",
  },
  td: {
    padding: "1rem 1.5rem",
    fontSize: "0.875rem",
    borderBottom: "1px solid var(--border)",
  },
  tdCenter: {
    padding: "3rem",
    textAlign: "center",
    color: "var(--text-muted)",
  },
  tr: {
    transition: "background-color 0.2s ease",
  },
  categoryInfo: {
    fontWeight: 500,
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
  },
  actionBtn: {
    padding: "0.25rem 0.5rem",
    fontSize: "0.75rem",
  },
};

export default Kategori;

