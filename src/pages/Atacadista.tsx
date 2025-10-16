import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const Atacadista = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <DollarSign className="w-6 h-6" /> Caixa (Atacadista)
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Vendas Atacado</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Funcionalidade de vendas com preços diferenciados para atacadistas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Atacadista;