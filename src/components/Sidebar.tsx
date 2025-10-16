import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  DollarSign,
  Package,
  Users,
  Truck,
  Receipt,
  Wallet,
  BarChart,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "./Logo";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home, roles: ["ceo", "user"] },
  { name: "Caixa (Varejo)", href: "/caixa", icon: DollarSign, roles: ["ceo", "caixa"] },
  { name: "Atacadista", href: "/atacadista", icon: DollarSign, roles: ["ceo", "atacado"] },
  { name: "Cobranças", href: "/cobrancas", icon: Receipt, roles: ["ceo", "cobranca"] },
  { name: "Fornecedores", href: "/fornecedores", icon: Truck, roles: ["ceo", "compras"] },
  { name: "Estoque", href: "/estoque", icon: Package, roles: ["ceo", "estoque"] },
  { name: "Despesas", href: "/despesas", icon: Wallet, roles: ["ceo", "financeiro"] },
  { name: "Cheques", href: "/cheques", icon: Users, roles: ["ceo", "financeiro"] },
  { name: "Lucro/Balanço", href: "/lucro", icon: BarChart, roles: ["ceo", "financeiro"] },
];

interface NavLinkProps {
  item: typeof navItems[0];
  currentRole: string | null;
  isMobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ item, currentRole, isMobile }) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;

  // Implementação básica de permissão: verifica se a role do usuário está na lista de roles permitidas
  if (currentRole && !item.roles.includes(currentRole)) {
    return null;
  }

  return (
    <Link
      key={item.name}
      to={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        isActive && "bg-muted text-primary",
        isMobile && "w-full",
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.name}
    </Link>
  );
};

const SidebarContent: React.FC<{ currentRole: string | null }> = ({ currentRole }) => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError("Erro ao sair: " + error.message);
    } else {
      showSuccess("Sessão encerrada com sucesso.");
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 h-full">
      <div className="mb-4">
        <Logo />
      </div>
      <nav className="grid items-start gap-2 flex-1">
        {navItems.map((item) => (
          <NavLink key={item.name} item={item} currentRole={currentRole} />
        ))}
      </nav>
      <div className="pt-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sair
        </Button>
      </div>
    </div>
  );
};

const DesktopSidebar: React.FC<{ currentRole: string | null }> = ({ currentRole }) => (
  <div className="hidden border-r bg-muted/40 md:block">
    <div className="flex h-full max-h-screen flex-col gap-2">
      <SidebarContent currentRole={currentRole} />
    </div>
  </div>
);

const MobileSidebar: React.FC<{ currentRole: string | null }> = ({ currentRole }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="flex flex-col w-[280px] sm:max-w-xs p-0">
      <SidebarContent currentRole={currentRole} />
    </SheetContent>
  </Sheet>
);

const Sidebar: React.FC<{ currentRole: string | null }> = ({ currentRole }) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return <MobileSidebar currentRole={currentRole} />;
  }
  
  return <DesktopSidebar currentRole={currentRole} />;
};

export default Sidebar;