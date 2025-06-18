import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import NotificationPanel from "../../components/NotificationPanel/NotificationPanel";
import "./Home.css";
import Reporting from "../../components/Reporting/Reporting";
import TopBar from "../../components/TopBar/TopBar";

type NotificationLog = {
  id: number;
  type: "add" | "edit" | "delete";
  name: string;
  price: string | number;
  timestamp: string;
};

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logs, setLogs] = useState<NotificationLog[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
  }, []);

  useEffect(() => {
    const fetchLogs = () => {
      const storedLogs = localStorage.getItem("notifications");
      if (storedLogs) {
        setLogs(JSON.parse(storedLogs));
      }
    };

    fetchLogs();

    window.addEventListener("notificationLogUpdated", fetchLogs);
    return () => window.removeEventListener("notificationLogUpdated", fetchLogs);
  }, []);

  const handleClearLogs = () => {
    localStorage.removeItem("notifications");
    setLogs([]);
  };

  const isHomeRoute = location.pathname === "/home";

  return (
    <div className="d-flex" style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <SideBar />

      <div className="w-100  py-3 d-flex gap-4">
        {isHomeRoute && (
          <div className="home-content w-100">
            <TopBar userName={localStorage.getItem("userName") || "User"} />
            <Reporting />
            <NotificationPanel logs={logs} onClear={handleClearLogs} />
          </div>
        )}

        <div className="flex-fill main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;



