import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AddKategori = () => {
  const navigate = useNavigate();
  const [namaKategori, setNamaKategori] = useState("");
  const [gambar, setGambar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/jenis-produk`,
        {
          nama: namaKategori,
          gambar,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      navigate(-1);
    } catch (error) {
      console.log(error.response);
      const apiErrors = error.response.data.errors || [];
      if (apiErrors.length > 0) {
        const errorPerField = {};
        apiErrors.forEach((e) => {
          errorPerField[e.path] = e.msg;
        });
        setErrors(errorPerField);
      } else {
        setErrors({
          global: error.response.data.msg || "Gagal Menyimpan",
        })
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreview(URL.createObjectURL(file)); // untuk review gambar
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <h3>Tambah Kategori</h3>
      </div>

      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-grid">
          <label htmlFor="nama">Nama Kategori</label>
          <input
            type="text"
            id="nama"
            placeholder="Contoh: Elektronik"
            onChange={(e) => setNamaKategori(e.target.value)}
            required
          />
          {errors.nama && (
            <span className="error" style={{ color: "red" }}>
              {errors.nama}
            </span>
          )}
        </div>

        <div className="form-grid">
          <label htmlFor="Gambar">Gambar</label>
          <input
            type="file"
            id="gambar"
            accept="image/*"
            onChange={handleChangeImage}
          />
          {preview && <img src={preview} alt="image-preview" width={220} />}
          {errors.global && (
            <span className="error" style={{ color: "red" }}>
              {errors.global}
            </span>
          )}
        </div>

        <div className="btn-group">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-delete"
            disabled={loading}
          >
            Batal
          </button>

          <button type="submit" className="btn-tambah" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddKategori;
