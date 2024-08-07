import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password, firstName, lastName, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password should match");
    }
    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const fadeInUpAnimation = {
    animation: "fadeInUp 0.5s ease-out",
  };

  const buttonHoverStyle = {
    transition: "all 0.3s ease",
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
        ...fadeInUpAnimation,
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3">
            <MDBValidationItem
              feedback="Please provide First Name."
              invalid
              className="col-md-6"
            >
              <MDBInput
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              feedback="Please provide Last Name."
              invalid
              className="col-md-6"
            >
              <MDBInput
                label="Last Name"
                type="text"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              feedback="Please provide Email."
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              feedback="Please provide Password."
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              feedback="Please provide Confirm Password."
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Password Confirm"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <div className="col-12">
              <MDBBtn
                style={{ width: "100%", ...buttonHoverStyle }}
                className="mt-2"
              >
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account ? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
