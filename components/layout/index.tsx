import BottomNav from "../bottomNavigation";

const Layout = ({ children }) => {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
};

export default Layout;
