import { MadeWithDyad } from "@/components/made-with-dyad";

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Meu App. Todos os direitos reservados.
      </p>
      <div className="sm:ml-auto">
        <MadeWithDyad />
      </div>
    </footer>
  );
};