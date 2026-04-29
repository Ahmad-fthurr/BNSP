import React from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { products, categories, loading, selectedCategory, setSelectedCategory, searchQuery } = useProducts();
  const { user } = useAuth();

  return (
    <div className="animate-fade-in">
      {user && (
        <div style={styles.welcomeBanner}>
          <h1 style={styles.welcomeText}>
            Selamat Datang, <span style={styles.userName}>{user.nama || user.name}!</span>👋
          </h1>
          <p style={styles.welcomeSub}>Mau belanja apa hari ini?</p>
        </div>
      )}
      <Hero />

      <div className="container" id="produk-section">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            {searchQuery ? `Hasil pencarian untuk "${searchQuery}"` : "Produk Terbaru"}
          </h2>
          <div style={styles.categories}>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`btn ${!selectedCategory ? "btn-primary" : "btn-outline"}`}
              style={styles.categoryBtn}
            >
              Semua
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn ${selectedCategory === cat.id ? "btn-primary" : "btn-outline"}`}
                style={styles.categoryBtn}
              >
                {cat.nama_kategori}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={styles.loading}>Memuat produk...</div>
        ) : products.length > 0 ? (
          <div style={styles.productGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={styles.empty}>
            <p>Tidak ada produk yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  welcomeBanner: {
    padding: "1rem 2rem",
    marginBottom: "1rem",
  },
  welcomeText: {
    fontSize: "1.75rem",
    fontWeight: 800,
    color: "var(--text-main)",
    letterSpacing: "-0.02em",
  },
  userName: {
    color: "var(--primary)",
  },
  welcomeSub: {
    color: "var(--text-muted)",
    fontSize: "1rem",
    marginTop: "0.25rem",
  },
  sectionHeader: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    marginBottom: "2.5rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
  },
  categories: {
    display: "flex",
    gap: "0.75rem",
    overflowX: "auto",
    paddingBottom: "0.5rem",
  },
  categoryBtn: {
    whiteSpace: "nowrap",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "2rem",
  },
  loading: {
    textAlign: "center",
    padding: "5rem 0",
    color: "var(--text-muted)",
  },
  empty: {
    textAlign: "center",
    padding: "5rem 0",
    backgroundColor: "var(--surface)",
    borderRadius: "var(--radius-md)",
    border: "1px dashed var(--border)",
  },
};

export default Home;
