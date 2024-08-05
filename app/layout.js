
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ToastContainer } from "./Toast";
import 'react-toastify/dist/ReactToastify.css';

const inter = Poppins({ subsets: ["latin"], weight:["100","200","300","400","500","600","700","800","900"] });

export const metadata = {
  title: "Registration",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <ToastContainer/>
        <Footer/>
        </body>
    </html>
  );
}
