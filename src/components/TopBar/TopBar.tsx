import React from "react";

type TopBarProps = {
  userName: string;
};

const TopBar: React.FC<TopBarProps> = ({ userName }) => {
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  };

  const greeting = getGreeting();

  return (
    <div className="topbar px-4 py-3 border boxShadow main-content w-100 mb-4 rounded-2">
      <h5 className="mb-0 fs-6 text-center text-lg-start ">
        👋 {greeting}, <span className="text-orange">{userName}</span>
      </h5>
    </div>
  );
};

export default TopBar;