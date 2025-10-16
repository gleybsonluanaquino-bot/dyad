const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-64">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Página em Construção
          </h3>
          <p className="text-sm text-muted-foreground">
            Esta funcionalidade estará disponível em breve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;