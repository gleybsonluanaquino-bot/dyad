import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/integrations/supabase/session-context";
import Sidebar from "./Sidebar";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";
import { MadeWithDyad } from "./made-with-dyad";
import Logo from "./Logo";

interface Profile {
  id: string;
  role: string;
  first_name: string;
}

const MainLayout: React.FC = () => {
  const { session, isLoading: isAuthLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user) {
        setIsProfileLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("id, role, first_name")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          showError("Erro ao carregar perfil do usuário.");
          setProfile(null);
        } else if (data) {
          setProfile(data);
        }
        setIsProfileLoading(false);
      } else {
        setProfile(null);
        setIsProfileLoading(false);
      }
    };

    if (!isAuthLoading) {
      fetchProfile();
    }
  }, [session, isAuthLoading]);

  if (isAuthLoading || isProfileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Carregando sistema...
      </div>
    );
  }

  if (!session) {
    // Se não houver sessão, redireciona para o login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // O role do usuário logado
  const currentRole = profile?.role || "user";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar currentRole={currentRole} />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
          {/* No mobile, o Sidebar já contém o trigger do menu e o logo */}
          <Sidebar currentRole={currentRole} />
          <div className="flex-1 text-lg font-semibold">
            <Logo size="sm" />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto">
          <Outlet />
        </main>
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default MainLayout;