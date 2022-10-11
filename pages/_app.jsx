import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { AdminProvider, useAdmin } from "../lib/context/admin";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdmin();
  if (loading || !isAuthenticated) {
    return <p>Loading... 🙏🏻</p>;
  }
  return children;
};

function MyApp({ Component, pageProps }) {
  return (
    <AdminProvider>
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    </AdminProvider>
  );
}

export default MyApp;
