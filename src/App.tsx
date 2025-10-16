import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Caixa from "./pages/Caixa";
import Atacadista from "./pages/Atacadista";
import Cobrancas from "./pages/Cobrancas";
import Fornecedores from "./pages/Fornecedores";
import Estoque from "./pages/Estoque";
import Despesas from "./pages/Despesas";
import Cheques from "./pages/Cheques";
import Lucro from "./pages/Lucro";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/caixa" element={<Caixa />} />
            <Route path="/atacadista" element={<Atacadista />} />
            <Route path="/cobrancas" element={<Cobrancas />} />
            <Route path="/fornecedores" element={<Fornecedores />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/despesas" element={<Despesas />} />
            <Route path="/cheques" element={<Cheques />} />
            <Route path="/lucro" element={<Lucro />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;