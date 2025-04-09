import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer
import { decodeJwt } from 'jose'; // Import decodeJwt to decode the token

const Settings = () => {
  // Get the token from localStorage
  const token = localStorage.getItem('token');
  let email = '';

  // Decode the token to get the email
  try {
    if (token) {
      const decodedToken = decodeJwt(token);
      email = decodedToken.email;
    }
  } catch (err) {
    console.error('Error decoding token:', err);
  }

  return (
    <div className="flex flex-col min-h-screen"> {/* Full height container */}
      <Header email={email} /> {/* Pass decoded email */}
      <div className="p-6 flex-grow">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <p>This is the settings page where you can configure your preferences.</p>
      </div>
      <Footer /> {/* Add Footer */}
    </div>
  );
};

export default Settings;
