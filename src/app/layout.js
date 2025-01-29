import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Providers from "./provider"; // Import stays the same

export const metadata = {
  title: "Image Store",
  description: "Welcome to Image Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div> {/* Prevents hydration mismatches */}
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
