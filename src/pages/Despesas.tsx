import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";

const Despesas = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Wallet className="w-6 h-6" /> Despesas
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Registro de Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Registro de despesas fixas e variáveis e relatórios de categoria.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Despesas;