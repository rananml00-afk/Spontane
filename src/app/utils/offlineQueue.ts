/**
 * Offline Queue Manager
 * Speichert Formulardaten lokal wenn Supabase nicht erreichbar ist
 * und überträgt sie automatisch wenn die Verbindung wiederhergestellt ist
 */

interface QueuedRequest {
  id: string;
  type: 'speaking-partner' | 'waitlist';
  data: any;
  timestamp: string;
  retryCount: number;
}

const QUEUE_KEY = 'spontane_offline_queue';
const MAX_RETRY = 5;

/**
 * Fügt eine Anfrage zur Offline-Queue hinzu
 */
export function addToQueue(type: 'speaking-partner' | 'waitlist', data: any): string {
  const queue = getQueue();
  const id = `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const request: QueuedRequest = {
    id,
    type,
    data,
    timestamp: new Date().toISOString(),
    retryCount: 0
  };
  
  queue.push(request);
  saveQueue(queue);
  
  console.log(`📦 Added ${type} request to offline queue:`, id);
  return id;
}

/**
 * Holt die aktuelle Queue aus LocalStorage
 */
function getQueue(): QueuedRequest[] {
  try {
    const stored = localStorage.getItem(QUEUE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading offline queue:', error);
    return [];
  }
}

/**
 * Speichert die Queue in LocalStorage
 */
function saveQueue(queue: QueuedRequest[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Error saving offline queue:', error);
  }
}

/**
 * Entfernt eine Anfrage aus der Queue
 */
function removeFromQueue(id: string): void {
  const queue = getQueue();
  const filtered = queue.filter(req => req.id !== id);
  saveQueue(filtered);
  console.log(`✅ Removed request from queue:`, id);
}

/**
 * Erhöht den Retry-Counter für eine Anfrage
 */
function incrementRetryCount(id: string): void {
  const queue = getQueue();
  const request = queue.find(req => req.id === id);
  if (request) {
    request.retryCount++;
    saveQueue(queue);
  }
}

/**
 * Prüft ob Supabase erreichbar ist
 */
async function checkSupabaseHealth(projectId: string, publicAnonKey: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-515521c4/health`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        signal: AbortSignal.timeout(5000) // 5 Sekunden timeout
      }
    );
    return response.ok;
  } catch (error) {
    console.warn('Supabase health check failed:', error);
    return false;
  }
}

/**
 * Versucht, alle Anfragen in der Queue zu senden
 */
export async function processQueue(projectId: string, publicAnonKey: string): Promise<{
  successful: number;
  failed: number;
  remaining: number;
}> {
  const queue = getQueue();
  
  if (queue.length === 0) {
    return { successful: 0, failed: 0, remaining: 0 };
  }
  
  console.log(`🔄 Processing offline queue with ${queue.length} requests...`);
  
  // Erst prüfen ob Supabase erreichbar ist
  const isHealthy = await checkSupabaseHealth(projectId, publicAnonKey);
  if (!isHealthy) {
    console.warn('⚠️ Supabase not available, keeping requests in queue');
    return { successful: 0, failed: 0, remaining: queue.length };
  }
  
  let successful = 0;
  let failed = 0;
  
  for (const request of queue) {
    if (request.retryCount >= MAX_RETRY) {
      console.error(`❌ Request ${request.id} exceeded max retries, removing from queue`);
      removeFromQueue(request.id);
      failed++;
      continue;
    }
    
    try {
      const endpoint = request.type === 'speaking-partner' 
        ? 'speaking-partner' 
        : 'waitlist';
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-515521c4/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(request.data),
          signal: AbortSignal.timeout(10000) // 10 Sekunden timeout
        }
      );
      
      if (response.ok) {
        console.log(`✅ Successfully synced ${request.type} request:`, request.id);
        removeFromQueue(request.id);
        successful++;
      } else {
        console.warn(`⚠️ Failed to sync request ${request.id}, will retry later`);
        incrementRetryCount(request.id);
        failed++;
      }
    } catch (error) {
      console.error(`Error syncing request ${request.id}:`, error);
      incrementRetryCount(request.id);
      failed++;
    }
  }
  
  const remaining = getQueue().length;
  
  console.log(`📊 Queue processing complete: ${successful} successful, ${failed} failed, ${remaining} remaining`);
  
  return { successful, failed, remaining };
}

/**
 * Gibt die Anzahl der Anfragen in der Queue zurück
 */
export function getQueueSize(): number {
  return getQueue().length;
}

/**
 * Löscht die gesamte Queue (nur für Admin/Debug)
 */
export function clearQueue(): void {
  localStorage.removeItem(QUEUE_KEY);
  console.log('🗑️ Offline queue cleared');
}

/**
 * Startet automatisches Sync im Hintergrund
 */
export function startAutoSync(projectId: string, publicAnonKey: string): void {
  // Versuche alle 2 Minuten zu synchronisieren
  setInterval(async () => {
    const queueSize = getQueueSize();
    if (queueSize > 0) {
      console.log(`🔄 Auto-sync triggered (${queueSize} pending requests)`);
      await processQueue(projectId, publicAnonKey);
    }
  }, 120000); // 2 Minuten
  
  // Auch bei window focus synchronisieren
  window.addEventListener('focus', async () => {
    const queueSize = getQueueSize();
    if (queueSize > 0) {
      console.log(`🔄 Window focused, syncing ${queueSize} pending requests`);
      await processQueue(projectId, publicAnonKey);
    }
  });
}
