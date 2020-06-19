import BottomNav from "../bottomNavigation";
import Navbar from "../../components/navbar";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <BottomNav />
    </>
  );
};

export default Layout;
