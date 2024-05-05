import Footer from "../components/Footer/Footer.jsx";
import Navbar from "../components/Navbar/Navbar.jsx"

export const HomeLayout = ({ children }) => {
  return (
    <>
      <Navbar/>
      {children}
      <Footer />
    </>
  );
};