import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddProduk = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_produk: "",
    harga: "",
    stok: "",
    kategori_id: "",
  });
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "https://fathur.petik.or.id";
  const API_URL = `${API_BASE}/api`;

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await axios.get(`${API_URL}/kategori`);

        const categories = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];
        setKategoriList(categories);
      } catch (err) {
        console.log("Failed to fetch categories:", err);
      }
    };
    fetchKategori();
  }, [API_URL]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        nama_produk: formData.nama_produk,
        harga: Number(formData.harga),
        stok: Number(formData.stok),
        kategori_id: Number(formData.kategori_id),
      };

      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      await axios.post(`${API_URL}/produk/tambah`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      navigate("/dashboard/produk");
    } catch (err) {
      console.log(err);
      setError("Gagal menambahkan produk. Server menolak permintaan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container} className="animate-fade-in">
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Tambah Produk Baru</h2>
          <p style={styles.subtitle}>
            Masukkan detail produk yang ingin ditambahkan ke toko
          </p>
        </div>
      </div>

      <div style={styles.card}>
        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            <div style={styles.leftColumn}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nama Produk</label>
                <input
                  type="text"
                  name="nama_produk"
                  value={formData.nama_produk}
                  onChange={handleChange}
                  placeholder="Contoh: Sepatu Sneakers Original"
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Harga (Rp)</label>
                  <input
                    type="number"
                    name="harga"
                    value={formData.harga}
                    onChange={handleChange}
                    placeholder="Contoh: 150000"
                    style={styles.input}
                    min="0"
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Stok</label>
                  <input
                    type="number"
                    name="stok"
                    value={formData.stok}
                    onChange={handleChange}
                    placeholder="Contoh: 50"
                    style={styles.input}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Kategori</label>
                <select
                  name="kategori_id"
                  value={formData.kategori_id}
                  onChange={handleChange}
                  style={styles.select}
                  required
                >
                  <option value="">-- Pilih Kategori --</option>
                  {kategoriList.map((kat) => (
                    <option key={kat.id || kat.uuid} value={kat.id || kat.uuid}>
                      {kat.nama_kategori || kat.nama}
                    </option>
                  ))}
                  {/* Fallback option in case API fails to fetch categories */}
                  {kategoriList.length === 0 && (
                    <option value="1">Kategori Umum (Default)</option>
                  )}
                </select>
              </div>
            </div>
          </div>

          <div style={styles.footer}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={styles.btnCancel}
              disabled={loading}
            >
              Batal
            </button>
            <button type="submit" style={styles.btnSubmit} disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "1rem 0",
    maxWidth: "900px",
  },
  header: {
    marginBottom: "2rem",
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
  card: {
    backgroundColor: "var(--surface)",
    borderRadius: "var(--radius-lg)",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)",
    border: "1px solid var(--border)",
    padding: "2rem",
  },
  errorAlert: {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    padding: "1rem",
    borderRadius: "var(--radius-md)",
    marginBottom: "1.5rem",
    fontSize: "0.875rem",
    fontWeight: 600,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "2rem",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "var(--text-main)",
    marginBottom: "0.5rem",
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border)",
    fontSize: "0.9375rem",
    outline: "none",
    transition: "border-color 0.2s",
    backgroundColor: "#f8fafc",
  },
  select: {
    padding: "0.75rem 1rem",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border)",
    fontSize: "0.9375rem",
    outline: "none",
    backgroundColor: "#f8fafc",
    cursor: "pointer",
  },
  imageUploadBox: {
    border: "2px dashed #cbd5e1",
    borderRadius: "var(--radius-md)",
    backgroundColor: "#f8fafc",
    height: "250px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  uploadLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    width: "100%",
    height: "100%",
  },
  previewContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  removeImageBtn: {
    position: "absolute",
    bottom: "1rem",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(220, 38, 38, 0.9)",
    color: "white",
    border: "none",
    padding: "0.4rem 1rem",
    borderRadius: "100px",
    fontSize: "0.75rem",
    fontWeight: 600,
    cursor: "pointer",
    backdropFilter: "blur(4px)",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
    marginTop: "2.5rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid var(--border)",
  },
  btnCancel: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "1px solid #cbd5e1",
    borderRadius: "var(--radius-md)",
    fontSize: "0.9375rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  btnSubmit: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "var(--primary)",
    color: "white",
    border: "none",
    borderRadius: "var(--radius-md)",
    fontSize: "0.9375rem",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.2)",
  },
};

export default AddProduk;
