import { MountainIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background shadow-sm">
      <Link to="/" className="flex items-center justify-center">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">My App</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          to="#"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Features
        </Link>
        <Link
          to="#"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Pricing
        </Link>
        <Link
          to="#"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          About
        </Link>
        <Link
          to="#"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};