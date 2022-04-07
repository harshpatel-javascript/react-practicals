import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Eye, EyeOff, X } from "react-feather";

import "../css/Signup.css";
import illustration from "../images/signup.png";
import { authenticated } from "../redux/action";

const initialValues = {
  file: null,
  fileUrl: "",
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const validate = (values) => {
  let errors = {};
  if (!values.name.trim()) {
    errors.name = "!Required";
  } else if (values.name.length < 15) {
    errors.name = "It is  less than 15 character.";
  }
  if (!values.email) {
    errors.email = "!Required";
  }
  if (!values.phone) {
    errors.phone = "!Required";
  } else if (!/^[6-9]\d{9}$/gi.test(values.phone)) {
    errors.phone = "Enter valid Phone number";
  }
  if (!values.password.trim()) {
    errors.password = "!Required";
  }
  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = "!Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword =
      "Confirm Password is not same as above Password field.";
  }
  if (!values.file) {
    errors.file = "!Required";
  } else if (values.file.size > 2 * 1024 * 1024) {
    errors.file = " Upload the file with size less than 2 MB.";
  }
  return errors;
};

const Signup = () => {
  const dispatch = useDispatch();
  // state for image-preview while uploading
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const reference = useRef(null);
  // form submit handler
  const onSubmit = (values, actions) => {
    dispatch(authenticated(values));
    actions.resetForm(initialValues);
    navigate("/home");
  };
  // form reset handler
  const onReset = () => {
    setIsImageUploaded(false);
  };
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
    onReset,
  });
  // passowrd eye handler
  const eyeClickHandler = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  // file upload handler
  const changeHandler = (e) => {
    const { currentTarget } = e;
    formik.setFieldValue("file", currentTarget.files[0].name);
    formik.setFieldValue(
      "fileUrl",
      URL.createObjectURL(currentTarget.files[0])
    );
    setIsImageUploaded(true);
  };
  return (
    <>
      <div className="main-container">
        <form
          className="form-container"
          onReset={formik.handleReset}
          onSubmit={formik.handleSubmit}
        >
          <h1 className="header">Sign Up</h1>
          {/* photo */}
          {isImageUploaded && (
            <div className="img-preview-container">
              <img
                src={formik.values.fileUrl}
                alt="preview"
                className="image-preview"
              />
              <X
                className="close"
                onClick={() => {
                  formik.setFieldValue("file", null);
                  formik.setFieldValue("fileUrl", null);
                  setIsImageUploaded(false);
                }}
              />
            </div>
          )}
          <div>
            {!isImageUploaded && (
              <p onClick={() => reference.current.click()} className="text">
                photo +
              </p>
            )}
            <input
              accept=".jpg,.png"
              ref={reference}
              onChange={(e) => changeHandler(e)}
              type="file"
              name="photo"
              id="photo"
            />
            {formik.touched.file && formik.errors.file && (
              <div className="error">{formik.errors.file}</div>
            )}
          </div>
          {/* name  */}
          <div className="label-name">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
          </div>
          {/* email */}
          <div className="label-name">
            <label className="label" htmlFor="email">
              Email{" "}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>
          {/* phone */}
          <div className="label-name">
            <label className="label" htmlFor="phone">
              Phone No
            </label>
            <input
              id="phone"
              name="phone"
              type="number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="error">{formik.errors.phone}</div>
            )}
          </div>
          {/* password */}
          <div className="label-name">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              onBlur={formik.handleBlur}
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div onClick={eyeClickHandler}>
              {showPassword ? (
                <Eye className="eye" />
              ) : (
                <EyeOff className="eye" />
              )}
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>
          {/* confirm password */}
          <div className="label-name">
            <label className="label" htmlFor="password">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <div className="error">{formik.errors.confirmPassword}</div>
              )}
          </div>
          {/* submit and reset button */}
          <div className="label1">
            <button className="submit" type="submit">
              Submit
            </button>
            <button className="reset" type="reset">
              Reset
            </button>
          </div>
        </form>
        <img src={illustration} alt="illustration-lady working on laptop" />
      </div>
    </>
  );
};
export default Signup;
