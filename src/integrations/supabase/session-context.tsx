import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "./client";
import { showError } from "@/utils/toast";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (event === "SIGNED_OUT") {
          setSession(null);
          setUser(null);
        } else if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
        }
        setIsLoading(false);
      },
    );

    // Fetch initial session
    supabase.auth
      .getSession()
      .then(({ data: { session: initialSession } }) => {
        if (initialSession) {
          setSession(initialSession);
          setUser(initialSession.user);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching initial session:", error);
        showError("Falha ao carregar sessão inicial.");
        setIsLoading(false);
      });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth must be used within a SessionContextProvider",
    );
  }
  return context;
};