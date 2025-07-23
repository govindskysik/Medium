import { assets } from '../assets/assets';
import { useState } from 'react';
import Modal from '../components/auth/Modal';
import Signup from '../components/auth/Signup';
import Signin from '../components/auth/Signin';

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'signup' | 'signin'>('signup');

    return (
        <div className="w-full h-screen bg-[#f6f4ee]">
            <nav className="flex items-center justify-between px-44 py-4 border-b">
                <h1 className="font-noe text-4xl">Medium</h1>
                <div className="flex items-center gap-8">
                    <button
                        className="text-sm hover:underline hover:cursor-pointer"
                        onClick={() => {
                            setModalType('signin');
                            setShowModal(true);
                        }}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => {
                            setModalType('signup');
                            setShowModal(true);
                        }}
                        className="text-sm bg-black px-4 py-2 rounded-full text-white "
                    >
                        Get Started
                    </button>
                </div>
            </nav>
            <main className="flex mt-10">
                <section className="w-[70%] pl-44">
                    <div className="gap-10 flex flex-col items-start justify-center h-full">
                        <h1 className="font-noe text-8xl">
                            Human <br />
                            stories & ideas
                        </h1>
                        <p className="text-xl font-medium">
                            A place to read, write, and deepen your understanding
                        </p>
                        <button onClick={() => {
                            setModalType('signup');
                            setShowModal(true);
                        }} className="bg-black text-white text-xl px-8 py-2 rounded-full">
                            Start reading
                        </button>
                    </div>
                </section>
                <section className="w-[31%]">
                    <img className="w-full object-contain" src={assets.heroImg} alt="Medium" />
                </section>
            </main>
            <footer className="border-t px-44 pt-4 flex items-center justify-center text-xs text-gray-600">
                <div className="flex w-3/5 items-center justify-between">
                    <p>Help</p>
                    <p>Status</p>
                    <p>About</p>
                    <p>Careers</p>
                    <p>Press</p>
                    <p>Blog</p>
                    <p>Privacy</p>
                    <p>Rules</p>
                    <p>Terms</p>
                    <p>Text to speech</p>
                </div>
            </footer>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                {modalType === 'signup' ? <Signup /> : <Signin />}
            </Modal>
        </div>
    );
};

export default LandingPage;
