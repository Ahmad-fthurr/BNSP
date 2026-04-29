import React from "react";
import heroImg from "../assets/herodiberanda.png";

const Hero = () => {
  return (
    <section style={styles.heroSection}>
      <div className="container">
        <div style={styles.heroBanner}>
          <div style={styles.heroContent}>
            <div style={styles.badge}>Promo Eksklusif</div>
            <h1 style={styles.title}>
              Nikmati Hidangan & <br />
              <span style={styles.highlight}>Produk Pilihan</span>
            </h1>
            <p style={styles.subtitle}>
              Dapatkan diskon hingga 20% untuk semua item hari ini. 
              Kualitas premium dengan layanan pengantaran super cepat.
            </p>
            <div style={styles.cta}>
              <button 
                className="btn" 
                style={styles.ctaBtn}
                onClick={() => document.getElementById('produk-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
          <div style={styles.imageSection}>
            <img src={heroImg} alt="Hero" style={styles.heroImage} />
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  heroSection: {
    padding: "3rem 0",
    marginBottom: "2rem",
  },
  heroBanner: {
    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    borderRadius: "var(--radius-lg)",
    padding: "4rem",
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    alignItems: "center",
    gap: "3rem",
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)",
    minHeight: "450px",
  },
  heroContent: {
    textAlign: "left",
    color: "#ffffff",
  },
  badge: {
    display: "inline-block",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: "#ffffff",
    padding: "0.5rem 1.25rem",
    borderRadius: "100px",
    fontSize: "0.8125rem",
    fontWeight: 700,
    marginBottom: "1.5rem",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  title: {
    fontSize: "3.25rem",
    fontWeight: 800,
    marginBottom: "1.5rem",
    lineHeight: 1.1,
    color: "#ffffff",
    letterSpacing: "-0.02em",
  },
  highlight: {
    color: "#fbbf24",
  },
  subtitle: {
    fontSize: "1.125rem",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: "2.5rem",
    lineHeight: 1.7,
    maxWidth: "500px",
  },
  ctaBtn: {
    padding: "0.625rem 2rem",
    fontSize: "0.9375rem",
    backgroundColor: "#ffffff",
    color: "#4f46e5",
    border: "none",
    fontWeight: 700,
    borderRadius: "var(--radius-md)",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  imageSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    maxHeight: "350px",
    objectFit: "cover",
    borderRadius: "var(--radius-md)",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },
};

export default Hero;
