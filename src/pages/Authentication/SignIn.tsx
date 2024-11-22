import { NavLink, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthType } from '../../utils/authSchema';
import { useSendloginCredentialsMutation } from '../../features/authApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../common/Loader';

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthType>();

  const [login, { isLoading, isError, error }] = useSendloginCredentialsMutation();

  const onSubmit: SubmitHandler<AuthType> = async (data) => {
    try {
      const result = await login(data).unwrap();
      console.log("Login success", result);

      // Save tokens in localStorage and cookies
      window.localStorage.setItem('accessToken', result.access);
      document.cookie = `refreshToken=${result.refresh}; Secure; HttpOnly; SameSite=Strict`;

      // Navigate to dashboard
      navigate("/dashboard");

      // Show success toast
      toast.success("Successfully logged in");
    } catch (error) {
      const errorMessage = (error as any)?.error || 'Login failed! Please check your credentials and try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="w-screen">
        {isLoading && (
          <div className="w-screen max-h-screen absolute z-99">
            <Loader />
          </div>
        )}
      </div>
      <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
        <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
          <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
            <div>
              <h4 className="text-white text-lg font-semibold">Login into your account</h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Welcome to our Login page!</p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold">Simple &amp; Secure Registration</h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.
              </p>
            </div>
          </div>
          <form className="md:col-span-2 w-full py-6 px-6 sm:px-16" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <h3 className="text-gray-800 text-2xl font-bold">Login into your Account</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter email"
                    {...register("email")}
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter password"
                    {...register("password")}
                  />
                </div>
              </div>
            </div>
            <div className="!mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
              >
                Login
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Not a member yet?{" "}
              <NavLink
                to="/signup"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Create
              </NavLink>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignIn;
