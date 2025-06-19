// SubmitButton.tsx
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { SubmitButtonProps } from "../../types/SubmitButtonTypes.ts";
import "./SubmitButton.css";

const SubmitButton = ({ buttonText, to="", linkText, linkLabel, onClick, type = "submit", className = "", authClass }: SubmitButtonProps) => {
  return (
    <>
      {/* Main submit button */}
      <Button type={type} onClick={onClick} className={` ${className} ${authClass} bg-orange border-0 btnHover`}>
        {buttonText}
      </Button>

      {/* Optional link section under the button */}
      {linkText && linkLabel && (
        <p className="mt-2 mt-lg-4 fs-14 text-gray parUnderline">
          {linkText}
          <Link to={to} className="linkUnderline">
            {linkLabel}
          </Link>
        </p>
      )}
    </>
  );
};

export default SubmitButton;
