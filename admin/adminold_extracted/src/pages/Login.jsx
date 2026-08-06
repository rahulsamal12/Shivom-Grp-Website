import { LockKeyhole, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "admin@example.com",
      password: "change_this_password"
    }
  });

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const onSubmit = async (values) => {
    try {
      await login(values);
      toast.success("Welcome back");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="w-full max-w-md rounded-md border border-slate-200 bg-white p-8 shadow-panel">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-600 text-white">
            <LockKeyhole size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-950">CMS Login</h1>
            <p className="text-sm text-slate-500">Super admin access</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input id="email" type="email" className="form-input" {...register("email", { required: "Email is required" })} />
          </div>
          <div>
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              {...register("password", { required: "Password is required" })}
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={formState.isSubmitting}>
            <LogIn size={17} />
            {formState.isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
