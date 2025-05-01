import { Icon } from "@iconify/react";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  formik,
  submitAttempted,
  showPassword,
  setShowPassword,
}) => {
  const isPassword = name === "password";

  return (
    <div className={`mb-4 ${isPassword ? "relative mb-6" : ""}`}>
      <label
        htmlFor={name}
        className="block text-sm md:text-[20px] text-[#2c2c2c] mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPassword && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          className={`w-full p-3 text-sm md:text-[15px] bg-[#F8F9F9] border rounded-md focus:outline-none focus:ring-2 ${
            submitAttempted && formik.errors[name]
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-[#52AB86]"
          } ${isPassword ? "pr-10" : ""}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon
              icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
              width="20"
              height="20"
            />
          </button>
        )}
      </div>
      {submitAttempted && formik.errors[name] ? (
        <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default InputField;
