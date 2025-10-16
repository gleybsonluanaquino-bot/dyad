const Dashboard = () => {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-full">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Bem-vindo ao seu Dashboard
        </h3>
        <p className="text-sm text-muted-foreground">
          Selecione uma opção no menu lateral para começar.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;