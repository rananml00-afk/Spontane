import { Outlet, useNavigate } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LanguageProvider } from "../contexts/LanguageContext";
import { ProfileProvider, useProfile } from "../contexts/ProfileContext";
import { LoginDialog } from "./LoginDialog";

// Inner shell — can use ProfileContext hooks
function AppShell() {
  const { isLoginDialogOpen, closeLoginDialog } = useProfile();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <LoginDialog
        open={isLoginDialogOpen}
        onOpenChange={(open) => { if (!open) closeLoginDialog(); }}
        onCreateProfile={() => { closeLoginDialog(); navigate('/profile'); }}
      />
    </div>
  );
}

export function Layout() {
  return (
    <LanguageProvider>
      <ProfileProvider>
        <AppShell />
      </ProfileProvider>
    </LanguageProvider>
  );
}
