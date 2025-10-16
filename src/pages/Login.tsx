import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/integrations/supabase/session-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { User, Lock, Check, X, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";

const Login = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session) {
      navigate("/", { replace: true });
    }
  }, [session, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showError("Falha no login: " + error.message);
    } else {
      showSuccess("Login realizado com sucesso!");
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Acesso ao Sistema
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Insira suas credenciais para continuar.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Seletor de Empresa/Filial (Mockup) */}
            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa/Filial</Label>
              <div className="relative">
                <Input
                  id="empresa"
                  value="01 - JANIO DOS BONÉS (Mock)"
                  readOnly
                  className="pr-10 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Campo Usuário (E-mail) */}
            <div className="space-y-2">
              <Label htmlFor="email">Usuário (E-mail)</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Seu e-mail de acesso"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Botões OK e Cancelar */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting} className="h-12 text-lg">
                <Check className="w-5 h-5 mr-2" />
                OK
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                disabled={isSubmitting}
                onClick={() => {
                  setEmail("");
                  setPassword("");
                }}
                className="h-12 text-lg"
              >
                <X className="w-5 h-5 mr-2" />
                Cancelar
              </Button>
            </div>
            
            {/* Link Solicitar Acesso / Esqueceu a Senha */}
            <div className="text-center pt-4">
              <a 
                href="#" 
                onClick={() => showError("Funcionalidade de recuperação de senha em desenvolvimento.")}
                className="text-sm text-primary hover:underline"
              >
                Solicitar Acesso / Esqueceu a Senha
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;