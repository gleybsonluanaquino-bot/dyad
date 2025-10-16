import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const Caixa = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <DollarSign className="w-6 h-6" /> Caixa
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Registro de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Aqui será implementada a gestão de vendas, formas de pagamento e cadastro de clientes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Caixa;