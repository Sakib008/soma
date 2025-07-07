import { useState, useRef, useEffect } from "react";
import { TbMessageForward } from "react-icons/tb";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const {loginHandler} = useAuth()
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // useRef hooks for DOM manipulation
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const formRef = useRef(null);
  const submitButtonRef = useRef(null);

  // Focus username input on component mount
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Focus the first field with error
      if (errors.username) {
        usernameRef.current?.focus();
      } else if (errors.password) {
        passwordRef.current?.focus();
      }
      return;
    }
    
    setIsLoading(true);
    try {
      await loginHandler(form.username, form.password);
      setForm({ username: "", password: "" });
      setErrors({});
    } catch (error) {
      // Handle login error
      setErrors({ general: "Login failed. Please check your credentials." });
      passwordRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key navigation
  const handleKeyDown = (e, nextField) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextField === 'submit') {
        submitButtonRef.current?.click();
      } else {
        nextField?.current?.focus();
      }
    }
  };

  return (
    <div className="max-w-screen-2xl flex justify-center items-center mx-auto my-20 bg-primary-text h-[80vh]">
      <div className="font-semibold w-1/2 text-3xl text-secondary-text flex flex-col items-center ">
        <p>We Welcomes you at</p>
        <p className="text-9xl font-extrabold flex items-center ">
          <TbMessageForward size={100} />
          SOMA
        </p>
        <p className="my-20  text-4xl text-center">Join Us Now</p>
      </div>
      <div className="w-1/2 bg-secondary-text h-full flex justify-center items-center">
        <form
          ref={formRef}
          className="text-primary-text flex flex-col items-center text-4xl"
          onSubmit={submitForm}
        >
          <h1 className="text-5xl">Login</h1>
          
          {/* General error message */}
          {errors.general && (
            <div className="text-red-500 text-xl mt-2 text-center">
              {errors.general}
            </div>
          )}
          
          <div className="my-8">
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                ref={usernameRef}
                type="text"
                value={form.username}
                className={`my-2 border-primary-bg px-3 p-1.5 border-4 bg-transparent focus:outline-none ${
                  errors.username ? 'border-red-500' : ''
                }`}
                name="username"
                id="username"
                onChange={handleForm}
                onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                placeholder="Enter your Username"
                disabled={isLoading}
              />
              {errors.username && (
                <span className="text-red-500 text-sm mt-1">{errors.username}</span>
              )}
            </div>
            <div className="flex mt-4 flex-col">
              <label htmlFor="password">Password</label>
              <input
                ref={passwordRef}
                value={form.password}
                className={`my-2 border-primary-bg p-1.5 px-3 text-4xl border-4 bg-transparent focus:outline-none ${
                  errors.password ? 'border-red-500' : ''
                }`}
                type="password"
                name="password"
                id="password"
                onChange={handleForm}
                onKeyDown={(e) => handleKeyDown(e, 'submit')}
                placeholder="Enter your Password"
                disabled={isLoading}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">{errors.password}</span>
              )}
            </div>
          </div>
          <button
            ref={submitButtonRef}
            type="submit"
            disabled={isLoading}
            className={`bg-secondary-bg p-2 text-2xl font-semibold m-4 w-1/2 mx-auto ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80'
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
