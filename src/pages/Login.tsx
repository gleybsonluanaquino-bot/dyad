import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/integrations/supabase/session-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { User, Lock, Check, X } from "lucide-react";
import Logo from "@/components/Logo";
import BranchSelector from "@/components/BranchSelector";
import RegisterForm from "@/components/RegisterForm";

// Componente de Formulário de Login
const LoginForm = ({ isSubmitting, email, setEmail, password, setPassword, handleLogin, selectedBranchId, setSelectedBranchId }: any) => (
  <form onSubmit={handleLogin} className="space-y-6">
    
    {/* Seletor de Empresa/Filial */}
    <BranchSelector 
      onBranchChange={setSelectedBranchId} 
      disabled={isSubmitting}
    />

    {/* Campo Usuário */}
    <div className="space-y-2">
      <Label htmlFor="email">Usuário</Label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="email"
          type="email"
          placeholder="Seu usuário de acesso"
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
  </form>
);


const Login = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("01");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Novo estado para alternar

  useEffect(() => {
    if (session) {
      navigate("/", { replace: true });
    }
  }, [session, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Tentando login na filial:", selectedBranchId);

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

  const title = isRegistering ? "Cadastro de Usuário" : "Acesso ao Sistema";
  const subtitle = isRegistering ? "Preencha seus dados para criar uma nova conta." : "Insira suas credenciais para continuar.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        </CardHeader>
        <CardContent>
          {isRegistering ? (
            <RegisterForm onBackToLogin={() => setIsRegistering(false)} />
          ) : (
            <LoginForm 
              isSubmitting={isSubmitting}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              selectedBranchId={selectedBranchId}
              setSelectedBranchId={setSelectedBranchId}
            />
          )}
          
          {/* Link para alternar entre Login e Cadastro */}
          <div className="text-center pt-6 border-t mt-6">
            {isRegistering ? (
              <a 
                href="#" 
                onClick={() => setIsRegistering(false)}
                className="text-sm text-primary hover:underline"
              >
                Já tem uma conta? Faça Login
              </a>
            ) : (
              <div className="space-y-2">
                <a 
                  href="#" 
                  onClick={() => setIsRegistering(true)}
                  className="text-sm text-primary hover:underline block"
                >
                  Não tem acesso? Cadastre-se aqui
                </a>
                <a 
                  href="#" 
                  onClick={() => showError("Funcionalidade de recuperação de senha em desenvolvimento.")}
                  className="text-sm text-muted-foreground hover:underline block"
                >
                  Esqueceu a Senha?
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;