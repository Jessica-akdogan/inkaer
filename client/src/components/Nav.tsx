
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav className="flex justify-center gap-6 my-4">
    <Link to="/" className="text-blue-600 font-medium hover:underline">
      Subscribe
    </Link>
    <Link to="/3d-viewer" className="text-blue-600 font-medium hover:underline">
      3D Viewer
    </Link>
    <Link to="/admin/subscribers" className="text-blue-600 font-medium hover:underline">
      Admin Dashboard
    </Link>
  </nav>
);

export default Nav;
