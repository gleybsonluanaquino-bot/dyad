import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt } from "lucide-react";

const Cobrancas = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Receipt className="w-6 h-6" /> Cobranças
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Contas a Receber</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Lista automática de clientes a prazo e alertas de inadimplência.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cobrancas;