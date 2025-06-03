import Navbar from '../components/Navbar';

export const metadata = {
  title: 'My E-commerce',
  description: 'Clothing store built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ padding: '1rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
