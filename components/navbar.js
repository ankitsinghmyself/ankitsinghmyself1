import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

function NavLink({ to, children }) {
  return (
    <ScrollLink
      to={to}
      smooth={true}
      duration={500}
      spy={true}
      exact="true"
      offset={-80}
      className={`mx-4 font-2xl font-semibold text-gray-700 hover:text-gray-100 transition duration-300 ease-in-out`}
      activeClass="text-gray-100"
    >
      {children}
    </ScrollLink>
  );
}

function MobileNav({ open, setOpen }) {
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${
        open ? '-translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
        <Link href="#home-section">
          <a className="text-xl font-semibold">Ankit</a>
        </Link>
      </div>
      <div className="flex flex-col ml-4">
        <NavLink to="home-section" onClick={() => setOpen(!open)}>
          HOME
        </NavLink>
        <NavLink to="about-section" onClick={() => setOpen(!open)}>
          ABOUT
        </NavLink>
        <NavLink to="projects-section" onClick={() => setOpen(!open)}>
          PROJECTS
        </NavLink>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navBgColor = scrolled ? 'bg-red-600' : 'bg-transparent';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 ${navBgColor} px-4 py-4 h-15 items-center`}
    >
      <MobileNav open={open} setOpen={setOpen} />
      <div className="container mx-auto flex items-center justify-between">
        <div className="w-3/12 flex items-center">
          <Link href="/">
            <a className="text-2xl font-semibold">Ankit.</a>
          </Link>
        </div>
        <div className="w-9/12 flex justify-end items-center">
          <div
            className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {/* hamburger button */}
            <span
              className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
                open ? 'rotate-45 translate-y-3.5' : ''
              }`}
            />
            <span
              className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${
                open ? 'w-0' : 'w-full'
              }`}
            />
            <span
              className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
                open ? '-rotate-45 -translate-y-3.5' : ''
              }`}
            />
          </div>

          <div className="hidden md:flex">
            <NavLink to="home-section">HOME</NavLink>
            <NavLink to="projects-section">PROJECTS</NavLink>
            <NavLink to="about-section">ABOUT</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
