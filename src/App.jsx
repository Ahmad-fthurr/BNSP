import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Kategori from "./pages/Kategori/Kategori";
import DashboardLayout from "./pages/DashboardLayout/DashboardLayout";
import AddKategori from "./pages/Kategori/AddKategori";
import Produk from "./pages/Produk/Produk";
import AddProduk from "./pages/Produk/AddProduk";
import Pesanan from "./pages/Pesanan/Pesanan";
import Pelanggan from "./pages/Pelanggan/Pelanggan";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import EditProduk from "./pages/Produk/EditProduk";
import CheckoutSelesai from "./pages/Checkout/CheckoutSelesai";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />

          <Route path="pesanan-saya" element={<Orders />} />

          <Route path="produk" element={<Produk />} />
          <Route path="produk/add" element={<AddProduk />} />
          <Route path="produk/edit/:id" element={<EditProduk />} />

          <Route path="kategori" element={<Kategori />} />
          <Route path="kategori/add" element={<AddKategori />} />

          <Route path="pelanggan" element={<Pelanggan />} />

          <Route path="pesanan" element={<Pesanan />} />
          <Route path="checkout-selesai" element={<CheckoutSelesai />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
