import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function NavLanding() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const idbu = '/image/K-3-removebg.png';

    return (
        <nav className="fixed top-0 left-0 z-50 w-full">
            <div className="mx-auto -mt-10 flex max-w-7xl items-center justify-between px-4">
                <img className="h-50 w-55" src={idbu} alt="Logo" />

                {/* Tombol hamburger */}
                <button onClick={toggleMenu} className="z-50 text-white">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Slide-in Menu */}
            <div
                className={`fixed top-0 right-0 z-40 h-full w-96 transform bg-white/20 backdrop-blur-md transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <ul className="mt-25 space-y-4 px-6 text-2xl font-semibold tracking-wider text-white">
                    <li>
                        <a href="#features" className="block hover:text-blue-400" onClick={toggleMenu}>
                            Features
                        </a>
                    </li>
                    <li>
                        <a href="#services" className="block hover:text-blue-400" onClick={toggleMenu}>
                            Services
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="block hover:text-blue-400" onClick={toggleMenu}>
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
