//@ts-nocheck
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AuthType } from '../../utils/authSchema';
import { useSendloginCredentialsMutation } from '../../features/authApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../common/Loader';
import { GiPsychicWaves } from 'react-icons/gi';
import crypto from 'crypto';
import CryptoJS from 'crypto-js';
import jwt_decode from 'jwt-decode';


const encodeJWT = (header, payload) => {
  // Convert header and payload to Base64 URL format
  const base64UrlHeader = btoa(JSON.stringify(header))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const base64UrlPayload = btoa(JSON.stringify(payload))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  // Create the unsigned token
  const unsignedToken = `${base64UrlHeader}.${base64UrlPayload}`;

  // Mock signing using a hardcoded secret key (not secure)
  const secretKey = 'OiLzQ5i0gRnslKw6Jzp3papf58xoo6jO'; // Replace this with your backend secret
  const signature = CryptoJS.HmacSHA256(unsignedToken, secretKey).toString(CryptoJS.enc.Base64)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  // Return the complete JWT
  return `${unsignedToken}.${signature}`;
};


const SignIn: React.FC = () => {

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };


  const navigate = useNavigate();

  const encodePassword = (password) => {
    const token = jwt.sign({ password }, secretKey, { expiresIn: '1h' }); // Add expiry for security
    return token;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthType>();

  const [login, { isLoading, isError, error }] =
    useSendloginCredentialsMutation();


  const onSubmit: SubmitHandler<AuthType> = async (data) => {
    try {
      const payload = {
        password:data.password,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
      };
      const jwtToken = encodeJWT(header, payload);
      console.log("data", data);
      console.log("brijesh jwtToken", jwtToken);
      data.password = jwtToken;
      const result = await login(data).unwrap();
      console.log("result", result);
      

      // Save tokens in localStorage and cookies
      window.localStorage.setItem('accessToken', result.access);
      document.cookie = `refreshToken=${result.refresh}; Secure; HttpOnly; SameSite=Strict`;

      // Navigate to dashboard
      navigate('/');

      // Show success toast
      toast.success('Successfully logged in');
    } catch (error) {
      const errorMessage =
        (error as any)?.error ||
        'Login failed! Please check your credentials and try again.';
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
      <div className="absolute top-[50px] left-[640px]">
        <GiPsychicWaves className="w-[80px] h-[80px]" />
      </div>
      <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
        <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
          <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
            <div>
              <h4 className="text-white text-lg font-semibold">
                CMO SWAR (Speech and Written Analysis Resource){' '}
              </h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                CMO SWAR is an innovative platform that combines AI-driven
                analysis of spoken and written communication to enhance
                understanding, decision-making, and performance through Machine
                Learning and Bhashini. Empowering Government with actionable
                insights, SWAR bridges the gap between expression and clarity
                across English and Gujarati languages and formats
              </p>
            </div>
          </div>
          <form
            className="md:col-span-2 w-full py-6 px-6 sm:px-16"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className="mb-6">
              <h3 className="text-gray-800 text-2xl font-bold">
                Login into CMOSWAR
              </h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email Id
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter email"
                    autoComplete="off"
                    {...register('email')}
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter password"
                    autoComplete="off"
                    {...register('password')}
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
            {/* <p className="text-gray-800 text-sm mt-6 text-center">
              Not a member yet?{" "}
              <NavLink
                to="/signup"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Create
              </NavLink>
            </p> */}
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignIn;