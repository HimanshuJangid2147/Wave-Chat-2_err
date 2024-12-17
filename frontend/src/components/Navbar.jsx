import { LogOut, Settings, UserPen, LogIn, CircleEllipsis } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useLocation } from "react-router-dom"; // Added `useLocation` to track current page
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isMenuOpen, setMenuOpen] = useState(false); // Mobile menu toggle state
  const location = useLocation(); // Current location to identify sign-in/sign-up pages

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // Check if the user is on the Sign In or Sign Up page
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <header className="bg-gradient-to-b from-[#002233] to-[#001522] shadow-md sticky w-full top-0 z-40 backdrop-blur-lg font-redhat">
      <div className="h-16 flex items-center justify-between px-4">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-lg">
            <img
              src="./src/assets/Wave-Chat_svg.svg"
              alt="Wave Chat Logo"
              className="h-8 w-8"
            />
          </div>
          <span className="text-lg font-semibold tracking-wide text-[#cdfdff]">
            Wave Chat
          </span>
        </Link>

        {/* Links & Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop View */}
          <div className="hidden sm:flex items-center gap-4">
            {isAuthPage ? (
              // Show only Settings on Sign In/Sign Up pages
              <Link
                to="/settings"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-primary/10 hover:bg-primary/20 transition-all text-[#cdfdff]"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5 text-primary" />
                <span className="hidden sm:inline text-primary">Settings</span>
              </Link>
            ) : authUser ? (
              // Show all options for logged-in users
              <>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-primary/10 hover:bg-primary/20 transition-all text-[#cdfdff]"
                  aria-label="Settings"
                >
                  <Settings className="w-5 h-5 text-primary" />
                  <span className="hidden sm:inline text-primary">Settings</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-primary/10 hover:bg-primary/20 transition-all text-[#cdfdff]"
                  aria-label="Profile"
                >
                  <UserPen className="w-5 h-5 text-primary" />
                  <span className="hidden sm:inline text-primary">Profile</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-primary/10 hover:bg-primary/20 transition-all text-[#cdfdff]"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                  <span className="hidden sm:inline text-red-500">Logout</span>
                </button>
              </>
            ) : (
              // Show Login and Settings for logged-out users
              <>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-primary/10 hover:bg-primary/20 transition-all text-[#cdfdff]"
                  aria-label="Settings"
                >
                  <Settings className="w-5 h-5 text-primary" />
                  <span className="hidden sm:inline text-primary">Settings</span>
                </Link>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-primary/10 hover:bg-primary/20 transition-all text-[#cdfdff]"
                  aria-label="Login"
                >
                  <LogIn className="w-5 h-5 text-primary" />
                  <span className="hidden sm:inline text-primary">Login</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile View */}
          <button
            onClick={toggleMenu}
            className="sm:hidden flex items-center justify-center p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all text-[#cdfdff]"
            aria-label="Menu"
          >
            <CircleEllipsis className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-[#001522] border-t border-[#002233] py-4 px-4">
          {isAuthPage ? (
            // Show only Settings in the mobile dropdown for Sign In/Sign Up pages
            <Link
              to="/settings"
              onClick={toggleMenu}
              className="block py-2 text-sm font-medium text-[#cdfdff] hover:opacity-90"
            >
              <Settings className="inline w-5 h-5 text-primary mr-2" />
              Settings
            </Link>
          ) : authUser ? (
            // Show all options for logged-in users in mobile view
            <>
              <Link
                to="/settings"
                onClick={toggleMenu}
                className="block py-2 text-sm font-medium text-[#cdfdff] hover:opacity-90"
              >
                <Settings className="inline w-5 h-5 text-primary mr-2" />
                Settings
              </Link>
              <Link
                to="/profile"
                onClick={toggleMenu}
                className="block py-2 text-sm font-medium text-[#cdfdff] hover:opacity-90"
              >
                <UserPen className="inline w-5 h-5 text-primary mr-2" />
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="block py-2 text-sm font-medium text-[#cdfdff] hover:opacity-90"
              >
                <LogOut className="inline w-5 h-5 text-red-500 mr-2" />
                Logout
              </button>
            </>
          ) : (
            // Show Login and Settings for logged-out users in mobile view
            <>
              <Link
                to="/settings"
                onClick={toggleMenu}
                className="block py-2 text-sm font-medium text-[#cdfdff] hover:opacity-90"
              >
                <Settings className="inline w-5 h-5 text-primary mr-2" />
                Settings
              </Link>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="block py-2 text-sm font-medium text-[#cdfdff] hover:opacity-90"
              >
                <LogIn className="inline w-5 h-5 text-primary mr-2" />
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
