
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Plus, Search } from "lucide-react";
import GradientButton from "../ui/GradientButton";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 glass-card bg-black/50 backdrop-blur-xl" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8A4FFF] to-[#21A179] flex items-center justify-center mr-3">
            <span className="text-white text-lg font-bold">M</span>
          </div>
          <span className="text-white font-bold text-xl">Mood Music</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`text-white/80 hover:text-white transition-colors ${location.pathname === "/" ? "text-white" : ""}`}>
            Home
          </Link>
          <Link to="/dashboard" className={`text-white/80 hover:text-white transition-colors ${location.pathname === "/dashboard" ? "text-white" : ""}`}>
            Dashboard
          </Link>
          <Link to="/search" className={`text-white/80 hover:text-white transition-colors ${location.pathname === "/search" ? "text-white" : ""}`}>
            <div className="flex items-center">
              <Search size={16} className="mr-1" />
              Search
            </div>
          </Link>
          <Link to="/history" className={`text-white/80 hover:text-white transition-colors ${location.pathname === "/history" ? "text-white" : ""}`}>
            Mood History
          </Link>
          <Link to="/create-playlist" className={`text-white/80 hover:text-white transition-colors ${location.pathname === "/create-playlist" ? "text-white" : ""}`}>
            <div className="flex items-center">
              <Plus size={16} className="mr-1" />
              Create Playlist
            </div>
          </Link>
          <Link to="/social" className={`text-white/80 hover:text-white transition-colors ${location.pathname === "/social" ? "text-white" : ""}`}>
            Social
          </Link>
          <Link to="/profile" className={`text-white/80 hover:text-white transition-colors ${location.pathname === "/profile" ? "text-white" : ""}`}>
            Profile
          </Link>
          {isHome && (
            <Link to="/auth">
              <GradientButton size="sm">Get Started</GradientButton>
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white p-2 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl py-4 px-6 flex flex-col space-y-4 border-t border-white/10 animate-fade-in">
          <Link 
            to="/" 
            className={`text-white/80 hover:text-white transition-colors ${location.pathname === "/" ? "text-white" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={`text-white/80 hover:text-white transition-colors ${location.pathname === "/dashboard" ? "text-white" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/search" 
            className={`text-white/80 hover:text-white transition-colors ${location.pathname === "/search" ? "text-white" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center">
              <Search size={16} className="mr-1" />
              Search
            </div>
          </Link>
          <Link 
            to="/history" 
            className={`text-white/80 hover:text-white transition-colors ${location.pathname === "/history" ? "text-white" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Mood History
          </Link>
          <Link 
            to="/create-playlist" 
            className={`text-white/80 hover:text-white transition-colors ${location.pathname === "/create-playlist" ? "text-white" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center">
              <Plus size={16} className="mr-1" />
              Create Playlist
            </div>
          </Link>
          <Link 
            to="/social" 
            className={`text-white/80 hover:text-white transition-colors ${location.pathname === "/social" ? "text-white" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Social
          </Link>
          <Link 
            to="/profile" 
            className={`text-white/80 hover:text-white transition-colors ${location.pathname === "/profile" ? "text-white" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Profile
          </Link>
          {isHome && (
            <Link 
              to="/auth"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <GradientButton size="sm" className="w-full">Get Started</GradientButton>
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
