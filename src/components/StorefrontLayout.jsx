import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const StorefrontLayout = ({ children }) => {
  return (
    <div style={styles.wrapper}>
      <Navbar />
      <main style={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    flex: 1,
  },
};

export default StorefrontLayout;
