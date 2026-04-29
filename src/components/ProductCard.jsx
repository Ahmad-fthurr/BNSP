import React, { useState } from "react";
import CheckoutModal from "./CheckoutModal";
import ayamgeprek from "../assets/ayamgeprek.png";
import bakso from "../assets/bakso.png";
import eskelapa from "../assets/eskelapa.png";
import esteh from "../assets/esteh.png";
import iphone from "../assets/iphone.png";
import jusapel from "../assets/jusapel.png";
import mieayam from "../assets/mieayam.png";
import radio from "../assets/radio.png";
import tv from "../assets/tv.png";
import defaultImg from "../assets/mie.png";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getProductImage = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("ayam geprek")) return ayamgeprek;
    if (lowerName.includes("bakso")) return bakso;
    if (lowerName.includes("es kelapa")) return eskelapa;
    if (lowerName.includes("es teh")) return esteh;
    if (lowerName.includes("iphone")) return iphone;
    if (lowerName.includes("jus apel")) return jusapel;
    if (lowerName.includes("mie ayam")) return mieayam;
    if (lowerName.includes("radio")) return radio;
    if (lowerName.includes("tv")) return tv;
    return defaultImg;
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img
          src={getProductImage(product.nama_produk)}
          alt={product.nama_produk}
          style={styles.image}
        />
        <div style={styles.categoryBadge}>
          {product.kategori?.nama_kategori || "Produk"}
        </div>
      </div>
      <div style={styles.content}>
        <h3 style={styles.productName}>{product.nama_produk}</h3>
        <div style={styles.priceContainer}>
          <span style={styles.price}>{formatPrice(product.harga)}</span>
          <span style={styles.stock}>Stok: {product.stok}</span>
        </div>
        <button
          className="btn btn-primary"
          style={styles.button}
          onClick={() => setShowModal(true)}
        >
          Beli Sekarang
        </button>
      </div>

      {showModal && (
        <CheckoutModal product={product} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "var(--surface)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    boxShadow: "var(--shadow-sm)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid var(--border)",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    position: "relative",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: "1/1",
    backgroundColor: "#f8fafc",
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  categoryBadge: {
    position: "absolute",
    top: "1rem",
    left: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(8px)",
    color: "var(--text-main)",
    padding: "0.4rem 0.8rem",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.7rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    boxShadow: "var(--shadow-sm)",
  },
  content: {
    padding: "1.5rem",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  productName: {
    fontSize: "1.125rem",
    fontWeight: 700,
    marginBottom: "0.75rem",
    color: "var(--text-main)",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    lineHeight: 1.4,
  },
  priceContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    marginTop: "auto",
  },
  price: {
    fontSize: "1.25rem",
    fontWeight: 800,
    color: "var(--primary)",
  },
  stock: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    backgroundColor: "var(--border)",
    padding: "0.2rem 0.5rem",
    borderRadius: "100px",
    fontWeight: 500,
  },
  button: {
    width: "100%",
    padding: "0.875rem",
  },
};

export default ProductCard;
