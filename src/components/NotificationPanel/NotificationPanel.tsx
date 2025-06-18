import { useState, useEffect } from "react";
import "./NotificationsTable.css";
import Pagination from "../Pagination/Pagination";
import SubmitButton from "../SubmitButton/SubmitButton";

type NotificationLog = {
  id: number;
  name: string;
  price: number | string;
  timestamp: string;
  type: "add" | "edit" | "delete";
};

const NotificationsTable = ({ logs, onClear, }: { logs: NotificationLog[]; onClear: () => void; }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;
  const [currentLogs, setCurrentLogs] = useState<NotificationLog[]>([]);

  const totalPages = Math.ceil(logs.length / itemsPerPage);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    setCurrentLogs(logs.slice(start, end));
  }, [currentPage, logs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-4 mt-5 main-content w-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Notification</h4>
        {logs.length > 0 && (
          <SubmitButton
            buttonText="Clear All"
            className="px-3"
            onClick={onClear}
          />
        )}
      </div>

      {logs.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="table table-hover align-middle fs-14 no-side-borders">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.map((log) => {
                  const [date] = log.timestamp?.split("T") || ["N/A"];
                  const badgeClass =
                    log.type === "add"
                      ? "bg-success"
                      : log.type === "edit"
                        ? "bg-primary"
                        : "bg-danger";

                  return (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.name}</td>
                      <td>${log.price}</td>
                      <td>{date}</td>
                      <td>
                        <span className={`badge ${badgeClass}`}>
                          {log.type.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-muted text-center">No notifications yet.</div>
      )}
    </div>
  );
};

export default NotificationsTable;
