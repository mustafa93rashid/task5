// src/pages/Error/Error.tsx
import { Link } from "react-router-dom";
import "./Error.css";

const Error = () => {
  return (
    <div className="error-wrapper d-flex flex-column align-items-center justify-content-center text-center px-3">
      <div className="error-code-wrapper d-flex gap-2">
        <span className="error-digit delay-0">4</span>
        <span className="error-digit delay-1">0</span>
        <span className="error-digit delay-2">4</span>
      </div>

      <div className="error-icon mt-3">🚫</div>

      <h2 className="error-message mt-4">Page Not Found</h2>

      <p className="error-hint">
        The page you are looking for might be removed,<br />
        renamed, or temporarily unavailable.
      </p>

      <Link to="/home" className="error-btn mt-4">
        🔙 Back to Homepage
      </Link>
    </div>
  );
};

export default Error;
