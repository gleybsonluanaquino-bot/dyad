import {
  DollarSign,
  Receipt,
  Users,
  Package,
  Wallet,
  Banknote,
  BarChart,
} from "lucide-react";

export type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

export const navItems: NavItem[] = [
  { name: "Caixa", href: "/caixa", icon: DollarSign },
  { name: "Caixa (Atacadista)", href: "/atacadista", icon: DollarSign },
  { name: "Cobranças", href: "/cobrancas", icon: Receipt },
  { name: "Fornecedores", href: "/fornecedores", icon: Users },
  { name: "Estoque", href: "/estoque", icon: Package },
  { name: "Despesas", href: "/despesas", icon: Wallet },
  { name: "Cheques", href: "/cheques", icon: Banknote },
  { name: "Lucro", href: "/lucro", icon: BarChart },
];