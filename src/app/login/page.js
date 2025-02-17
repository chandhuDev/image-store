"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { userLogin } from "../../redux/slices/userSlice";
import Spinner from "../../components/Home/Spinner";

const Login = () => {
  const [mounted, setMounted] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    loading: false,
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && currentUser) {
      const redirect = () => {
        router.replace("/");
      };
      redirect();
    }
  }, [currentUser, mounted, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.email || !formState.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setFormState((prev) => ({ ...prev, loading: true }));
    try {
      await dispatch(
        userLogin({
          email: formState.email,
          password: formState.password,
        })
      ).unwrap();
    } catch (error) {
      const errorMessage =
        error === "User not found. Please register first."
          ? "No account found with this email. Please sign up first."
          : error || "Login failed";

      toast.error(errorMessage);

      if (error === "User not found. Please register first.") {
        setTimeout(() => {
          router.push("/signup");
        }, 2000);
      }
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  if (typeof window === "undefined" || !mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center px-4 py-8 sm:px-6 md:px-8">
      <div className="w-full max-w-md mx-auto">
        <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-6 sm:mt-8 w-full max-w-md mx-auto">
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-10 shadow rounded-lg">
          <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="appearance-none block w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm sm:text-base font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formState.password}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="appearance-none block w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={formState.loading}
                className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
              >
                {formState.loading ? <Spinner /> : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-6 sm:mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 text-sm sm:text-base">
                  Don&apos;t have an account?
                </span>
              </div>
            </div>

            <div className="mt-4 sm:mt-6">
              <Link
                href="/signup"
                className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-indigo-600 bg-white hover:bg-gray-50 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
