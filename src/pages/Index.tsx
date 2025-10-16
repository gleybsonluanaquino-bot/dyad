import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Receipt, TrendingUp } from "lucide-react";
import { useAuth } from "@/integrations/supabase/session-context";

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.first_name || "Usuário";

  // Indicadores principais (Mock Data)
  const indicators = [
    { title: "Vendas Hoje", value: "R$ 5.450,00", icon: TrendingUp, change: "+12% vs ontem" },
    { title: "Cobranças Vencidas", value: "15", icon: Receipt, change: "3 clientes" },
    { title: "Estoque Mínimo", value: "42 itens", icon: Package, change: "Atenção!" },
    { title: "Despesas Pendentes", value: "R$ 1.200,00", icon: DollarSign, change: "5 contas" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">
        Bem-vindo(a), {firstName}!
      </h1>
      <p className="text-muted-foreground">
        Visão geral dos indicadores principais da sua empresa.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {indicators.map((indicator) => (
          <Card key={indicator.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {indicator.title}
              </CardTitle>
              <indicator.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{indicator.value}</div>
              <p className="text-xs text-muted-foreground">
                {indicator.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Gráfico de Vendas Mensais</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            {/* Placeholder para o gráfico */}
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Gráfico de Vendas (Implementação futura)
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Venda #1001 registrada no Caixa.</li>
              <li>Cobrança de João Silva vencida há 65 dias.</li>
              <li>Entrada de 50 unidades do Produto X no Estoque.</li>
              <li>Pagamento de aluguel registrado em Despesas.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Removendo MadeWithDyad daqui, pois já está no MainLayout */}
    </div>
  );
};

export default Dashboard;