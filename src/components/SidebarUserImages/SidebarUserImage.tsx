import { useEffect, useState } from "react";
import "./SidebarUserImage.css";

interface SidebarUserImageProps {
  showName?: boolean;
  isCollapsed?: boolean;
}

const SidebarUserImage = ({ showName = true, isCollapsed = false }: SidebarUserImageProps) => {
  const [userName, setUserName] = useState<string>();
  const [userImage, setUserImage] = useState<string>();

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "");
    setUserImage(localStorage.getItem("userImage") || "");
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center flex-column gap-3 ">
      {userImage ? (
        <img
          src={userImage}
          alt="User"
          className={`rounded-circle sidebarUserImage ${isCollapsed ? "collapsed-user-img" : ""}`}
        />
      ) : (
        <img
          src="/task5/images/Home/sidebar/defaultuserimage.jpg"
          alt="Default user"
          className={`rounded-circle sidebarUserImage ${isCollapsed ? "collapsed-user-img" : ""}`}
        />
      )}

      {showName && <p className="fw-bold sideBarUserName mt-2">{userName}</p>}
    </div>
  );
};

export default SidebarUserImage;