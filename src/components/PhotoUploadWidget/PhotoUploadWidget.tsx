import { useState, useImperativeHandle, forwardRef, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./PhotoUploadWidget.css";

type Props = {
  addNewItem?: string;
  initialImage?: string;
  addEditPageIconClass?: string;
};

const PhotoUploadWidget = forwardRef<HTMLInputElement, Props>(({ initialImage, addNewItem, addEditPageIconClass }, ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useImperativeHandle(ref, () => fileInputRef.current as HTMLInputElement);

  useEffect(() => {
    if (initialImage) {
      setPreview(initialImage);
    }
  }, [initialImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form.Group>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="d-none"
      />

      <div
        className={`upload-box rounded-2 d-flex justify-content-center align-items-center ${addNewItem || ""}`}
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="upload-preview" />
        ) : (
          <img src="/task5/images/Auth/Uploadicon.svg" alt="profie picture" className={`${addEditPageIconClass}`} />
        )}
      </div>
    </Form.Group>
  );
});

export default PhotoUploadWidget;
