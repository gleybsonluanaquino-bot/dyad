import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from "./integrations/supabase/session-context";
import MainLayout from "./components/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
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
        <SessionContextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Rotas Protegidas */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
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
        </SessionContextProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;