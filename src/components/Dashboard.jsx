import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from 'jose';
import Header from './Header';
import Footer from './Footer';
import SkeletonCard from './SkeletonCard';
import InfoCard from './InfoCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let decodedToken = null;

  try {
    if (token) {
      decodedToken = decodeJwt(token);
    }
  } catch (err) {
    console.error('Token decoding error:', err);
  }

  const [loading, setLoading] = useState(true);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = () => {
    setConfirmLogout(true);  // Show confirmation dialog
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    navigate('/');  // Redirect to the login page
  };

  const handleCancelLogout = () => {
    setConfirmLogout(false);  // Hide confirmation dialog
  };

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header email={decodedToken?.email || 'Guest'} />

      <main className="flex-grow bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-6">Welcome to Dashboard</h1>

        {/* Skeleton or Real Content */}
        {loading ? <SkeletonCard /> : <InfoCard />}

        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-700"
        >
          Logout
        </button>
      </main>

      {/* Logout confirmation modal */}
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

      <Footer />
    </div>
  );
};

export default Dashboard;
