import { useEffect, useState } from 'react';
import { getQueueSize, processQueue } from '../utils/offlineQueue';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import { Cloud, CloudOff, RefreshCw } from 'lucide-react';

/**
 * Zeigt den Status der Offline-Queue an
 */
export function OfflineQueueIndicator() {
  const [queueSize, setQueueSize] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Aktualisiere Queue-Größe alle 5 Sekunden
    const updateQueueSize = () => {
      setQueueSize(getQueueSize());
    };

    updateQueueSize();
    const interval = setInterval(updateQueueSize, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      const result = await processQueue(projectId, publicAnonKey);
      
      if (result.successful > 0) {
        toast.success(`✅ ${result.successful} Anmeldung${result.successful > 1 ? 'en' : ''} erfolgreich übertragen!`);
      }
      
      if (result.failed > 0 && result.remaining > 0) {
        toast.warning(`⏳ ${result.remaining} Anmeldung${result.remaining > 1 ? 'en' : ''} konnten noch nicht übertragen werden. Wir versuchen es weiter automatisch!`);
      }
      
      if (result.successful === 0 && result.failed === 0 && result.remaining === 0) {
        toast.success('✅ Alle Anmeldungen wurden erfolgreich übertragen!');
      }
      
      setQueueSize(result.remaining);
    } catch (error) {
      console.error('Error during manual sync:', error);
      toast.error('Verbindung fehlgeschlagen. Versuche es später erneut.');
    } finally {
      setIsSyncing(false);
    }
  };

  if (queueSize === 0) {
    // Kleines grünes Online-Icon (dezent)
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-green-50 border-2 border-green-200 rounded-full p-2 shadow-sm">
        <Cloud className="w-4 h-4 text-green-600" />
      </div>
    );
  }

  // Zeige auffällige Queue-Anzeige wenn Daten warten
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border-2 border-orange-400 rounded-lg shadow-xl p-4 max-w-xs">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
          <CloudOff className="w-5 h-5 text-orange-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 mb-1">
            {queueSize} Anmeldung{queueSize > 1 ? 'en' : ''} gespeichert
          </p>
          <p className="text-xs text-gray-600 mb-2">
            Wird automatisch übertragen sobald die Verbindung wieder steht
          </p>
          
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="text-xs bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-3 py-1.5 rounded-md font-medium flex items-center gap-1 transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Übertrage...' : 'Jetzt versuchen'}
          </button>
        </div>
        
        <button
          onClick={() => setQueueSize(0)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Schließen"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
