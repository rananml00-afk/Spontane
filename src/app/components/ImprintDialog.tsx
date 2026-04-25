import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface ImprintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImprintDialog({ open, onOpenChange }: ImprintDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">📄 Imprint / Impressum</DialogTitle>
          <DialogDescription>
            Legal Information | Angaben gemäß § 5 TMG
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[65vh] pr-4">
          <div className="space-y-6">
            
            <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-5">
              <h3 className="font-bold text-xl mb-3">Company Information / Firmeninformationen</h3>
              <div className="space-y-2 text-gray-800">
                <p><strong>Company Name:</strong> Business Online Inc.</p>
                <p><strong>Location:</strong> Frankfurt, Germany</p>
                <p><strong>Email:</strong> <span className="text-purple-600 font-semibold">kontakt@spontane.app</span></p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Contact / Kontakt</h3>
              <div className="text-gray-700 space-y-1">
                <p><strong>Email:</strong> kontakt@spontane.app</p>
                <p><strong>City:</strong> Frankfurt</p>
                <p><strong>Country:</strong> Germany</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Responsible for Content / Verantwortlich für den Inhalt</h3>
              <p className="text-gray-700">
                Business Online Inc.<br/>
                Frankfurt, Germany<br/>
                kontakt@spontane.app
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Disclaimer / Haftungsausschluss</h3>
              <div className="text-gray-700 space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold">Liability for Content / Haftung für Inhalte</h4>
                  <p>
                    The contents of our pages have been created with the utmost care. However, we cannot guarantee the accuracy, 
                    completeness, or timeliness of the content. As a service provider, we are responsible for our own content on 
                    these pages according to § 7 Abs.1 TMG. However, according to §§ 8 to 10 TMG, we are not obligated to monitor 
                    transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Liability for Links / Haftung für Links</h4>
                  <p>
                    Our website contains links to external third-party websites over whose content we have no influence. Therefore, 
                    we cannot assume any liability for this external content. The respective provider or operator of the pages is 
                    always responsible for the content of the linked pages.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Copyright / Urheberrecht</h4>
                  <p>
                    The content and works created by the site operators on these pages are subject to German copyright law. 
                    Duplication, processing, distribution, and any kind of exploitation outside the limits of copyright require 
                    the written consent of the respective author or creator. Downloads and copies of this site are only permitted 
                    for private, non-commercial use.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">⚠️ Beta Notice</h3>
              <p className="text-gray-800 text-sm">
                <strong>Spontane is currently in beta phase.</strong> We are a new startup project with a small team. 
                The platform is actively being developed and may contain errors, bugs, or inaccuracies. Use at your own risk.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">EU Dispute Resolution / EU-Streitschlichtung</h3>
              <p className="text-gray-700 text-sm">
                The European Commission provides a platform for online dispute resolution (OS): 
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p className="text-gray-700 text-sm mt-2">
                We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <p className="text-gray-700 text-sm">
                <strong>Last Updated:</strong> January 24, 2026
              </p>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-end pt-4 border-t">
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
