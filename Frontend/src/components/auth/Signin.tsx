import { useState } from "react";
import { signinSchema } from "@aroult/common";
import { assets } from "../../assets/assets";
import axios from "axios";
import { API_ENDPOINTS } from "../../constants";
import { useNavigate } from "react-router-dom";


const Signin = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = signinSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors: { [key: string]: string } = {};
            result.error.issues.forEach(issue => {
                const field = issue.path[0] as string;
                fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);
        } else {
            setErrors({});
            try {
                const res = await axios.post(API_ENDPOINTS.signin, form, {
                    headers: { "Content-Type": "application/json" },
                });
                // Check for JWT in response
                if (res.status === 200 && res.data.jwt) {
                    localStorage.setItem("token", res.data.jwt); // Save token for auth
                    navigate("/blog");
                } else {
                    setErrors({ general: "Sign in failed. Please try again." });
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setErrors({ general: err.response?.data.error || "An error occurred during sign in." });
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-center gap-8">
            <div className="flex flex-col items-center">
                <img className="w-12 h-12" src={assets.letter} alt="" />
                <h1 className="font-noe text-3xl">Welcome Back</h1>
            </div>
            <div className="flex w-[80%] flex-col">
                <label className="text-xs mb-2">Email Address</label>
                <input
                    name="email"
                    type="text"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-neutral-200 px-2 py-[10px] text-sm mb-1 rounded focus:outline-none placeholder:text-sm"
                    placeholder="Enter your email"
                />
                {errors.email && <span className="text-xs text-red-500 mb-2">{errors.email}</span>}

                <label className="text-xs mb-2 mt-4">Password</label>
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-neutral-200 px-2 text-sm py-[10px] rounded mb-1 focus:outline-none placeholder:text-sm"
                    placeholder="Create a password"
                />
                {errors.password && <span className="text-xs text-red-500 mb-2">{errors.password}</span>}
            </div>
            <button type="submit" onClick={handleSubmit} className="bg-black rounded-full px-8 py-2 text-white hover:cursor-pointer">
                Sign In
            </button>
        </form>
    );
};

export default Signin;
