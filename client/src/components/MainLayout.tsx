import { ReactNode } from "react";
import Nav from "./Nav";

interface MainLayoutProps {
  children: ReactNode;
}
function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Nav />
      <div className="ml-12 md:ml-[8.6rem]">{children}</div>
    </div>
  );
}

export default MainLayout;
