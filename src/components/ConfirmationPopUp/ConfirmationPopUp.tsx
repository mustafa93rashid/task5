import React from "react";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./ConfirmationPopUp.css";

type ConfirmationPopUpProps = {
  title: string;
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationPopUp: React.FC<ConfirmationPopUpProps> = ({ title, show, onConfirm, onCancel }) => {
  return (
    <>
      {show && (
        <div className="confirmation-overlay d-flex justify-content-center align-items-center w-100 h-100 position-fixed top-0 start-0">
          <div className="confirmation-modal bg-white rounded-4 boxShadow">
            <h5 className="mb-3 text-center">{title}</h5>
            <div className="d-flex justify-content-around gap-3">
              <SubmitButton buttonText="Yes" type="button" onClick={onConfirm} className="confirmationButton fs-14 fw-medium" />
              <SubmitButton buttonText="No" type="button" onClick={onCancel} className="confirmationButton fs-14 fw-medium" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationPopUp;
