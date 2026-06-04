import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LanguageProvider } from "../contexts/LanguageContext";
import { ProfileProvider } from "../contexts/ProfileContext";

export function Layout() {
  return (
    <LanguageProvider>
      <ProfileProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </ProfileProvider>
    </LanguageProvider>
  );
}