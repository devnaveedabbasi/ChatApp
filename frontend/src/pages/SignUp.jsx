import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Logo, SignUpBanner } from "../assets";
import InputField from "../components/InputField";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const navigate = useNavigate();

  const { signup, isSigningUp } = useAuthStore();

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(3, "fullname must be at least 3 characters")
      .max(20, "fullname must be 20 characters or less")
      .required("fullname is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      //   "Password must contain at least one uppercase, one lowercase, one number and one special character"
      // )
      .required("Password is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    await formik.handleSubmit();

    try {
        const formData = {
            fullName: formik.values.fullname,
            email: formik.values.email,
            password: formik.values.password,
        };

        const res = await signup(formData);
        console.log('Signup result:', res);
        
        if (res.data.user._id) {
            navigate(`/verify-otp/${res.data.user._id}`);
        } else {
            console.error('User ID not found in response');
        }
    } catch (error) {
        console.error('Signup failed:', error);
    
    }
};
  
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values, "onsubmit");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitting(false);
    },
  });

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 w-full min-h-screen bg-red-800">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Left Column - Form */}
      <div className="flex justify-center items-center bg-white p-4 md:p-0">
        <div className="bg-white flex justify-center items-center flex-col shadow-md md:shadow-lg w-full md:w-[70%] mx-auto p-6 md:p-8 rounded-lg">
          <div className="mb-3">
            <img src={Logo} alt="Chatzy Logo" className="w-14 " />
          </div>
          <h2 className="text-[#2c2c2c] text-lg md:text-[24px] leading-[30px] font-medium text-center mb-2">
            Hello Everyone, We are Chatzy
          </h2>
          <h3 className="text-[#7f8384] text-sm  leading-[16.3845px] text-center mb-8">
            Welcome to Chatzy please login to your account.
          </h3>

          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <InputField
              label="FullName"
              name="fullname"
              placeholder="FullName"
              formik={formik}
              submitAttempted={submitAttempted}
            />

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

            <div className="flex justify-center mt-4 items-center">
              <button
                type="submit"
                className=" bg-[#52AB86] cursor-pointer py-2 px-6 text-lg md:text-[19px] rounded-xl  text-white hover:bg-[#3d8a68] transition-colors duration-300"
                disabled={isSigningUp}
              >
                {isSigningUp ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
          <p className="text-gray-500 md:text-lg text-md mt-5 mb-6">
            Already have an account?{" "}
            <Link to="/login" className="link cursor-pointer text-[#01aa85] link-primary">
              Sign in
            </Link>
          </p>
          

          {/* <div className="flex justify-center items-center gap-4 mb-6">
            <div className="bg-red-600 transition-all ease-in duration-100 p-3 md:p-4 text-white cursor-pointer hover:bg-[#52AA86] rounded-full">
              <Icon icon="mingcute:google-fill" width="20" height="20" />
            </div>
            <div className="bg-[#52AB86] transition-all ease-in duration-100 p-3 md:p-4 text-white cursor-pointer hover:bg-[#52AA86] rounded-full">
              <Icon icon="line-md:twitter-filled" width="20" height="20" />
            </div>
            <div className="bg-blue-600 transition-all ease-in duration-100 p-3 md:p-4 text-white cursor-pointer hover:bg-[#52AA86] rounded-full">
              <Icon icon="line-md:facebook" width="20" height="20" />
            </div>
          </div> */}
        </div>
      </div>

      {/* Right Column - Banner */}
      <div className="bg-[#E3F7F3] hidden md:flex justify-center items-center p-10">
        <img
          src={SignUpBanner}
          alt="Sign Up Banner"
          className="w-full h-auto max-h-[80vh] object-contain"
        />
      </div>
    </div>
  );
}
