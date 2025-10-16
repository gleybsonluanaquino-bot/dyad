import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/integrations/supabase/session-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Definição das traduções em português (pt-BR)
const i18n = {
  pt: {
    sign_in: {
      email_label: "E-mail",
      password_label: "Senha",
      button_label: "Entrar",
      social_auth_message: "Entrar com provedor",
      link_text: "Já tem uma conta? Faça login",
      confirmation_message: "Verifique seu e-mail para o link de login mágico.",
      // Adicionando placeholders em português
      email_input_placeholder: "Seu endereço de e-mail",
      password_input_placeholder: "Sua senha",
    },
    sign_up: {
      email_label: "E-mail",
      password_label: "Criar Senha",
      button_label: "Cadastrar",
      social_auth_message: "Cadastrar com provedor",
      link_text: "Não tem uma conta? Cadastre-se",
      confirmation_message: "Verifique seu e-mail para o link de confirmação.",
      // Adicionando placeholders em português
      email_input_placeholder: "Seu endereço de e-mail",
      password_input_placeholder: "Crie uma senha segura",
    },
    forgotten_password: {
      email_label: "E-mail",
      password_label: "Sua Senha",
      button_label: "Enviar instruções de redefinição",
      link_text: "Esqueceu sua senha?",
      confirmation_message: "Verifique seu e-mail para o link de redefinição de senha.",
      email_input_placeholder: "Seu endereço de e-mail",
    },
    update_password: {
      password_label: "Nova Senha",
      password_input_placeholder: "Sua nova senha",
      button_label: "Atualizar senha",
      confirmation_message: "Sua senha foi atualizada.",
    },
    magic_link: {
      email_input_label: "E-mail",
      email_input_placeholder: "Seu endereço de e-mail",
      phone_input_label: "Número de telefone",
      phone_input_placeholder: "Seu número de telefone",
      button_label: "Enviar link mágico",
      link_text: "Entrar com link mágico",
      confirmation_message: "Verifique seu e-mail para o link de login mágico.",
    },
    verify_otp: {
      email_input_label: "E-mail",
      email_input_placeholder: "Seu endereço de e-mail",
      phone_input_label: "Número de telefone",
      phone_input_placeholder: "Seu número de telefone",
      token_input_label: "Token",
      token_input_placeholder: "Seu token OTP",
      button_label: "Verificar token",
      link_text: "Já tem um token? Verifique",
    },
  },
};

const Login = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (session) {
      // Redireciona usuários autenticados para a página principal
      navigate("/", { replace: true });
    }
  }, [session, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Bem-vindo(a) ao
          </p>
          <CardTitle className="text-3xl font-extrabold text-primary">
            FinApp Pro
          </CardTitle>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Acesso ao Sistema Financeiro
          </p>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            providers={[]}
            redirectTo={window.location.origin}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "hsl(var(--primary))",
                    brandAccent: "hsl(var(--primary-foreground))",
                  },
                },
              },
            }}
            theme="light"
            view="sign_in"
            localization={{
              lang: "pt",
              variables: i18n.pt,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;