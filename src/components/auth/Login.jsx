import { useState } from "react";
import { TbMessageForward } from "react-icons/tb";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const {loginHandler} = useAuth()
  const [form, setForm] = useState({ username: "", password: "" });

  const handleForm = (e) => {
    setForm((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await loginHandler(form.username, form.password);
    setForm({ username: "", password: "" });
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
          className="text-primary-text flex flex-col items-center text-4xl"
          onSubmit={submitForm}
        >
          <h1 className="text-5xl">Login</h1>
          <div className="my-8">
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                value={form.username}
                className="my-2 border-primary-bg px-3 p-1.5 border-4 bg-transparent focus:outline-none"
                name="username"
                id="username"
                onChange={handleForm}
                placeholder="Enter your Username"
              />
            </div>
            <div className="flex mt-4 flex-col">
              <label htmlFor="password">Password</label>
              <input
                value={form.password}
                className="my-2 border-primary-bg p-1.5 px-3 text-4xl border-4 bg-transparent focus:outline-none"
                type="password"
                name="password"
                id="password"
                onChange={handleForm}
                placeholder="Enter your Password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-secondary-bg p-2 text-2xl font-semibold m-4 w-1/2 mx-auto"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
