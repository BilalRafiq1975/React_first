import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignJWT } from "jose";

const AuthForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const STATIC_EMAIL = "ammodi.sultan123@gmail.com";
  const STATIC_PASSWORD = "abc123";
  const SECRET_KEY = "abcd";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (
        formData.email === STATIC_EMAIL &&
        formData.password === STATIC_PASSWORD
      ) {
        const secret = new TextEncoder().encode(SECRET_KEY);
        const token = await new SignJWT({ email: formData.email })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1h")
          .sign(secret);

        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="w-1/2 p-8 bg-gradient-to-br from-blue-300 to-cyan-500 text-white flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-center text-sm mb-6">Enter your personal details to use.</p>
        </div>

        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-center mb-4">Sign In</h3>
          <p className="text-center text-gray-500 text-sm mb-6">
            For sign in Use:<br />
            ammodi.sultan123@gmail.com<br />
            abc123<br />
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors duration-300"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors duration-300"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-300"
              >
                {loading ? "Processing..." : "SIGN IN"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
