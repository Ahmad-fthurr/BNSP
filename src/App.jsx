import { Route, Routes } from "react-router-dom";
import "./App.css";
import Kategori from "./pages/Kategori/Kategori";
import DashboardLayout from "./pages/DashboardLayout/DashboardLayout";
import AddKategori from "./pages/Kategori/AddKategori";
import Produk from "./pages/Produk/Produk";
import Pesanan from "./pages/Pesanan/Pesanan";
import Pelanggan from "./pages/Pelanggan/Pelanggan";
import Kartu from "./pages/Kartu/Kartu";
import Users from "./pages/Users/Users";
import History from "./pages/History/History";

//  function versi terbaru
function App() {
  // di tempat ini untuk buat logika jangan di dalam return
  const a = 10;
  const b = 20;
  console.log(a + b);

  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Hello word</h1>} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<h1>Dashboard</h1>} />

          {/* Pesanan */}
          <Route path="/dashboard/pesanan" element={<Pesanan />} />

          {/* Produk */}
          <Route path="/dashboard/produk" element={<Produk />} />
          <Route path="/dashboard/produk/add" element={<AddKategori />} />
          <Route path="/dashboard/produk/edit" element={<h1>Edit Produk</h1>} />

          {/* Jenis Produk */}
          <Route path="/dashboard/kategori" element={<Kategori />} />
          <Route path="/dashboard/kategori/add" element={<AddKategori />} />

          {/* Pelanggan */}
          <Route path="/dashboard/pelanggan" element={<Pelanggan />} />

          {/* Kartu */}
          <Route path="/dashboard/kartu" element={<Kartu />} />

          {/* Users */}
          <Route path="/dashboard/users" element={<Users />} />

          {/* History */}
          <Route path="/dashboard/history" element={<History />} />
        </Route>
      </Routes>
      {/* <h1>To-do List: &rarr; &#9728; </h1>
      <ol>
        <li>&clubs; Mengerjakan tugas front-end</li>
        <li>&spades; Mempelajari tutorial react js</li>
        <li>&diams; Murojaah</li>
      </ol> */}
    </>
  );
}

export default App;

//  Ini versi yang terlama Class

// class Footer extends Component {
//   render() {
//     return(
//       <footer>
//         <h3>Copyright &copy;2026 Developed by Ahmad fathurrahman Ramdhani &#10003; </h3>
//         <span>Make with &#10084; &#128152; &#9733;</span>
//       </footer>
//     )
//   }
// }
