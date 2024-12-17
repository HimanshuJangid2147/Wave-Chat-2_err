import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, MessageSquare, User, Lock, SquareUserRound, EyeOff, Eye, Link, Loader2, } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return false;
      }
    }
    if (!formData.gender) {
      setErrorMessage("Please select a gender.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully!");
      signup(formData);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-redhat">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-4">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare
                  className="size-6 text-primary"
                  color="#9afcff"
                />
              </div>
              <h1 className="text-2xl font-semibold mt-2 text-[#cdfdff]">
                Create Account
              </h1>
              <p className="text-base-content/60 text-[#cdfdff]">
                Get started with your free account
              </p>
            </div>
          </div>
          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-small text-[#cdfdff]">
                  Full Name:
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User
                    className="size-5 text-base-content/40"
                    color="#9afcff"
                  />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 rounded-lg bg-transparent text-slate-400 border border-slate-600 p-2"
                  placeholder="John Doe"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Username */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-small text-[#cdfdff]">
                  Username:
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SquareUserRound
                    className="size-5 text-base-content/40"
                    color="#9afcff"
                  />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 rounded-lg bg-transparent text-slate-400 border border-slate-600 p-2"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-small text-[#cdfdff]">
                  Email:
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    className="size-5 text-base-content/40"
                    color="#9afcff"
                  />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 rounded-lg bg-transparent text-slate-400 border border-slate-600 p-2"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Gender as Radio Buttons */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-small text-[#cdfdff]">
                  Gender:
                </span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-[#cdfdff]">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="radio radio-primary"
                    checked={formData.gender === "male"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  Male
                </label>
                <label className="flex items-center gap-2 text-[#cdfdff]">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="radio radio-primary"
                    checked={formData.gender === "female"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  Female
                </label>
                <label className="flex items-center gap-2 text-[#cdfdff]">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    className="radio radio-primary"
                    checked={formData.gender === "other"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  Other
                </label>
              </div>
            </div>

            {/* Password Fields */}
            <div className="flex gap-4">
              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-small text-[#cdfdff]">
                    Password:
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock
                      className="size-5 text-base-content/40"
                      color="#9afcff"
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10 rounded-lg bg-transparent text-slate-400 border border-slate-600 p-2"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40" />
                    ) : (
                      <Eye className="size-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-small text-[#cdfdff]">
                    Confirm Password:
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock
                      className="size-5 text-base-content/40"
                      color="#9afcff"
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`input input-bordered w-full pl-10 rounded-lg bg-transparent text-slate-400 border ${formData.password &&
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword
                        ? "border-red-500"
                        : "border-slate-600"
                      } p-2`}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40" />
                    ) : (
                      <Eye className="size-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full rounded-lg py-2 px-4 bg-primary text-white border border-slate-600
    text-base-content/80 hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40
    disabled:bg-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed`}
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Already have an account? */}
          <div className="flex justify-center mt-4">
            <p className="text-base-content/60 text-[#cdfdff]">
              {/* Already have an account?{" "} */}
              <a
                href="/login"
                className="text-primary hover:text-primary/80 font-semibold flex gap-2"
              >
                <p>Already have an account?</p> <Link />
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
