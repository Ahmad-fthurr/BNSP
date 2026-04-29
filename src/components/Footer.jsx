import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.footerContent}>
          <div style={styles.brandInfo}>
            <h2 style={styles.logo}>
              CORE<span style={styles.logoSpan}>FOOD</span>
            </h2>
            <p style={styles.description}>
              Destinasi belanja digital terdepan yang menghadirkan produk
              berkualitas tinggi dengan pengalaman belanja yang mulus dan aman.
            </p>
            <div style={styles.socials}>
              <div style={styles.socialIcon}>Fb</div>
              <div style={styles.socialIcon}>Ig</div>
              <div style={styles.socialIcon}>Tw</div>
            </div>
          </div>
          <div style={styles.linksSection}>
            <h3 style={styles.linkTitle}>Perusahaan</h3>
            <ul style={styles.links}>
              <li>
                <a href="/" style={styles.link}>
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="/produk" style={styles.link}>
                  Karir
                </a>
              </li>
              <li>
                <a href="/tentang" style={styles.link}>
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div style={styles.linksSection}>
            <h3 style={styles.linkTitle}>Dukungan</h3>
            <ul style={styles.links}>
              <li>
                <a href="/kontak" style={styles.link}>
                  Pusat Bantuan
                </a>
              </li>
              <li>
                <a href="/faq" style={styles.link}>
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="/kebijakan" style={styles.link}>
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div style={styles.copyright}>
          <p>
            &copy; 2026 COREFOOD. Dibuat dengan dedikasi untuk pengalaman
            belanja terbaik.
          </p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    padding: "5rem 0 3rem",
    marginTop: "8rem",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  footerContent: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr 1fr",
    gap: "5rem",
    marginBottom: "4rem",
  },
  brandInfo: {
    maxWidth: "360px",
  },
  logo: {
    fontSize: "1.75rem",
    fontWeight: 800,
    marginBottom: "1.5rem",
    letterSpacing: "-0.02em",
  },
  logoSpan: {
    color: "#818cf8",
  },
  description: {
    color: "#94a3b8",
    lineHeight: 1.8,
    fontSize: "0.9375rem",
    marginBottom: "2rem",
  },
  socials: {
    display: "flex",
    gap: "1rem",
  },
  socialIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  linkTitle: {
    fontSize: "1.125rem",
    fontWeight: 700,
    marginBottom: "1.5rem",
    color: "#ffffff",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  link: {
    color: "#94a3b8",
    fontSize: "0.9375rem",
    transition: "color 0.2s ease",
  },
  copyright: {
    borderTop: "1px solid rgba(255,255,255,0.05)",
    paddingTop: "2.5rem",
    textAlign: "center",
    color: "#64748b",
    fontSize: "0.875rem",
  },
};

export default Footer;
