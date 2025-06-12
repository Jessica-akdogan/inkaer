
import {  useNavigate } from 'react-router-dom'

const OtherPages = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-post");
    window.location.reload(); 
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-white text-gray-600 rounded-2xl shadow-lg">
       {/* <Link to="/r2-upload" className="text-blue-600 font-medium hover:underline">
       image upload
    </Link> */}
  <span
      onClick={handleClick}
      className="text-blue-600 font-medium hover:underline cursor-pointer"
    >
      Create Post
    </span>

  </div>
  )
}

export default OtherPages