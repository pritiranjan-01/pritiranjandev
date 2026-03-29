import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, Loader, CloudCog } from "lucide-react";
import { login, getAuthToken } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (getAuthToken()) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(formData);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.body?.message || err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md rounded-2xl p-6 sm:p-8 transition-all duration-300 border-[1px] border-black dark:border-white "
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Header section */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-light text-white shadow-glass-light dark:bg-accent-dark dark:text-black dark:shadow-glass-dark">
            <Loader className="h-8 w-8" />
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-500/10 p-4 text-center text-sm font-medium text-red-600 dark:text-red-400 border border-red-500/20">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary">
              Username
            </label>
            <div className="relative group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-light-textTertiary group-focus-within:text-accent-light dark:text-dark-textTertiary dark:group-focus-within:text-accent-dark transition-colors" />
              </div>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-light-border bg-light-bgSecondary/60 py-3 pl-10 pr-4 text-light-textPrimary outline-none transition-all placeholder:text-light-textTertiary/70 focus:border-accent-light focus:bg-white focus:ring-1 focus:ring-accent-light dark:border-dark-border dark:bg-dark-bgSecondary/60 dark:text-dark-textPrimary dark:placeholder:text-dark-textTertiary/50 dark:focus:border-accent-dark dark:focus:bg-black dark:focus:ring-accent-dark shadow-sm"
                placeholder="Enter your Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary">
                Password
              </label>
            </div>
            <div className="relative group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-light-textTertiary group-focus-within:text-accent-light dark:text-dark-textTertiary dark:group-focus-within:text-accent-dark transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full rounded-xl border border-light-border bg-light-bgSecondary/60 py-3 pl-10 pr-12 text-light-textPrimary outline-none transition-all placeholder:text-light-textTertiary/70 focus:border-accent-light focus:bg-white focus:ring-1 focus:ring-accent-light dark:border-dark-border dark:bg-dark-bgSecondary/60 dark:text-dark-textPrimary dark:placeholder:text-dark-textTertiary/50 dark:focus:border-accent-dark dark:focus:bg-black dark:focus:ring-accent-dark shadow-sm"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-light-textTertiary hover:text-light-textPrimary dark:text-dark-textTertiary dark:hover:text-dark-textPrimary transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 flex justify-center items-center rounded-xl bg-accent-light py-3.5 font-semibold tracking-wide text-white shadow-lg transition-all hover:bg-accent-lightHover hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed dark:bg-accent-dark dark:text-black dark:hover:bg-accent-darkHover"
          >
            {isLoading ? <Loader className="h-5 w-5 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
