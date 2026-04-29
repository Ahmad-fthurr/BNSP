import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import backgroundImage from "../assets/halamanutama.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (result.success) {
      toast.success("Login berhasil! 🎉");
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.backgroundContainer}>
        <img src={backgroundImage} alt="Background" style={styles.backgroundImage} />
        <div style={styles.overlay}></div>
      </div>

      <div style={styles.mainContent}>

        <div style={styles.leftSection}>
          <div style={styles.brandContainer}>
            <div style={styles.logoWrapper}>
              <h1 style={styles.brandName}>COREFOOD</h1>
              <div style={styles.brandLine}></div>
            </div>
            <h2 style={styles.heroTitle}>
              SHOP THE <br />
              BEST ITEMS
            </h2>
            <p style={styles.heroSubtitle}>
              Experience premium quality and exclusive deals. <br />
              Your satisfaction is our top priority.
            </p>
            <p style={styles.heroDetail}>
              Join thousands of happy customers and discover a new way of shopping today.
            </p>
          </div>
        </div>


        <div style={styles.rightSection}>
          <div style={styles.glassCard}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  style={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    style={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.toggleButton}
                  >
                    {showPassword ? "👁️‍🗨️" : "👁️"}
                  </button>
                </div>
                <div style={styles.forgotContainer}>
                  <Link to="#" style={styles.forgotLink}>Forgot password?</Link>
                </div>
              </div>

              {error && <div style={styles.errorText}>{error}</div>}

              <button type="submit" style={styles.signInButton}>
                SIGN IN
              </button>

              <div style={styles.dividerContainer}>
                <div style={styles.dividerLine}></div>
                <span style={styles.dividerText}>or</span>
                <div style={styles.dividerLine}></div>
              </div>

              <button type="button" style={styles.googleButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "10px" }}>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign in with Google
              </button>

              <p style={styles.signupText}>
                Are you new? <Link to="/register" style={styles.signupLink}>Create an Account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.3)",
  },
  mainContent: {
    display: "flex",
    width: "100%",
    maxWidth: "1200px",
    padding: "2rem",
    gap: "2rem",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  leftSection: {
    flex: 1,
    minWidth: "320px",
    color: "#fff",
    padding: "2rem",
  },
  brandContainer: {
    maxWidth: "500px",
  },
  logoWrapper: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "2rem",
  },
  brandName: {
    fontSize: "2.5rem",
    fontWeight: "800",
    letterSpacing: "4px",
    margin: 0,
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },
  brandLine: {
    width: "60px",
    height: "4px",
    background: "#fff",
    marginTop: "4px",
  },
  heroTitle: {
    fontSize: "4.5rem",
    fontWeight: "900",
    lineHeight: "1.1",
    margin: "1rem 0",
    textShadow: "0 4px 10px rgba(0,0,0,0.5)",
  },
  heroSubtitle: {
    fontSize: "1.25rem",
    fontWeight: "500",
    opacity: "0.95",
    marginBottom: "1.5rem",
    lineHeight: "1.6",
  },
  heroDetail: {
    fontSize: "1rem",
    opacity: "0.8",
    lineHeight: "1.6",
  },
  rightSection: {
    flex: 1,
    minWidth: "320px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  glassCard: {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    borderRadius: "24px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "3rem 2.5rem",
    width: "100%",
    maxWidth: "450px",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    color: "#fff",
    fontSize: "0.9rem",
    fontWeight: "500",
    opacity: "0.9",
  },
  input: {
    width: "100%",
    padding: "0.875rem 1rem",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    background: "rgba(255, 255, 255, 0.9)",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s ease",
  },
  toggleButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
  },
  forgotContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "0.5rem",
  },
  forgotLink: {
    color: "#fff",
    fontSize: "0.85rem",
    opacity: "0.8",
    textDecoration: "underline",
  },
  signInButton: {
    padding: "1rem",
    borderRadius: "12px",
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "0.5rem",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
  },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    margin: "0.5rem 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "rgba(255, 255, 255, 0.3)",
  },
  dividerText: {
    color: "#fff",
    fontSize: "0.9rem",
    opacity: "0.8",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.875rem",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    background: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  signupText: {
    textAlign: "center",
    color: "#fff",
    fontSize: "0.95rem",
    marginTop: "1rem",
  },
  signupLink: {
    color: "#fff",
    fontWeight: "700",
    textDecoration: "underline",
  },
  errorText: {
    background: "rgba(239, 68, 68, 0.2)",
    color: "#fca5a5",
    padding: "0.75rem",
    borderRadius: "8px",
    fontSize: "0.875rem",
    textAlign: "center",
    border: "1px solid rgba(239, 68, 68, 0.3)",
  }
};

export default Login;
