import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setConfirmLogout(true);
  };

  const handleConfirmLogout = () => {
    toast.success("Logging out...");
    setTimeout(() => {
      localStorage.removeItem('token');
      navigate('/');
    }, 1500);
  };

  const handleCancelLogout = () => {
    setConfirmLogout(false);
  };

  return (
    <>
      <header className="bg-cyan-500 text-white p-4 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Hey, {email}</h1>
          <button onClick={toggleSidebar} className="text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-lg font-bold text-cyan-600 mb-4">Navigation</h2>
          <ul className="space-y-3 text-gray-800">
            <li>
              <Link to="/dashboard" className="hover:text-cyan-500">Dashboard</Link>
            </li>
            <li>
              <Link to="/settings" className="hover:text-cyan-500">Settings</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-cyan-500">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:text-cyan-500">Logout</button>
            </li>
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleSidebar}
        />
      )}

      {confirmLogout && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to logout?</h3>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-700"
              >
                Yes
              </button>
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
