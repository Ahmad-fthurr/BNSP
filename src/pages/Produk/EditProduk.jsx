import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditProduk.css";

const EditProduk = () => {
  const { id } = useParams();
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

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    if (id) {
      fetchProduk();
      fetchKategori();
    }
  }, [id]);

  const fetchProduk = async () => {
    try {

      let res;
      try {
        res = await axios.get(`${API_URL}/produk/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) {
        console.log("Gagal fetch single, mencoba fetch list...");
        const listRes = await axios.get(`${API_URL}/produk`);
        const allProducts = Array.isArray(listRes.data) ? listRes.data : listRes.data.data || [];
        const found = allProducts.find(p => String(p.id) === String(id));

        if (found) {
          res = { data: { data: found } };
        } else {
          throw new Error("Produk tidak ditemukan di daftar");
        }
      }

      const data = res.data.data || res.data;
      console.log("DATA PRODUK TERAMBIL:", data);

      setFormData({
        nama_produk: data.nama_produk || "",
        harga: data.harga || "",
        stok: data.stok || "",
        kategori_id: data.kategori_id || data.kategori?.id || "",
      });
    } catch (err) {
      console.log("ERROR GET:", err);
      setError("Gagal mengambil data produk. Silakan coba lagi.");
    }
  };

  const fetchKategori = async () => {
    try {
      const res = await axios.get(`${API_URL}/kategori`);
      const categories = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setKategoriList(categories);
    } catch (err) {
      console.log("ERROR KATEGORI:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

      console.log("SENDING PAYLOAD:", payload);

      await axios.put(`${API_URL}/produk/update/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      navigate("/dashboard/produk");
    } catch (err) {
      console.log("ERROR UPDATE:", err.response);
      setError(err.response?.data?.message || "Gagal update produk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Edit Produk</h2>
        <p className="subtitle">Perbarui informasi produk</p>
      </div>

      <div className="card">
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="formGrid">
            <div className="inputGroup">
              <label className="label">Nama Produk</label>
              <input
                type="text"
                name="nama_produk"
                value={formData.nama_produk}
                onChange={handleChange}
                className="input"
                placeholder="Nama Produk"
                required
              />
            </div>

            <div className="row">
              <div className="inputGroup">
                <label className="label">Harga (Rp)</label>
                <input
                  type="number"
                  name="harga"
                  value={formData.harga}
                  onChange={handleChange}
                  className="input"
                  placeholder="Harga"
                  required
                />
              </div>

              <div className="inputGroup">
                <label className="label">Stok</label>
                <input
                  type="number"
                  name="stok"
                  value={formData.stok}
                  onChange={handleChange}
                  className="input"
                  placeholder="Stok"
                  required
                />
              </div>
            </div>

            <div className="inputGroup">
              <label className="label">Kategori</label>
              <select
                name="kategori_id"
                value={formData.kategori_id}
                onChange={handleChange}
                className="select"
                required
              >
                <option value="">Pilih Kategori</option>
                {kategoriList.map((kat) => (
                  <option key={kat.id || kat.uuid} value={kat.id || kat.uuid}>
                    {kat.nama_kategori || kat.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="footer">
            <button
              type="button"
              className="btnCancel"
              onClick={() => navigate(-1)}
            >
              Batal
            </button>

            <button type="submit" className="btnSubmit">
              {loading ? "Menyimpan..." : "Update Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduk;
