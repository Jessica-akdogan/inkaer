
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { useAuthStore } from '../../store/useAuthStore';
import { useEffect, useRef, useState } from 'react';
import './nav.scss'
import {UserCheck, UserRoundPlus } from 'lucide-react';
import { Button } from '../ui/Button';

const Nav = () => {
  const { user } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    signOut(auth);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
  <nav className="flex justify-center gap-6 my-4">
    <Link to="/" className="text-blue-600 font-medium hover:underline">
      Home
    </Link>
    <Link to="/3d-viewer" className="text-blue-600 font-medium hover:underline">
      3D Viewer
    </Link>
    <Link to="/admin/subscribers" className="text-blue-600 font-medium hover:underline">
      Admin Dashboard
    </Link>
    <Link to="/others" className="text-blue-600 font-medium hover:underline">
     Other Pages
    </Link>
   
    <div className="relative" ref={dropdownRef}>
        {user ? (
          <div className="user-menu">
            <Button className="flex gap-1 cursor-pointer font-medium text-white" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <UserCheck className='w-5 h-5'/> {user.displayName}
            </Button>
            {dropdownOpen && (
              <div className="dropdown">
                <button onClick={handleLogout}>
           
                  Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signin" className="text-blue-600 font-medium hover:underline flex gap-1 nav-link">
           <UserRoundPlus />
            Sign In
            </Link>
        )}
      </div>
  </nav>
);
}

export default Nav;
