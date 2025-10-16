import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const Lucro = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <BarChart3 className="w-6 h-6" /> Lucro
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Balanço Geral</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Cálculo do saldo final da empresa (vendas/recebimentos x pagamentos).
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Lucro;