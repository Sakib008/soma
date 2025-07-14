import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link, replace, useLocation, useNavigate } from "react-router-dom";

const Signup = () => {
  const { signupUser } = useAuth();
  const formRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();
  const submitButtonRef = useRef();
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    firstnameRef.current?.focus();
  }, []);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstname.trim()) newErrors.firstname = "Firstname is required";
    if (!form.lastname.trim()) newErrors.lastname = "Lastname is required";
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!form.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Focus the first field with error
      if (errors.firstname) firstnameRef.current?.focus();
      else if (errors.lastname) lastnameRef.current?.focus();
      else if (errors.username) usernameRef.current?.focus();
      else if (errors.email) emailRef.current?.focus();
      else if (errors.password) passwordRef.current?.focus();
      else if (errors.confirmPassword) confirmPasswordRef.current?.focus();
      return;
    }
    setIsLoading(true);
    try {
      await signupUser({
        username: form.username,
        firstName: form.firstname,
        lastName: form.lastname,
        email: form.email,
        password: form.password,
      });
      setForm({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      navigate(from,replace)
    } catch (error) {
      setErrors({ general: "Signup failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextField === "submit") {
        submitButtonRef.current?.click();
      } else {
        nextField?.current?.focus();
      }
    }
  };

  return (
    <div className="max-w-screen-2xl flex justify-center items-center mx-auto my-20 bg-primary-text h-[80vh]">
      <div className="w-full bg-secondary-text h-full flex justify-center items-center">
        <form
          ref={formRef}
          className="text-primary-text flex flex-col items-center text-4xl"
          onSubmit={submitForm}
        >
          <h1 className="text-5xl">Sign Up</h1>

          {/* General error message */}
          {errors.general && (
            <div className="text-red-500 text-xl mt-2 text-center">
              {errors.general}
            </div>
          )}

          <div className="my-8">
            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <label htmlFor="firstname">Firstname</label>
                <input
                  ref={firstnameRef}
                  type="text"
                  value={form.firstname}
                  className={`my-2 border-primary-bg px-3 p-1.5 border-4 bg-transparent focus:outline-none ${errors.firstname ? "border-red-500" : ""}`}
                  name="firstname"
                  id="firstname"
                  onChange={handleForm}
                  onKeyDown={(e) => handleKeyDown(e, lastnameRef)}
                  placeholder="Enter your Firstname"
                  disabled={isLoading}
                />
                {errors.firstname && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.firstname}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastname">Lastname</label>
                <input
                  ref={lastnameRef}
                  value={form.lastname}
                  className={`my-2 border-primary-bg p-1.5 px-3 text-4xl border-4 bg-transparent focus:outline-none ${errors.lastname ? "border-red-500" : ""}`}
                  type="text"
                  name="lastname"
                  id="lastname"
                  onChange={handleForm}
                  onKeyDown={(e) => handleKeyDown(e, usernameRef)}
                  placeholder="Enter your Lastname"
                  disabled={isLoading}
                />
                {errors.lastname && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.lastname}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input
                  ref={usernameRef}
                  type="text"
                  value={form.username}
                  className={`my-2 border-primary-bg px-3 p-1.5 border-4 bg-transparent focus:outline-none ${errors.username ? "border-red-500" : ""}`}
                  name="username"
                  id="username"
                  onChange={handleForm}
                  onKeyDown={(e) => handleKeyDown(e, emailRef)}
                  placeholder="Enter your Username"
                  disabled={isLoading}
                />
                {errors.username && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.username}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  ref={emailRef}
                  value={form.email}
                  className={`my-2 border-primary-bg p-1.5 px-3 text-4xl border-4 bg-transparent focus:outline-none ${errors.email ? "border-red-500" : ""}`}
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleForm}
                  onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                  placeholder="Enter your Email"
                  disabled={isLoading}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  ref={passwordRef}
                  type="password"
                  value={form.password}
                  className={`my-2 border-primary-bg px-3 p-1.5 border-4 bg-transparent focus:outline-none ${errors.password ? "border-red-500" : ""}`}
                  name="password"
                  id="password"
                  onChange={handleForm}
                  onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef)}
                  placeholder="Enter your Password"
                  disabled={isLoading}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  ref={confirmPasswordRef}
                  value={form.confirmPassword}
                  className={`my-2 border-primary-bg p-1.5 px-3 text-4xl border-4 bg-transparent focus:outline-none ${errors.confirmPassword ? "border-red-500" : ""}`}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={handleForm}
                  onKeyDown={(e) => handleKeyDown(e, "submit")}
                  placeholder="Enter Confirm Password"
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>
          </div>
          <p className="text-xl ">Already have an account ? <span className="text-primary-bg font-semibold underline underline-offset-2"><Link to={'/login'}>LogIn</Link></span></p>
          <button
            ref={submitButtonRef}
            type="submit"
            disabled={isLoading}
            className={`bg-secondary-bg p-2 text-2xl font-semibold m-4 w-1/2 mx-auto ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-opacity-80"
            }`}
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
