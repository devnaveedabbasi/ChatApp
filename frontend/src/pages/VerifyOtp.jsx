import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FullLogo } from "../assets";
import { Toaster } from "react-hot-toast";

export default function Otp() {
  const { userId } = useParams();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [seconds, setSeconds] = useState(59);
  const [showResend, setShowResend] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { verifyOtp, isVerifying, resendOtp, isResending ,setToken} = useAuthStore();

  // Countdown timer logic
  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
    } else {
      setShowResend(true);
    }
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      if (!value && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };
const handleVerify = async () => {
  const code = otp.join("");
  if (code.length !== 6) return;

  try {
    const res = await verifyOtp({ code });

    if (res?.success && res?.token) {
      setToken(res.token); 
      navigate('/');       
    } else {
      console.log("OTP verification failed");
    }
  } catch (err) {
    console.error("Error verifying OTP", err);
  }
};

  
  const handleResend = async () => {
    if (!userId) return;
    const res = await resendOtp(userId);
    if (res?.status) {
      setSeconds(59); // Reset timer
      setShowResend(false);
    }
  };

  if (isResending) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={FullLogo} alt="Logo" className="h-12" />
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">
          Welcome to Chatzy!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please verify your email to continue.
        </p>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify Your Email
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          We've sent a 6-digit code to your email.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isVerifying}
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={isVerifying || otp.join("").length < 6}
          className="w-full bg-[#52AB86] cursor-pointer text-white py-2 px-4 rounded-md hover:bg-[#419774] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? "Verifying..." : "Verify Email"}
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          {showResend ? (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-blue-600 hover:underline disabled:opacity-50"
            >
              Resend
            </button>
          ) : (
            <span>Resend code in {seconds}s</span>
          )}
        </div>
      </div>
    </div>
  );
}
