import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../constants";
import axios from "axios";
import { assets } from "../../assets/assets";

type Blog = {
    id: string | number;
    title: string;
    content: string;
};

const AllBlogs = () => {
    const [error, setError] = useState<string | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Unauthorized access. Please sign in.");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(API_ENDPOINTS.getBlogs, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBlogs(response.data);
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data?.error ||
                        err.message ||
                        "An error occurred."
                    );
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-96 text-lg">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

    return (
        <div className="flex justify-center w-full min-h-screen">
            <div className="w-full max-w-4xl flex flex-col gap-8 pt-10 pb-20">
                {blogs.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg mt-10">No blogs found.</div>
                ) : (
                    blogs.map((blog) => (
                        <div
                            className="bg-white p-8 border-b border-neutral-200 flex items-center justify-between cursor-pointer"
                            key={blog.id}
                        >
                            <div>
                                <h1 className="text-2xl font-black mb-2 text-neutral-900">{blog.title}</h1>
                                <p className="text-neutral-500 font-medium leading-relaxed">{blog.content}</p>
                            </div>

                            <div>
                                <img
                                    src={assets.coverImage}
                                    alt="Blog cover"
                                    className="w-full h-24 object-cover"
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllBlogs;
