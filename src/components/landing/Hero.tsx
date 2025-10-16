import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Construa Sua Próxima Grande Ideia
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Um ponto de partida bonito e simples para o seu próximo projeto.
              Criado com Dyad.
            </p>
          </div>
          <div className="space-x-4">
            <Link to="#">
              <Button>Começar</Button>
            </Link>
            <Link to="#">
              <Button variant="secondary">Saiba Mais</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};