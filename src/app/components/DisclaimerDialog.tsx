import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from '../contexts/LanguageContext';

interface DisclaimerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DisclaimerDialog({ open, onOpenChange }: DisclaimerDialogProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">⚠️ Disclaimer / Haftungsausschluss</DialogTitle>
          <DialogDescription>
            Last Updated: January 24, 2026
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            
            {/* CRITICAL WARNING BOX */}
            <div className="bg-red-50 border-4 border-red-500 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-red-900 mb-3 flex items-center gap-2">
                ⚠️ WICHTIGER HAFTUNGSAUSSCHLUSS
              </h3>
              <div className="space-y-3 text-red-900">
                <p className="font-bold text-lg">
                  🚧 Spontane ist ein neues Startup-Projekt in der BETA-Phase!
                </p>
                <p className="font-semibold">
                  Wir sind ein kleines Team, das gerade erst anfängt. Unsere Plattform wird aktiv entwickelt und ist NICHT fehlerfrei.
                </p>
              </div>
            </div>

            {/* NO LIABILITY SECTION */}
            <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-5">
              <h3 className="font-bold text-xl text-orange-900 mb-3">
                🛡️ KEINE HAFTUNG - NUTZUNG AUF EIGENES RISIKO
              </h3>
              <div className="text-gray-900 space-y-2 text-sm">
                <p className="font-semibold">
                  Spontane, seine Gründer, Mitarbeiter, Partner und verbundene Unternehmen übernehmen <strong className="text-red-600">KEINERLEI HAFTUNG</strong> für:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Fehler, Bugs oder Systemausfälle der Plattform</li>
                  <li>Datenverluste, Sicherheitsverletzungen oder unbefugten Zugriff</li>
                  <li>Ungeeignete oder gefährliche Sprachpartner-Matches</li>
                  <li>Verhalten, Handlungen oder Unterlassungen anderer Nutzer</li>
                  <li>Körperverletzung, Sachschäden oder finanzielle Verluste</li>
                  <li>Missverständnisse, Konflikte oder Streitigkeiten zwischen Nutzern</li>
                  <li>Ungenauigkeiten in Übersetzungen oder Inhalten</li>
                  <li>Service-Unterbrechungen oder Nichtverfügbarkeit</li>
                </ul>
              </div>
            </div>

            {/* BETA STAGE EXPLANATION */}
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-5">
              <h3 className="font-bold text-xl text-yellow-900 mb-3">
                🌱 Wir sind neu - Bitte verstehen Sie:
              </h3>
              <div className="text-gray-900 space-y-2 text-sm">
                <p>
                  <strong>Warum so viele Ausschlüsse?</strong> Wir sind ein junges Startup-Projekt mit begrenzten Ressourcen. Unser Team lernt noch dazu, und wir können uns keine rechtlichen Risiken leisten.
                </p>
                <p>
                  <strong>Was bedeutet das für Sie?</strong> Sie nutzen Spontane vollständig auf eigenes Risiko. Wir geben unser Bestes, aber wir können nichts garantieren.
                </p>
                <p className="font-semibold text-red-700">
                  ⚠️ Wenn Sie damit nicht einverstanden sind, nutzen Sie unseren Service bitte nicht!
                </p>
              </div>
            </div>

            {/* NO WARRANTIES */}
            <div>
              <h3 className="font-semibold text-lg mb-2">1. Keine Garantien</h3>
              <p className="text-gray-700 text-sm">
                Spontane wird „AS IS" (wie besehen) und „AS AVAILABLE" (wie verfügbar) bereitgestellt, ohne jegliche ausdrückliche oder stillschweigende Garantien. Wir übernehmen keine Gewährleistung für:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1 text-sm">
                <li>Funktionalität, Genauigkeit oder Zuverlässigkeit der Plattform</li>
                <li>Sicherheit Ihrer Daten</li>
                <li>Qualität oder Eignung von Sprachpartner-Matches</li>
                <li>Fehlerfreien oder unterbrechungsfreien Betrieb</li>
              </ul>
            </div>

            {/* USER RESPONSIBILITY */}
            <div>
              <h3 className="font-semibold text-lg mb-2">2. Eigenverantwortung der Nutzer</h3>
              <p className="text-gray-700 text-sm">
                <strong>Sie sind allein verantwortlich für:</strong>
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1 text-sm">
                <li>Ihre Sicherheit bei Treffen mit Sprachpartnern (treffen Sie sich an öffentlichen Orten!)</li>
                <li>Die Überprüfung der Identität und Vertrauenswürdigkeit Ihrer Sprachpartner</li>
                <li>Alle Interaktionen mit anderen Nutzern</li>
                <li>Schäden oder Probleme, die aus der Nutzung von Spontane entstehen</li>
              </ul>
            </div>

            {/* LIMITATION OF LIABILITY */}
            <div>
              <h3 className="font-semibold text-lg mb-2">3. Haftungsbeschränkung</h3>
              <p className="text-gray-700 text-sm">
                <strong className="text-red-600">IN DEM GESETZLICH MAXIMAL ZULÄSSIGEN UMFANG HAFTEN WIR NICHT</strong> für direkte, indirekte, zufällige, besondere, Folge- oder Strafschäden jeglicher Art, einschließlich Gewinnausfall, Umsatzverlust, Datenverlust, Geschäftsunterbrechung, Körperverletzung oder Sachschäden.
              </p>
              <p className="text-gray-700 mt-2 font-semibold text-sm">
                Dies gilt unabhängig von der Rechtstheorie (Vertrag, unerlaubte Handlung, Fahrlässigkeit usw.), selbst wenn wir über die Möglichkeit solcher Schäden informiert wurden.
              </p>
            </div>

            {/* INDEMNIFICATION */}
            <div>
              <h3 className="font-semibold text-lg mb-2">4. Freistellung</h3>
              <p className="text-gray-700 text-sm">
                Sie verpflichten sich, Spontane und seine verbundenen Unternehmen von allen Ansprüchen, Schäden, Verlusten und Kosten (einschließlich Anwaltskosten) freizustellen, die sich aus Ihrer Nutzung unserer Dienste oder Ihren Interaktionen mit anderen Nutzern ergeben.
              </p>
            </div>

            {/* THIRD PARTY INTERACTIONS */}
            <div>
              <h3 className="font-semibold text-lg mb-2">5. Interaktionen mit Dritten</h3>
              <p className="text-gray-700 text-sm">
                Spontane ist NUR ein Vermittlungsdienst. Wir überprüfen Nutzer NICHT, garantieren KEINE Qualität und sind NICHT verantwortlich für das Verhalten anderer Nutzer. Alle Interaktionen erfolgen auf Ihr eigenes Risiko.
              </p>
            </div>

            {/* CHANGES */}
            <div>
              <h3 className="font-semibold text-lg mb-2">6. Änderungen</h3>
              <p className="text-gray-700 text-sm">
                Wir behalten uns das Recht vor, diesen Haftungsausschluss jederzeit zu ändern. Da wir uns in der Beta-Phase befinden, können Änderungen häufig vorkommen.
              </p>
            </div>

            {/* CONTACT */}
            <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">📧 Kontakt</h3>
              <p className="text-gray-700 text-sm">
                Bei Fragen zu diesem Haftungsausschluss kontaktieren Sie uns unter:<br/>
                <strong className="text-purple-600">kontakt@spontane.app</strong>
              </p>
            </div>

            {/* FINAL WARNING */}
            <div className="bg-red-100 border-2 border-red-600 rounded-lg p-5">
              <p className="text-red-900 font-bold text-center">
                ⚠️ DURCH DIE NUTZUNG VON SPONTANE AKZEPTIEREN SIE ALLE OBEN GENANNTEN BEDINGUNGEN UND AUSSCHLÜSSE.
                <br/>
                WENN SIE NICHT EINVERSTANDEN SIND, NUTZEN SIE SPONTANE NICHT!
              </p>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-end pt-4 border-t">
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8"
          >
            Close / Schließen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
