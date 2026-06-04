import { RouterProvider } from "react-router";
import { OfflineQueueIndicator } from "./components/OfflineQueueIndicator";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import { startAutoSync, processQueue, getQueueSize } from "./utils/offlineQueue";
import { projectId, publicAnonKey } from "./utils/supabase/info";
import { toast } from "sonner";
import { router } from "./routes";

export default function App() {
  useEffect(() => {
    startAutoSync(projectId, publicAnonKey);

    const queueSize = getQueueSize();
    if (queueSize > 0) {
      toast.info(`📦 Du hast ${queueSize} gespeicherte Anmeldung${queueSize > 1 ? 'en' : ''} - versuche sie jetzt zu übertragen...`, {
        duration: 4000
      });

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
      }).catch(() => {});
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      <OfflineQueueIndicator />
    </>
  );
}