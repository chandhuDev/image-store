import Providers from "./provider";
import "../styles/globals.css";

import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Image Store",
  description: "Welcome to Image Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}