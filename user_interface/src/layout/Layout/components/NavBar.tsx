import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import Logo from '@/assets/Logo Red White.png';
import LogoBlack from '@/assets/Logo Red Larger (WB).png';
import {
  LogIn,
  CalendarPlus,
  Clock,
  Briefcase,
  History,
  Menu,
  X,
} from 'lucide-react';

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Determine if the current path is the homepage
  const isHomePage = location.pathname === '/';

  return (
    <nav className={`sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <img
                className="h-16 w-auto"
                src={isHomePage ? Logo : LogoBlack}
                alt="Logo"
              />
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="flex space-x-4 items-center">
                <Link
                  to="/booking"
                  className={`${isHomePage ? 'text-white' : 'text-black'} flex items-center hover:text-white hover:bg-primary px-3 py-2 rounded-md text-sm font-bold`}
                >
                  <CalendarPlus size={20} className="mr-2 md:block hidden" />
                  Booking
                </Link>
                <Link
                  to="/queue"
                  className={`${isHomePage ? 'text-white' : 'text-black'} flex items-center hover:text-white hover:bg-primary px-3 py-2 rounded-md text-sm font-bold`}
                >
                  <Clock size={20} className="mr-2 md:block hidden" />
                  Queues & Wait Times
                </Link>
                <Link
                  to="/patient-center"
                  className={`${isHomePage ? 'text-white' : 'text-black'} flex items-center hover:text-white hover:bg-primary px-3 py-2 rounded-md text-sm font-bold`}
                >
                  <Briefcase size={20} className="mr-2 md:block hidden" />
                  Services
                </Link>
                <Link
                  to="/history"
                  className={`${isHomePage ? 'text-white' : 'text-black'} flex items-center hover:text-white hover:bg-primary px-3 py-2 rounded-md text-sm font-bold`}
                >
                  <History size={20} className="mr-2 md:block hidden" />
                  Appointment's History
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <Link
              to="/login"
              className={`${isHomePage ? 'text-white' : 'text-black'} flex items-center hover:text-white hover:bg-primary px-3 py-2 rounded-md text-sm font-bold`}
            >
              <LogIn size={20} className='lg:block hidden' />
              <span className="ml-2">Login</span>
            </Link>
          </div>
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${isHomePage ? 'text-white' : 'text-black'} hover:text-white hover:bg-primary px-3 py-2 rounded-md`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className={`sm:hidden ${isHomePage ? 'bg-transparent' : 'bg-white shadow-lg'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/booking"
              className={`${isHomePage ? 'text-white' : 'text-black'} flex items-center hover:text-white hover:bg-primary px-3 py-2 rounded-md text-base font-bold`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <CalendarPlus size={20} className="mr-2" />
              Booking
            </Link>
            <Link
              to="/queue"
              className={`${isHomePage ? 'text-white' : 'text-black'} flex items-center hover:text-white hover:bg-primary px-3 py-2 rounded-md text-base font-bold`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Clock size={20} className="mr-2" />
              Queues & Wait Times
            </Link>
            <Link
              to="/patient-center"
              className={`${isHomePage ? 'text-white' : 'text-black'} flex items-center hover:text-white hover:bg-primary px-3 py-2 rounded-md text-base font-bold`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Briefcase size={20} className="mr-2" />
              Services
            </Link>
            <Link
              to="/history"
              className={`${isHomePage ? 'text-white' : 'text-black'} flex items-center hover:text-white hover:bg-primary px-3 py-2 rounded-md text-base font-bold`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <History size={20} className="mr-2" />
              Appointment's History
            </Link>
            <Link
              to="/login"
              className={`${isHomePage ? 'text-white' : 'text-black'} flex items-center hover:text-white hover:bg-primary px-3 py-2 rounded-md text-base font-bold`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogIn size={20} />
              <span className="ml-2">Login</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
