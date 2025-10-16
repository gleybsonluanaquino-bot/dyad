import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/config/nav";
import { cn } from "@/lib/utils";

export const DashboardHeader = () => {
  const location = useLocation();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Alternar menu de navegação</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <div className="flex h-14 items-center border-b px-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <span className="">Meu App</span>
            </Link>
          </div>
          <nav className="grid items-start p-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  location.pathname === item.href && "bg-muted text-primary",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">{/* Espaço para futuros elementos */}</div>
    </header>
  );
};