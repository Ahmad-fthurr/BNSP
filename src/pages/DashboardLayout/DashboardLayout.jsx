import { Outlet } from "react-router-dom";
import MyNabvar from "../../components/Nabvar/MyNabvar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./DashboardLayout.css";
import { useState } from "react";

const DashboardLayout = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <MyNabvar search={search} setSearch={setSearch} />
        <main className="dashboard-content">
            {/* context itu global */}
          <Outlet context={{search}}/>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
