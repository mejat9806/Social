import { Link } from "react-router-dom";

import {
  BookMarked,
  HomeIcon,
  LogOut,
  LucideOctagon,
  Menu,
  SearchIcon,
  icons,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navitems = [
  { name: "Logo", icons: <LucideOctagon />, link: "/" },
  { name: "Home", icons: <HomeIcon />, link: "/" },
  { name: "Search", icons: <SearchIcon />, link: "#" },
  { name: "Bookmark", icons: <BookMarked />, link: "#" },
];
function Nav() {
  return (
    <nav className="flex flex-col justify-between  items-center h-screen bg-gray-200/50 w-[50px] md:w-[140px]  backdrop-blur-2xl	fixed border-r-2 border-slate-500/25 transition-all duration-150">
      <div className="flex flex-col justify-between  items-center  h-1/3 mt-10 transition-all duration-150">
        {navitems.map((navitem) => (
          <Link to={navitem.link} className="flex gap-2">
            <span>{navitem.icons}</span>{" "}
            <span className="hidden md:flex transition-all duration-150">
              {navitem.name}
            </span>
          </Link>
        ))}
      </div>
      {/* <button className="w-10 mt-32 mb-10 flex justify-center ">
        <LogOut className="rotate-180" />
      </button> */}
      <div className="mt-32 mb-10">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white/20 backdrop-blur-2xl drop-shadow-2xl ml-5">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/dashboard" className="p-0">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Contact the Dev</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Nav;
