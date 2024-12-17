import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import {
  Mail,
  MessageSquare,
  User,
  Lock,
  SquareUserRound,
  EyeOff,
  Eye,
  Link,
  Loader2,
} from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  // Validate form data
  const validateForm = () => {
    if (!formData.fullname) {
      toast.error("Full name is required.");
      return false;
    }
    if (!formData.username) {
      toast.error("Username is required.");
      return false;
    }
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long and contain both letters and numbers."
      );
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    if (!formData.gender) {
      toast.error("Please select a gender.");
      return false;
    }
    toast.success("Form validated successfully!");
    return true;
  };

  // Email validation
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Password validation
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };



  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-redhat">
      <div className="flex flex-col justify-center items-center p-6 sm:p-4 bg-gradient-to-b from-[#002233] to-[#001522]">
        <div className="w-full max-w-md space-y-8">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" color="#9afcff" />
              </div>
              <h1 className="text-2xl font-semibold mt-2 text-[#cdfdff]">
                Create Account
              </h1>
              <p className="text-base-content/60 text-[#cdfdff]">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label" htmlFor="fullname">
                <span className="label-text font-small text-[#cdfdff]">
                  Full Name:
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" color="#9afcff" />
                </div>
                <input
                  id="fullname"
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
              <label className="label" htmlFor="username">
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
                  id="username"
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
              <label className="label" htmlFor="email">
                <span className="label-text font-small text-[#cdfdff]">Email:</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" color="#9afcff" />
                </div>
                <input
                  id="email"
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

            {/* Gender Selection */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-small text-[#cdfdff]">Gender:</span>
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
                <label className="label" htmlFor="password">
                  <span className="label-text font-small text-[#cdfdff]">Password:</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="size-5 text-base-content/40" color="#9afcff" />
                  </div>
                  <input
                    id="password"
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
                <label className="label" htmlFor="confirmPassword">
                  <span className="label-text font-small text-[#cdfdff]">
                    Confirm Password:
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="size-5 text-base-content/40" color="#9afcff" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10 rounded-lg bg-transparent text-slate-400 border border-slate-600 p-2"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-500 text-center mt-2">{errorMessage}</div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="w-full rounded-lg py-2 px-4 bg-primary text-[#cdfdff] border border-slate-600
    text-base-content/80 hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40
    disabled:bg-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <Loader2 className="animate-spin size-5 mr-2" />
                ) : (
                  "Create Account"
                )}
              </button>
              <div className="text-center text-[#cdfdff]">

                <a href="/login" className="font-semibold text-blue-400 flex gap-2 items-center justify-center">
                  <p>Already have an account?{" "}</p>
                  <Link />
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden lg:flex justify-center items-center relative">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>
    </div>
  );
};

export default SignUpPage;
