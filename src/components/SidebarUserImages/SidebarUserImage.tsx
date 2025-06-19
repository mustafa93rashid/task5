import "./SidebarUserImage.css";
import { useEffect, useState } from "react";
interface SidebarUserImageProps {
  showName?: boolean;
  isCollapsed?: boolean;
}

const SidebarUserImage = ({ showName = true, isCollapsed = false }: SidebarUserImageProps) => {
  const [userName, setUserName] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");

  useEffect(() => {
    const name = localStorage.getItem("userName") || "";
    const image = localStorage.getItem("userImage") || "";
    setUserName(name);
    setUserImage(image);
  }, []); 
  
  return (
    <div className="d-flex align-items-center justify-content-center flex-column gap-3">
      <img
        src={userImage || "/task5/images/Home/sidebar/defaultuserimage.jpg"}
        alt="User"
        className={`rounded-circle sidebarUserImage ${isCollapsed ? "collapsed-user-img" : ""}`}
      />
      {showName && !isCollapsed && (
        <span className="fw-bold sideBarUserName mt-2">{userName}</span>
      )}
    </div>
  );
};

export default SidebarUserImage;