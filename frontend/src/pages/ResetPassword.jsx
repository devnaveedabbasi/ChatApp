import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import InputField from '../components/InputField';
import { FullLogo } from '../assets';
import { useState } from 'react';

export default function ResetPassword() {
  // const { token } = useParams();
  // const {token}=useLocation().searchtoken
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  console.log(token)
  
  console.log('Token from URL:', token); // Verify token is being extracted correctly
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const { resetPassword, isReseting } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      // This will now be handled by the external handleSubmit
    }
  });

  // External handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    
    if (!formik.isValid) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      const res = await resetPassword(
        {
          newPassword: formik.values.newPassword,
          confirmPassword: formik.values.confirmPassword
        },
        encodeURIComponent(token)
      );

      if (res?.success) {
        toast.success('Password reset successfully');
        navigate('/login');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error(error.message || 'Failed to reset password');
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
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit}>
          <InputField
            label="New Password"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            formik={formik}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            submitAttempted={submitAttempted}
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            formik={formik}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            submitAttempted={submitAttempted}
          />
          <button
            type="submit"
            className="bg-[#52AB86] w-full py-2 px-6 text-lg rounded-xl text-white mt-4"
            disabled={isReseting}
          >
            {isReseting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}