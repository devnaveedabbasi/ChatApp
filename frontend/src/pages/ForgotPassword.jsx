import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FullLogo } from "../assets";
import { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const { forgotPassword, isForgetting } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!email) return;

    const res = await forgotPassword({ email });
    if (res.success) {
      // Navigate or show success message
      // navigate("/check-your-email");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={FullLogo} alt="Logo" className="h-12" />
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">
          Forgot Your Password?
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className={`w-full p-3 border ${
              submitAttempted && !email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {submitAttempted && !email && (
            <p className="text-red-500 text-sm mt-1">Email is required.</p>
          )}

          <div className="flex justify-center mt-4 items-center">
            <button
              type="submit"
              className="bg-[#52AB86] w-full py-2 px-6 text-lg md:text-[19px] rounded-xl text-white hover:bg-[#3d8a68] transition-colors duration-300"
              disabled={isForgetting}
            >
              {isForgetting ? "Sending Link..." : "Send Reset Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
