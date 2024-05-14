import { useContext, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allActions } from "../store/root-action";
import { useActions } from "../hooks/useActions";
import { ButtonSpinner } from "../components/buttonSpinner/buttonSpinner";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { login, error } = useLogin();
  // const { isLoading, setIsLoading } = useContext(AuthContext);

  const [visible, setVisible] = useState(false);

  /// RTK

  const { isLoading } = useSelector((state) => state.user);
  const { login } = useActions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({
      phoneNumber: username,
      password: password,
      mobileToken: "fcmToken",
    });

    // setIsLoading(true);
    // await login(username, password);
    // setIsLoading(false);
  };
  return (
    <section className=" ">
      <div className="absolute login_backImage bg-cover w-full h-full top-0 left-0">
        <div className="absolute  bg-cover w-full h-full bg-black/30 "></div>
      </div>
      <div className=" absolute  w-full z-[100] flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to={"/"}
          className="flex items-center mb-6 text-2xl font-semibold text-white"
        >
          TESTOP.UZ
        </Link>
        <div className="w-full bg-white/80 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              WELCOME OUR WEBSITE!
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  username
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="usernameni kiriting..."
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={visible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="parolni kiriting..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      onChange={(e) => setVisible(e.target.checked)}
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Show Password
                    </label>
                  </div>
                </div>
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="shadow  text-black dark:text-white h-10 w-3/5 mx-auto flex justify-center text-center  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLoading ? <ButtonSpinner /> : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
