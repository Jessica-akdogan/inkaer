
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/config';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
import '../styles/nav.scss'
import {UserCheck, UserRoundPlus } from 'lucide-react';
import { useClickOutside } from '../hooks/useClickOutside';


const Nav = () => {
  const { user, loading } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useClickOutside(() => setDropdownOpen(false));

  const handleLogout = () => {
    signOut(auth);
    setDropdownOpen(false);
  };

  return (
    <nav className="nav">
      <div className="nav__links">
        <Link to="/" className="nav__link">
          Home
        </Link>
        <Link to="/3d-viewer" className="nav__link">
          3D Viewer
        </Link>
        <Link to="/admin/subscribers" className="nav__link">
          Admin Dashboard
        </Link>
        <Link to="/others" className="nav__link">
          Other Pages
        </Link>
      </div>

      <div className="nav__user" ref={dropdownRef}>
        {!loading && user ? (
          <div className="nav__dropdown-wrapper">
            <button className="nav__user-btn" onClick={() => setDropdownOpen((prev) => !prev)}>
              <UserCheck size={20} />
              {user.displayName}
            </button>
            {dropdownOpen && (
              <div className="nav__dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signin" className="nav__signin">
            <UserRoundPlus size={20} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;