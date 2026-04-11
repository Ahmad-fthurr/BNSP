import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import "./Kategori.css";
import LogoPetik from "../../assets/petik.jpeg";

const Kategori = () => {
  const [categories, setcategories] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductCategories();
  }, []);

  const getProductCategories = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/jenis-produk`,
      );

      setcategories(result.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = categories.filter((category) => {
    return category.nama?.toLowerCase().includes(search.toLowerCase());
  });

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // digunakan untuk memilah di satu halaman ada 10 data
  const paginatedData = filteredData.slice(
    (currentpage - 1) * ITEMS_PER_PAGE,
    currentpage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleDelete = async (uuid) => {
    const msg = window.confirm("Yakin ingin menghapus Kategori ini?");
    if (!msg) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/jenis-produk/${uuid}`,
      );
      getProductCategories();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="kategori-top-bar">
        <div className="kategori-header">
          <h3>Daftar Kategori</h3>
        </div>

        <div className="action-group">
          <img src={LogoPetik} alt="logo" className="logo-above-btn" />
          <NavLink to="/dashboard/kategori/add" className="btn-add">Tambah Kategori</NavLink>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <td key={i}>
                        <skeleton />
                      </td>
                    ))}
                  </tr>
                ))
              : paginatedData.map((category, index) => (
                  <tr key={index}>
                    <td>{(currentpage - 1) * ITEMS_PER_PAGE + 1 + index}</td>
                    <td>{category.nama}</td>
                    <td>
                      <img src={category.url} alt="gambar" width={120} />
                    </td>
                    <td>
                      <button className="btn-edit" >Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(category.uuid)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {/* PAGINATION */}
      {/* CurrentPage */}
      {/* totalPages */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default Kategori;
