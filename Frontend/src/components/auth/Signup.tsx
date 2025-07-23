import { useState } from "react";
import { signupSchema } from "@aroult/common";
import { assets } from "../../assets/assets";
import axios from "axios";
import { API_ENDPOINTS } from "../../constants";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = signupSchema.safeParse(form);
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
        const res = await axios.post(API_ENDPOINTS.signup, form, {
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 201 && res.data.jwt) {
          localStorage.setItem("token", res.data.jwt);
          navigate("/blog");
        } else {
          setErrors({ general: "Sign up failed. Please try again." });
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setErrors({ general: err.response?.data.error || "An error occurred during sign up." });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-center gap-8">
      <div className="flex flex-col items-center">
        <img className="w-12 h-12" src={assets.letter} alt="" />
        <h1 className="font-noe text-3xl">Join Medium</h1>
      </div>
      <div className="flex w-[80%] flex-col">
        <label className="text-xs mb-2">Full Name</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="bg-neutral-200 px-2 py-[10px] text-sm rounded mb-1 focus:outline-none placeholder:text-sm"
          placeholder="Enter your username"
        />
        {errors.name && <span className="text-xs text-red-500 mb-2">{errors.name}</span>}

        <label className="text-xs mb-2">Email</label>
        <input
          name="email"
          type="text"
          value={form.email}
          onChange={handleChange}
          className="bg-neutral-200 px-2 py-[10px] text-sm rounded mb-1 focus:outline-none placeholder:text-sm"
          placeholder="Enter your email"
        />
        {errors.email && <span className="text-xs text-red-500 mb-2">{errors.email}</span>}

        <label className="text-xs mb-2">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="bg-neutral-200 px-2 py-[10px] text-sm rounded mb-1 focus:outline-none placeholder:text-sm"
          placeholder="Create a password"
        />
        {errors.password && <span className="text-xs text-red-500 mb-2">{errors.password}</span>}
      </div>
      {errors.general && <div className="text-red-500 text-xs mb-2">{errors.general}</div>}
      <button type="submit" className="bg-black rounded-full px-8 py-2 text-white hover:cursor-pointer">
        Create account
      </button>
    </form>
  );
};

export default Signup;
