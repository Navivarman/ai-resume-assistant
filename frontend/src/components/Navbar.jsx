import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-gray-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="text-violet-400" size={25} />
          <span className="text-xl font-bold text-white">
            CareerAI
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>

          <a href="#how-it-works" className="transition hover:text-white">
            How it works
          </a>
        </div>

        {/* Action */}
        <button className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-500">
          Get Started
        </button>

      </div>
    </nav>
  );
}

export default Navbar;