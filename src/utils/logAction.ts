export type NotificationType = "add" | "edit" | "delete";

interface NotificationLog {
  id: number;
  type: NotificationType;
  name: string;
  price: string | number;
  timestamp: string;
}

export const logAction = (type: NotificationType, item: { name: string; price: string | number }) => {
  const logs: NotificationLog[] = JSON.parse(localStorage.getItem("notifications") || "[]");

  const newLog: NotificationLog = {
    id: Date.now(),
    type,
    name: item.name,
    price: item.price,
    timestamp: new Date().toLocaleString(),
  };

  const updatedLogs = [newLog, ...logs.slice(0, 6)];
  localStorage.setItem("notifications", JSON.stringify(updatedLogs));

  window.dispatchEvent(new Event("notificationLogUpdated"));
};

