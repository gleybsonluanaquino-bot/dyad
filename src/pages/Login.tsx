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
const LoginForm = ({ isSubmitting, username, setUsername, password, setPassword, handleLogin, selectedBranchId, setSelectedBranchId }: any) => (
  <form onSubmit={handleLogin} className="space-y-6">
    
    {/* Seletor de Empresa/Filial */}
    <BranchSelector 
      onBranchChange={setSelectedBranchId} 
      disabled={isSubmitting}
    />

    {/* Campo Usuário */}
    <div className="space-y-2">
      <Label htmlFor="username">Usuário</Label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="username"
          type="text" // Alterado para 'text'
          placeholder="Seu usuário de acesso"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          setUsername("");
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
  const [username, setUsername] = useState(""); // Alterado de email para username
  const [password, setPassword] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("01");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (session) {
      navigate("/", { replace: true });
    }
  }, [session, navigate]);

  // Função RPC para resolver o nome de usuário para o e-mail
  const resolveUsernameToEmail = async (username: string): Promise<string | null> => {
    try {
      // Chamando a função RPC do banco de dados
      const { data: email, error } = await supabase.rpc('get_email_by_username', {
        p_username: username,
      });

      if (error) {
        console.error("Erro RPC ao resolver nome de usuário:", error);
        // Se houver erro, tratamos como falha de comunicação
        showError("Erro de comunicação com o servidor. Tente novamente.");
        return null;
      }

      // Se data for null ou undefined, o usuário não foi encontrado
      if (!email) {
        return null;
      }

      return email;
    } catch (error) {
      console.error("Erro inesperado ao resolver nome de usuário:", error);
      showError("Erro interno. Tente novamente.");
      return null;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!username || !password) {
      showError("Por favor, preencha Usuário e Senha.");
      setIsSubmitting(false);
      return;
    }

    // 1. Resolver o nome de usuário para o e-mail real (ou fictício) usando RPC
    const emailToLogin = await resolveUsernameToEmail(username);

    if (!emailToLogin) {
      showError("Usuário não encontrado.");
      setIsSubmitting(false);
      return;
    }

    // 2. Tentar login com o e-mail resolvido
    console.log(`Tentando login com e-mail resolvido: ${emailToLogin} na filial: ${selectedBranchId}`);

    const { error } = await supabase.auth.signInWithPassword({
      email: emailToLogin,
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
              username={username}
              setUsername={setUsername}
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