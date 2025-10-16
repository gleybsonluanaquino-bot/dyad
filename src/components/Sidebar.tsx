import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  Receipt,
  Users,
  Package,
  Wallet,
  Banknote,
  BarChart,
} from "lucide-react";

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: "Caixa", href: "/caixa", icon: DollarSign },
  { name: "Caixa (Atacadista)", href: "/atacadista", icon: DollarSign },
  { name: "Cobranças", href: "/cobrancas", icon: Receipt },
  { name: "Fornecedores", href: "/fornecedores", icon: Users },
  { name: "Estoque", href: "/estoque", icon: Package },
  { name: "Despesas", href: "/despesas", icon: Wallet },
  { name: "Cheques", href: "/cheques", icon: Banknote },
  { name: "Lucro", href: "/lucro", icon: BarChart },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="">Meu App</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  location.pathname === item.href && "bg-muted text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};