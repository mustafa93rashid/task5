import { Outlet } from "react-router-dom"
import "./Auth.css"

const Auth = () => {
  return (
    <div className="d-flex justify-content-center align-items-center authBackground">
      <Outlet />
    </div>
  )
}

export default Auth