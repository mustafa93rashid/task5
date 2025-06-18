import axios from "axios";
import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { AuthErrors } from "../../../types/AuthErrors";
import "./Signup.css";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import TitleComponent from "../../../components/TitleComponent/TitleComponent";
import Loader from '../../../components/Loader/Loader';
import PhotoUploadWidget from "../../../components/PhotoUploadWidget/PhotoUploadWidget";

const Signup = () => {
  const first_name = useRef<HTMLInputElement>(null);
  const last_name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const password_confirmation = useRef<HTMLInputElement>(null);
  const profile_image = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<AuthErrors>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  const navigate = useNavigate();

  const signupFields = [
    {
      label: "Name",
      placeholder: "First Name",
      type: "text",
      controlId: "firstName",
      ref: first_name,
      errorKey: "first_name",
      col: 6,
      autoComplete: "given-name"
    },
    {
      label: "&nbsp;",
      placeholder: "Last Name",
      type: "text",
      controlId: "lastName",
      ref: last_name,
      errorKey: "last_name",
      col: 6,
      autoComplete: "family-name"
    },
    {
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      controlId: "email",
      ref: email,
      errorKey: "email",
      col: 12,
      autoComplete: "email"
    },
    {
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      controlId: "password",
      ref: password,
      errorKey: "password",
      col: 6,
      autoComplete: "new-password"
    },
    {
      label: "&nbsp;",
      placeholder: "Re-enter your password",
      type: "password",
      controlId: "passwordConfirmation",
      ref: password_confirmation,
      errorKey: "password_confirmation",
      col: 6,
      autoComplete: "new-password"
    }
  ];

  const sendForm = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post(
        "https://web-production-3ca4c.up.railway.app/api/register",
        {
          first_name: first_name.current?.value,
          last_name: last_name.current?.value,
          user_name: first_name.current?.value + " " + last_name.current?.value,
          email: email.current?.value,
          password: password.current?.value,
          password_confirmation: password_confirmation.current?.value,
          profile_image: profile_image.current?.files?.[0]
        },
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("userName", res.data.data.user.user_name);
        localStorage.setItem("userImage", res.data.data.user.profile_image_url);
        navigate("/home");
        console.log("User registered successfully:", res.data);
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 250);
      });
  };

  return (
    <>
      {loading && <Loader />}
      <Form
        onSubmit={sendForm}
        className="bg-white rounded-4 d-flex flex-column justify-content-center align-items-center SignUpform"
      >
        <TitleComponent
          heading="SIGN UP"
          subheading="Fill in the following fields to create an account."
        />

        <Row className="w-100 ">
          {signupFields.map((field, index) => (
            <Col lg={field.col} className="mb-0 mb-lg-3" key={index}>
              <Form.Group controlId={field.controlId} className="position-relative">
                <Form.Label
                  dangerouslySetInnerHTML={{ __html: field.label }}
                  className="text-gray fs-14 SignUplabel"
                />
                <div className="position-relative">
                  <Form.Control
                    className="px-2 px-lg-3 py-2"
                    type={
                      field.controlId === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : field.controlId === "passwordConfirmation"
                          ? showConfirmPassword
                            ? "text"
                            : "password"
                          : field.type
                    }
                    placeholder={field.placeholder}
                    ref={field.ref}
                    autoComplete={field.autoComplete}
                  />
                  {(field.controlId === "password" || field.controlId === "passwordConfirmation") && (
                    <span
                      onClick={() =>
                        field.controlId === "password"
                          ? setShowPassword((prev) => !prev)
                          : setShowConfirmPassword((prev) => !prev)
                      }
                      className="position-absolute top-50 end-0 translate-middle-y me-2 text-gray"
                      style={{ cursor: "pointer" }}
                    >
                      {(field.controlId === "password" && showPassword) ||
                        (field.controlId === "passwordConfirmation" && showConfirmPassword) ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </span>
                  )}
                </div>
                {errors?.[field.errorKey as keyof AuthErrors] && (
                  <p className="fs-12 text-orange mt-2 mx-1">
                    {errors[field.errorKey as keyof AuthErrors]?.[0]}
                  </p>
                )}
              </Form.Group>
            </Col>
          ))}

          <Col lg={12} className="mb-3">
            <Form.Group controlId="profileImage">
              <Form.Label className="mb-2 mb-lg-3 text-gray fs-14">Profile Image</Form.Label>
              <PhotoUploadWidget ref={profile_image} />
            </Form.Group>
          </Col>
        </Row>

        <SubmitButton
          buttonText="SIGN UP"
          to="/"
          linkText="Do you have an account?"
          linkLabel=" Sign in"
          authClass="w-100 p-2 p-lg-3"
        />
      </Form>
    </>

  );
};

export default Signup;
