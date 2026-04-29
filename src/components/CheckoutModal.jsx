import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";

const CheckoutModal = ({ product, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jumlah, setJumlah] = useState(1);
  const [loading, setLoading] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedProv, setSelectedProv] = useState("");
  const [selectedReg, setSelectedReg] = useState("");
  const [selectedDist, setSelectedDist] = useState("");
  const [selectedVill, setSelectedVill] = useState("");
  const [detailAlamat, setDetailAlamat] = useState("");

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    axios
      .get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => setProvinces(res.data))
      .catch((err) => console.log("Gagal memuat provinsi", err));
  }, []);

  const handleProvChange = (e) => {
    const id = e.target.value;
    setSelectedProv(id);
    setSelectedReg("");
    setSelectedDist("");
    setSelectedVill("");
    setRegencies([]);
    setDistricts([]);
    setVillages([]);
    if (id) {
      axios
        .get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`,
        )
        .then((res) => setRegencies(res.data));
    }
  };

  const handleRegChange = (e) => {
    const id = e.target.value;
    setSelectedReg(id);
    setSelectedDist("");
    setSelectedVill("");
    setDistricts([]);
    setVillages([]);
    if (id) {
      axios
        .get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`,
        )
        .then((res) => setDistricts(res.data));
    }
  };

  const handleDistChange = (e) => {
    const id = e.target.value;
    setSelectedDist(id);
    setSelectedVill("");
    setVillages([]);
    if (id) {
      axios
        .get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`,
        )
        .then((res) => setVillages(res.data));
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Silakan login terlebih dahulu untuk melakukan pesanan.");
      navigate("/login");
      return;
    }

    if (
      !selectedProv ||
      !selectedReg ||
      !selectedDist ||
      !selectedVill ||
      !detailAlamat
    ) {
      alert("Mohon lengkapi alamat pengiriman Anda.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        user_id: user.id || user.uuid,
        produk_id: product.id || product.uuid,
        jumlah: jumlah,
        total_harga: product.harga * jumlah,
        alamat: detailAlamat,
      };

      const res = await axiosInstance.post("/order/tambah", payload);

      const orderId = res.data.order_id || res.data.id || "DUMMY-" + Date.now();

      setTimeout(() => {
        setLoading(false);
        onClose();
        navigate(`/dashboard/checkout-selesai?order_id=${orderId}`, {
          state: {
            dummyData: {
              customerName: user.nama || user.name,
              productName: product.nama_produk,
              price: product.harga,
              qty: jumlah,
              date: new Date().toISOString(),
            },
          },
        });
      }, 2000);
    } catch (error) {
      console.log("ORDER ERROR:", error);

      const dummyId = "DUMMY-" + Math.floor(Math.random() * 1000);
      setTimeout(() => {
        setLoading(false);
        onClose();
        navigate(`/dashboard/checkout-selesai?order_id=${dummyId}`, {
          state: {
            dummyData: {
              customerName: user.nama || user.name,
              productName: product.nama_produk,
              price: product.harga,
              qty: jumlah,
              date: new Date().toISOString(),
            },
          },
        });
      }, 2000);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal} className="animate-fade-in">
        <div style={styles.header}>
          <h2 style={styles.title}>Detail Pesanan</h2>
          <button style={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div style={styles.content}>
          <div style={styles.productSummary}>
            <div>
              <h3 style={styles.productName}>{product.nama_produk}</h3>
              <p style={styles.productPrice}>{formatPrice(product.harga)}</p>
            </div>
            <div style={styles.quantityControl}>
              <button
                type="button"
                style={styles.qtyBtn}
                onClick={() => setJumlah(Math.max(1, jumlah - 1))}
              >
                -
              </button>
              <span style={styles.qtyValue}>{jumlah}</span>
              <button
                type="button"
                style={styles.qtyBtn}
                onClick={() => setJumlah(jumlah + 1)}
              >
                +
              </button>
            </div>
          </div>

          <form onSubmit={handleConfirm}>
            <div style={styles.sectionTitle}>
              Alamat Pengiriman (Indoregion)
            </div>

            <div style={styles.formGrid}>
              <select
                style={styles.select}
                value={selectedProv}
                onChange={handleProvChange}
                required
              >
                <option value="">-- Pilih Provinsi --</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <select
                style={styles.select}
                value={selectedReg}
                onChange={handleRegChange}
                disabled={!selectedProv}
                required
              >
                <option value="">-- Pilih Kota/Kabupaten --</option>
                {regencies.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>

              <select
                style={styles.select}
                value={selectedDist}
                onChange={handleDistChange}
                disabled={!selectedReg}
                required
              >
                <option value="">-- Pilih Kecamatan --</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>

              <select
                style={styles.select}
                value={selectedVill}
                onChange={(e) => setSelectedVill(e.target.value)}
                disabled={!selectedDist}
                required
              >
                <option value="">-- Pilih Desa/Kelurahan --</option>
                {villages.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              style={styles.textarea}
              placeholder="Detail alamat (RT/RW)"
              value={detailAlamat}
              onChange={(e) => setDetailAlamat(e.target.value)}
              required
            ></textarea>

            <div style={styles.footer}>
              <div style={styles.totalInfo}>
                <span style={styles.totalLabel}>Total Pembayaran</span>
                <span style={styles.totalValue}>
                  {formatPrice(product.harga * jumlah)}
                </span>
              </div>
              <button type="submit" style={styles.submitBtn} disabled={loading}>
                {loading ? "Memproses..." : "Konfirmasi & Bayar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modal: {
    backgroundColor: "var(--surface)",
    borderRadius: "var(--radius-lg)",
    width: "100%",
    maxWidth: "500px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "var(--shadow-lg)",
  },
  header: {
    padding: "1.5rem",
    borderBottom: "1px solid var(--border)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    backgroundColor: "var(--surface)",
    zIndex: 10,
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: 700,
    margin: 0,
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "var(--text-muted)",
    padding: "0 0.5rem",
  },
  content: {
    padding: "1.5rem",
  },
  productSummary: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    padding: "1rem",
    backgroundColor: "#f8fafc",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border)",
  },
  productName: {
    fontSize: "1rem",
    fontWeight: 700,
    marginBottom: "0.25rem",
  },
  productPrice: {
    color: "var(--primary)",
    fontWeight: 600,
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  qtyBtn: {
    width: "30px",
    height: "30px",
    borderRadius: "4px",
    border: "1px solid var(--border)",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  qtyValue: {
    width: "30px",
    textAlign: "center",
    fontWeight: 600,
  },
  sectionTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: "1rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginBottom: "1rem",
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    fontSize: "0.875rem",
    backgroundColor: "#fff",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    fontSize: "0.875rem",
    minHeight: "80px",
    resize: "vertical",
    marginBottom: "1.5rem",
  },
  footer: {
    borderTop: "1px solid var(--border)",
    paddingTop: "1.5rem",
  },
  totalInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  totalLabel: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--text-muted)",
  },
  totalValue: {
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "var(--primary)",
  },
  submitBtn: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "var(--primary)",
    color: "white",
    border: "none",
    borderRadius: "var(--radius-md)",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default CheckoutModal;
