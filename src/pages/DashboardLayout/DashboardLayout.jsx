import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div style={styles.layout}>
      <Navbar />
      <div style={styles.body}>
        <Sidebar />
        <main style={styles.main}>
          <div className="container animate-fade-in" style={styles.container}>
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "var(--background)",
  },
  body: {
    display: "flex",
    flex: 1,
  },
  main: {
    flex: 1,
    padding: "2rem 0",
    overflowY: "auto",
  },
  container: {
    padding: "0 2rem",
  }
};

export default DashboardLayout;


