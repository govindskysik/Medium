import AllBlogs from "../components/Blog/AllBlogs";
import Navbar from "../components/Blog/Navbar";

const BlogPage = () => {
    return (
        <div className="w-full h-screen overflow-y-auto">
            <Navbar />
            <main className="pt-20 px-16 pb-10 ">
                <AllBlogs />
            </main>
        </div>
    );
};

export default BlogPage;
