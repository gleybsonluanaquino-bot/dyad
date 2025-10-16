import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

const Estoque = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Package className="w-6 h-6" /> Estoque
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Controle de Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Gestão de estoque separado (loja e depósito), entrada de notas e cálculo de custo final.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Estoque;