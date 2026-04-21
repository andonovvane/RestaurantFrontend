import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { api } from "@/API/api";
import { login, selectDetails } from "@/store/slices/userSlice";
import { USER_ROLES } from "@/constants/appConstants";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userDetails = useSelector(selectDetails);

    useEffect(() => {
        if (userDetails) {
            navigate("/");
        }
    }, [userDetails, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post("api/token/", { email, password });

            const accessToken = res.data.access;
            const refreshToken = res.data.refresh;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            // Fetch user details
            const userDetailsResponse = await api.get("user/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const userDetails = userDetailsResponse.data;
            localStorage.setItem("userDetails", JSON.stringify(userDetails));

            dispatch(login({ accessToken, details: userDetails }));
            console.log("Dispatched login with:", { accessToken, details: userDetails });

            // Redirect based on role
            if (userDetails.role === USER_ROLES.CEO) {
                navigate("/dashboard/");
            } else if (userDetails.role === USER_ROLES.WAITER) {
                navigate("/orders/");
            } else if (userDetails.role === USER_ROLES.KITCHER) {
                navigate("/kitchen/");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error during sign in:", error);
            if (error.response?.status === 401) {
                setError("Invalid email or password");
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md bg-gray-950 shadow-2xl rounded-2xl p-8">
                <h1 className="font-display text-3xl text-center text-white mb-6">
                    Sign In
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-xl text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-xl border border-gray-700 bg-gray-900 text-white p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                            placeholder="you@example.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-xl border border-gray-700 bg-gray-900 text-white p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium shadow-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;