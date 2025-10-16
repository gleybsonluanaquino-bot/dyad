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
  const [username, setUsername] = useState(""); // Novo campo para o nome de usuário
  const [email, setEmail] = useState(""); // Campo de e-mail agora opcional
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!firstName || !lastName || !username || !password) {
      showError("Por favor, preencha Nome, Sobrenome, Usuário e Senha.");
      setIsSubmitting(false);
      return;
    }

    // 1. Determinar o e-mail a ser usado no Supabase
    let finalEmail = email.trim();
    
    // Se o campo de e-mail opcional estiver vazio, criamos um e-mail fictício
    // usando o nome de usuário fornecido.
    if (!finalEmail) {
      // Sanitiza o nome de usuário para uso no e-mail
      // Adicionando um hash simples para garantir unicidade se o nome de usuário for o mesmo
      const uniqueSuffix = Math.random().toString(36).substring(2, 8);
      const sanitizedUsername = username.toLowerCase().replace(/[^a-z0-9]/g, '');
      finalEmail = `${sanitizedUsername}_${uniqueSuffix}@temp.com`;
    }

    // 2. Chamar o Supabase signUp
    const { error } = await supabase.auth.signUp({
      email: finalEmail,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          username: username, // Salvando o username no metadata
        },
      },
    });

    if (error) {
      let errorMessage = "Falha no cadastro. Tente novamente.";
      
      if (error.message.includes("Password should be at least")) {
        errorMessage = "A senha deve ter pelo menos 6 caracteres.";
      } else if (error.message.includes("User already registered")) {
        errorMessage = "Este e-mail (ou nome de usuário) já está em uso.";
      } else if (error.message.includes("duplicate key value violates unique constraint")) {
        // Isso pode acontecer se o nome de usuário for o mesmo e o e-mail fictício colidir
        errorMessage = "Nome de usuário já em uso. Escolha outro.";
      } else {
        errorMessage = "Falha no cadastro: " + error.message;
      }
      
      showError(errorMessage);
    } else {
      // Se a confirmação de e-mail estiver desativada no Supabase, o login deve ser imediato.
      showSuccess("Cadastro realizado! Você já pode fazer login.");
      onBackToLogin();
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Nome */}
        <div className="space-y-2">
          <Label htmlFor="firstName">Nome *</Label>
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
          <Label htmlFor="lastName">Sobrenome *</Label>
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

      {/* Nome de Usuário (Obrigatório para login sem e-mail) */}
      <div className="space-y-2">
        <Label htmlFor="username">Usuário de Acesso *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="username"
            type="text"
            placeholder="Nome de usuário único"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isSubmitting}
            className="pl-10"
          />
        </div>
      </div>

      {/* E-mail (Opcional) */}
      <div className="space-y-2">
        <Label htmlFor="registerEmail">E-mail (Opcional)</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="registerEmail"
            type="email"
            placeholder="Para recuperação de senha"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            className="pl-10"
          />
        </div>
      </div>

      {/* Senha */}
      <div className="space-y-2">
        <Label htmlFor="registerPassword">Senha *</Label>
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