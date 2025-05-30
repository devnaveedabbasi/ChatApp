import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Logo, SignUpBanner } from "../assets";
import InputField from "../components/InputField";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const navigate = useNavigate();

  const { isLoggingIn, login } = useAuthStore();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    await formik.handleSubmit();
    
    try {
      const formData = {
        email: formik.values.email,
        password: formik.values.password,
      };

      const res = await login(formData);
      console.log(res)
      if(res.status===200){
        console.log('sd')
        navigate(`/`);
      }

     
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitting(false);
    },
  });

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Left Column - Banner (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#E3F7F3] justify-center items-center p-4 md:p-8 lg:p-12">
        <img
          src={SignUpBanner}
          alt="Sign Up Banner"
          className="w-full h-auto max-h-[80vh] object-contain"
        />
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md mx-auto p-6 md:p-8 rounded-lg">
          <div className="flex flex-col items-center mb-6">
            <img src={Logo} alt="Chatzy Logo" className="w-14 mb-4" />
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-2">
              Welcome to Chatzy
            </h2>
            <p className="text-gray-500 text-sm md:text-base text-center mb-6">
              Access your chat from a computer anytime, anyplace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              formik={formik}
              submitAttempted={submitAttempted}
            />

            <InputField
              label="Password"
              name="password"
              placeholder="Password"
              formik={formik}
              submitAttempted={submitAttempted}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <div className="flex items-center mb-2 sm:mb-0">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="cursor-pointer w-4 h-4 mr-2"
                  style={{ accentColor: "#52AB86" }}
                />
                <label
                  htmlFor="rememberMe"
                  className="text-gray-500 text-sm md:text-base"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-[#01aa85] hover:text-[#018a6a] text-sm md:text-base transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#52AB86] hover:bg-[#3d8a68] text-white py-3 px-6 rounded-xl text-lg font-medium transition-colors duration-300"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm md:text-base">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-[#01aa85] hover:text-[#018a6a] font-medium transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs md:text-sm">
              By moving forward, you concur with the
            </p>
            <div className="flex justify-center space-x-2 mt-1">
              <Link
                to="/terms"
                className="text-[#01aa85] hover:text-[#018a6a] text-sm md:text-base font-medium transition-colors"
              >
                Terms & conditions
              </Link>
              <span className="text-gray-500">-</span>
              <Link
                to="/privacy"
                className="text-[#01aa85] hover:text-[#018a6a] text-sm md:text-base font-medium transition-colors"
              >
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
