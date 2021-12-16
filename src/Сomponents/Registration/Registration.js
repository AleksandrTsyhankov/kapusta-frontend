import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import { routes } from "utils/routes";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Formik } from "formik";
import React, { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../redux/auth/auth-operations";
import { authSelectors } from "../../redux/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./Registration.module.css";

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const errorMessage = useSelector(authSelectors.getErrorMessage);
  const verificationEmailSent = useSelector(
    authSelectors.getIsVerificationEmailSent
  );

  const validate = useCallback((values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 3) {
      errors.name = "Invalid name. Name should have at least 3 symbols";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8 || values.password.length > 16) {
      errors.password =
        "Invalid password. Password should be greater then 8 symbols and less then 16 symbols";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (
      values.confirmPassword.length < 8 ||
      values.confirmPassword.length > 16
    ) {
      errors.confirmPassword =
        "Invalid password. Password should be greater then 8 symbols and less then 16 symbols";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Confirm password should be equal to password";
    }

    return errors;
  }, []);

  // const notify = (message) => {
  //   toast.error(message, {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     });
  // }

  const handleSubmit = useCallback(
    (values, { setSubmitting }) => {
      dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
      setSubmitting(false);
      if (errorMessage) {
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      if (verificationEmailSent) {
        toast.info("Verification email sent", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    },
    [dispatch, errorMessage, verificationEmailSent]
  );

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  return (
    <>
      <div className={s.registrationWindow}>
        <div className="with-google">
          <p className={s.description}>
            Вы можете зарегистрироваться с помощью Google Account:
          </p>
          <button className={s.googleButton} type="button">
            <FcGoogle size="20px" />
            Google
          </button>
          <p className={s.description}>
            Или зарегистрироваться с помощью e-mail и пароля:
          </p>
        </div>
        <Formik
          initialValues={INITIAL_VALUES}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
          }) => (
            <form className={s.form} onSubmit={handleSubmit}>
              <div className={s.nameField}>
                <InputLabel className={s.label} htmlFor="name">
                  Имя:
                </InputLabel>
                <TextField
                  className={s.input}
                  variant="filled"
                  fullWidth
                  id="name"
                  name="name"
                  margin="normal"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </div>
              <div className={s.emailField}>
                <InputLabel className={s.label} htmlFor="email">
                  Электронная почта:
                </InputLabel>
                <TextField
                  fullWidth
                  className={s.input}
                  variant="filled"
                  id="email"
                  name="email"
                  margin="normal"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </div>
              <InputLabel className={s.label} htmlFor="password">
                Пароль:
              </InputLabel>
              <div className={s.passwordField}>
                <TextField
                  fullWidth
                  className={s.input}
                  variant="filled"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  margin="normal"
                  helperText={touched.password && errors.password}
                />
                <div className={s.passwordIconButton}>
                  {values.password && (
                    <IconButton
                      aria-label="visibility"
                      onClick={togglePassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )}
                </div>
              </div>
              <InputLabel className={s.label} htmlFor="password">
                Подтвердите пароль:
              </InputLabel>
              <div className={s.passwordField}>
                <TextField
                  fullWidth
                  className={s.input}
                  variant="filled"
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  margin="normal"
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                <div className={s.passwordIconButton}>
                  {values.confirmPassword && (
                    <IconButton
                      aria-label="visibility"
                      onClick={toggleConfirmPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )}
                </div>
              </div>
              <div className={s.confirmButton}>
                <Button variant="contained" type="submit">
                  Регистрация
                </Button>
                <Link to={"/"}>
                  <Button type="button">Войти</Button>
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Registration;
