import { Search, SquarePen } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

type UserToken = {
    name?: string;
};

const Navbar = () => {
    let user: UserToken | null = null;
    const token = localStorage.getItem("token");
    if (token) {
        try {
            user = jwtDecode<UserToken>(token);
            console.log("Decoded user:", user);
        } catch (error) {
            console.error("Invalid token", error);
        }
    }
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white px-16 py-4 flex items-center justify-between w-full border-b">
            <div className="flex items-center gap-8">
                <h1 className="font-noe text-3xl">Medium</h1>
                <div className='relative '>
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 stroke-[1.5px] text-neutral-400" />
                    <input type="text" className="bg-neutral-100 px-4 py-3 text-sm rounded-full pl-10 text-neutral-800 focus:outline-none placeholder:text-sm placeholder:text-neutral-700" placeholder="Search" />
                </div>

            </div>
            <div className='flex items-center gap-4'>
                <button className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 px-4 py-2 rounded-full hover:cursor-pointer">
                    <SquarePen className="h-6 w-6 stroke-1" />
                    <h1 className='text-md'>Write</h1>
                </button>
                <div className='bg-neutral-400 text-black flex items-center justify-center rounded-full w-10 h-10'>
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
