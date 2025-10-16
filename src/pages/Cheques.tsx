import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote } from "lucide-react";

const Cheques = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Banknote className="w-6 h-6" /> Cheques
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Cheques</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Registro de cheques recebidos, histórico de compensações e gestão de cheques devolvidos.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cheques;