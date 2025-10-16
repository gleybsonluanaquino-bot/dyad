import { MountainIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background shadow-sm">
      <Link to="/" className="flex items-center justify-center">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Meu App</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          to="#"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Recursos
        </Link>
        <Link
          to="#"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Preços
        </Link>
        <Link
          to="#"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Sobre
        </Link>
        <Link
          to="#"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Contato
        </Link>
      </nav>
    </header>
  );
};