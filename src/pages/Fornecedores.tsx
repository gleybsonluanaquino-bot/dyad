import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const Fornecedores = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Users className="w-6 h-6" /> Fornecedores
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Fornecedores</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Cadastro, histórico de compras e saldo devedor por fornecedor.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Fornecedores;