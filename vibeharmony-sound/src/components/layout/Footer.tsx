
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-12 mt-16 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="text-left">
            <Link to="/" className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8A4FFF] to-[#21A179] flex items-center justify-center mr-3">
                <span className="text-white text-lg font-bold">M</span>
              </div>
              <span className="text-white font-bold text-xl">Mood Music</span>
            </Link>
            <p className="text-white/60 mb-6">
              AI-powered music recommendations based on your mood.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-white font-medium text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="text-white/60 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/history" className="text-white/60 hover:text-white transition-colors">Mood History</Link></li>
              <li><Link to="/social" className="text-white/60 hover:text-white transition-colors">Social</Link></li>
            </ul>
          </div>
          
          <div className="text-left">
            <h3 className="text-white font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">API Docs</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="text-left">
            <h3 className="text-white font-medium text-lg mb-4">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
            <p className="text-white/60">
              Subscribe to our newsletter
            </p>
            <div className="flex mt-2">
              <input 
                type="email" 
                placeholder="Your email"
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-white w-full focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center md:text-left text-white/40">
          <p>© {new Date().getFullYear()} Mood Music. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
