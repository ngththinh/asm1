import './globals.css';
import Navbar from '../components/Navbar';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'TechHub - Modern Technology Store',
  description: 'Discover the latest technology products at TechHub - Your premium tech destination',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="app-layout">
            <Navbar />
            <main className="main-content">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
