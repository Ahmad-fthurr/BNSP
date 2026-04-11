import axios from "axios";
import { useEffect, useState } from "react";

const Produk = () => {
  const [categories, setCategories] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/produk`);
      setCategories(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ITEMS_PER_PAGE = 10;

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE) || 1;

  const pagiData = categories.slice(
    (currentpage - 1) * ITEMS_PER_PAGE,
    currentpage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (uuid) => {
    const msg = window.confirm("Yakin ingin menghapus Produk ini?");
    if (!msg) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/produk/${uuid}`);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="produk-container">
      <h3>Daftar Produk</h3>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Harga</th>
              <th>stok</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pagiData.map((category, index) => (
              <tr key={category.uuid || index}>
                <td>{(currentpage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td>{category.nama_barang}</td>
                <td>{category.harga}</td>
                <td>{category.stok}</td>
                <td>
                  <img
                    src={category.url}
                    alt="gambar"
                    width={120}
                    style={{ borderRadius: "8px" }}
                  />
                </td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(category.uuid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="btn-page"
          disabled={currentpage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          &laquo; Prev
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            className="btn-page"
            disabled={currentpage === i + 1}
            key={i}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn-page"
          disabled={currentpage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          &raquo; Next
        </button>
      </div>
    </div>
  );
};

export default Produk;
