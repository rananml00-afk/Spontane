import { RouterProvider } from "react-router";
import { AdminTestDashboard } from "./components/AdminTestDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { MatchAnalyzer } from "./components/MatchAnalyzer";
import { OfflineQueueIndicator } from "./components/OfflineQueueIndicator";
import TestMatching from "./test-matching";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { Toaster } from "./components/ui/sonner";
import { useState, useEffect } from "react";
import { startAutoSync, processQueue, getQueueSize } from "./utils/offlineQueue";
import { projectId, publicAnonKey } from "./utils/supabase/info";
import { toast } from "sonner";
import { router } from "./routes";

export default function App() {
  // Match Analyzer - access by adding ?analyze=true to URL
  const [showMatchAnalyzer] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('analyze') === 'true';
  });
  
  // Admin dashboard mode - access by adding ?admin=true to URL
  const [showAdminDashboard] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('admin') === 'true';
  });
  
  // Secret admin test mode - access by adding ?test=true to URL
  const [showTestDashboard] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('test') === 'true';
  });
  
  // Matching test mode - access by adding ?test-matching=true to URL
  const [showMatchingTest] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('test-matching') === 'true';
  });

  // Offline Queue Management - Auto-Sync beim Start
  useEffect(() => {
    // Starte Auto-Sync im Hintergrund
    startAutoSync(projectId, publicAnonKey);
    
    // Prüfe beim ersten Laden ob es ausstehende Requests gibt
    const queueSize = getQueueSize();
    if (queueSize > 0) {
      console.log(`📦 Found ${queueSize} pending requests in offline queue`);
      
      // Zeige Benachrichtigung
      toast.info(`📦 Du hast ${queueSize} gespeicherte Anmeldung${queueSize > 1 ? 'en' : ''} - versuche sie jetzt zu übertragen...`, {
        duration: 4000
      });
      
      // Versuche sofort zu synchronisieren
      processQueue(projectId, publicAnonKey).then(result => {
        if (result.successful > 0) {
          toast.success(`✅ ${result.successful} Anmeldung${result.successful > 1 ? 'en' : ''} erfolgreich übertragen!`, {
            duration: 5000
          });
        }
        if (result.remaining > 0) {
          toast.warning(`⏳ ${result.remaining} Anmeldung${result.remaining > 1 ? 'en' : ''} warten noch auf Übertragung. Wir versuchen es automatisch weiter!`, {
            duration: 6000
          });
        }
      }).catch(error => {
        console.error('Error processing offline queue:', error);
      });
    }
  }, []);

  if (showMatchAnalyzer) {
    return <MatchAnalyzer />;
  }
  
  if (showAdminDashboard) {
    return <AdminDashboard />;
  }
  
  if (showTestDashboard) {
    return <AdminTestDashboard />;
  }
  
  if (showMatchingTest) {
    return <TestMatching />;
  }

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      <OfflineQueueIndicator />
    </>
  );
}