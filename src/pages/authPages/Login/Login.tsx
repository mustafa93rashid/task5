import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, type FormEvent } from "react";
import axios from "axios";
import type { AuthErrors } from '../../../types/AuthErrors';
import './Login.css';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';
import TitleComponent from '../../../components/TitleComponent/TitleComponent';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from '../../../components/Loader/Loader';

const Login = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<AuthErrors>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const LoginData = [
    {
      text: "Email",
      placeholder: "Enter your email",
      type: "email",
      controlId: "formBasicEmail",
      ref: email,
      autocomplete: "email",
      hasToggle: false,
      errorKey: "email"
    },
    {
      text: "Password",
      placeholder: "Enter your password",
      type: "password",
      controlId: "formBasicPassword",
      ref: password,
      autocomplete: "current-password",
      hasToggle: true,
      errorKey: "password"
    }
  ];

  const sendForm = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    axios.post("https://web-production-3ca4c.up.railway.app/api/login", {
      email: email.current?.value,
      password: password.current?.value,
    },
      {
        headers: {
          Accept: "application/json"
        }
      })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.user.user_name);
        localStorage.setItem('userImage', res.data.user.profile_image_url);
        navigate("/home");
      })
      .catch(err => {
        if (err.response.status == 401)
          setErrors(err.response.data)
        else
          setErrors(err.response.data.errors)
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
      <Form onSubmit={sendForm} className='bg-white rounded-4 d-flex flex-column justify-content-center align-items-center formcontainer boxShadow '>
        <TitleComponent
          heading="SIGN IN"
          subheading="Enter your credentials to access your account"
        />

        {LoginData.map((data, index) => (
          <div key={index} className="w-100 mb-4">
            <Form.Group controlId={data.controlId} className="position-relative">
              <Form.Label className="text-gray fs-14">{data.text}</Form.Label>

              <div className="position-relative">
                <Form.Control
                  className="px-4 py-3 rounded-1 loginForm"
                  type={
                    data.hasToggle
                      ? showPassword
                        ? "text"
                        : "password"
                      : data.type
                  }
                  placeholder={data.placeholder}
                  ref={data.ref}
                  autoComplete={data.autocomplete}
                />

                {data.hasToggle && (
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
              </div>

              {errors?.[data.errorKey as keyof AuthErrors] && (
                <p className="fs-12 text-orange mt-2 mx-1">
                  {errors[data.errorKey as keyof AuthErrors]?.[0]}
                </p>
              )}
            </Form.Group>
          </div>
        ))}

        {errors?.msg && <p className="fs-12 text-orange mb-2 text-center">{errors.msg}</p>}

        <SubmitButton
          buttonText="SIGN IN"
          to="/signup"
          authClass="w-100 p-3"
          linkText="Don’t have an account?"
          linkLabel="Create one"
        />
      </Form>
    </>

  );
};

export default Login;
