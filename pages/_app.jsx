import "../styles/globals.scss";
import 'react-toastify/dist/ReactToastify.css';
import {AdminProvider} from '../lib/context/admin'

function MyApp({ Component, pageProps }) {
  return (
    <AdminProvider>
      <Component {...pageProps} />
    </AdminProvider>
  );
}

export default MyApp;
