import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { User, Lock, Mail, Check, X } from "lucide-react";

interface RegisterFormProps {
  onBackToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onBackToLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!firstName || !lastName || !email || !password) {
      showError("Por favor, preencha todos os campos.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      showError("Falha no cadastro: " + error.message);
    } else {
      showSuccess("Cadastro realizado! Verifique seu e-mail para confirmar sua conta.");
      // O usuário deve ser redirecionado para o login após a confirmação do e-mail
      onBackToLogin();
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Nome */}
        <div className="space-y-2">
          <Label htmlFor="firstName">Nome</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Primeiro Nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        {/* Sobrenome */}
        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* E-mail */}
      <div className="space-y-2">
        <Label htmlFor="registerEmail">E-mail</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="registerEmail"
            type="email"
            placeholder="Seu e-mail (será seu usuário)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            className="pl-10"
          />
        </div>
      </div>

      {/* Senha */}
      <div className="space-y-2">
        <Label htmlFor="registerPassword">Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="registerPassword"
            type="password"
            placeholder="Crie uma senha segura"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
            className="pl-10"
          />
        </div>
      </div>

      {/* Botões */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <Button type="submit" disabled={isSubmitting} className="h-12 text-lg">
          <Check className="w-5 h-5 mr-2" />
          Cadastrar
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          disabled={isSubmitting}
          onClick={onBackToLogin}
          className="h-12 text-lg"
        >
          <X className="w-5 h-5 mr-2" />
          Voltar
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;