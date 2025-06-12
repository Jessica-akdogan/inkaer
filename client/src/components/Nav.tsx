import { useState } from "react";
import { Link } from "react-router-dom";
import { UserCheck, UserRoundPlus, Menu, X } from "lucide-react";
import { signOut } from "firebase/auth";
import { useAuthStore } from "../store/useAuthStore";
import { useClickOutside } from "../hooks/useClickOutside";
import { auth } from "../firebase/config";
import '../styles/nav.scss'

const Nav = () => {
  const { user, loading } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useClickOutside(() => setDropdownOpen(false));
  const mobileRef = useClickOutside(() => setMobileOpen(false));

  const handleLogout = () => {
    signOut(auth);
    setDropdownOpen(false);
  };

  return (
    <nav className="nav" ref={mobileRef}>


      <button className="nav__hamburger" onClick={() => setMobileOpen((prev) => !prev)}>
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`nav__links ${mobileOpen ? "open" : ""}`}>
        <Link to="/" className="nav__link" onClick={() => setMobileOpen(false)}>
          Home
        </Link>
        <Link to="/3d-viewer" className="nav__link" onClick={() => setMobileOpen(false)}>
          3D Viewer
        </Link>
        <Link to="/admin/subscribers" className="nav__link" onClick={() => setMobileOpen(false)}>
          Admin Dashboard
        </Link>
        <Link to="/others" className="nav__link" onClick={() => setMobileOpen(false)}>
          Other Pages
        </Link>
      

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
      </div>
    </nav>
  );
};

export default Nav;
