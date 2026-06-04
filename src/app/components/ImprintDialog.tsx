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
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Legal Notice (Impressum)</DialogTitle>
          <DialogDescription>
            Spontane – www.spontane.app · As of: June 2026
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">1. Service Provider</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Information pursuant to § 5 DDG (German Digital Services Act):
              </p>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-gray-800 space-y-1">
                <p className="font-medium">Rana Namli</p>
                <p>Grosse Bleiche 5</p>
                <p>65719 Hofheim am Taunus, Germany</p>
                <p>Email: kontakt@spontane.app</p>
                <p>Website:{' '}
                  <a href="https://www.spontane.app" target="_blank" rel="noopener noreferrer" className="underline text-gray-900 hover:text-gray-700">
                    https://www.spontane.app
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">2. Responsible for Content</h3>
              <p className="text-gray-700 leading-relaxed">
                Responsible for editorial content pursuant to § 18(2) MStV (German Interstate Media Treaty):
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Rana Namli · Address as above.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">3. VAT Identification Number</h3>
              <p className="text-gray-700 leading-relaxed">
                Spontane is a non-commercial platform currently generating no revenue. No VAT identification number has been
                assigned. This notice will be updated if the platform's status changes.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">4. Dispute Resolution</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                The European Commission provides a platform for online dispute resolution (ODR):{' '}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="underline text-gray-900 hover:text-gray-700">
                  https://ec.europa.eu/consumers/odr/
                </a>.
                Our email address can be found above in this legal notice.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer
                arbitration board.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">5. Liability for Content</h3>
              <p className="text-gray-700 leading-relaxed">
                As a service provider, we are responsible for our own content on these pages in accordance with general law
                pursuant to § 7(1) DDG. However, pursuant to §§ 8 to 10 DDG, we are not obliged as a service provider to
                monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal
                activity. Obligations to remove or block the use of information in accordance with general law remain
                unaffected. Liability in this regard is only possible from the point in time at which we become aware of a
                specific legal infringement. Upon becoming aware of such infringements, we will remove the relevant content
                immediately.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">6. Liability for Links</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Our offering may contain links to external third-party websites over whose content we have no influence. We
                therefore cannot accept any liability for such external content. The respective provider or operator of the
                linked pages is always responsible for their content. The linked pages were checked for possible legal
                violations at the time of linking. No illegal content was apparent at the time of linking.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Permanent monitoring of the content of linked pages is not reasonable without concrete indications of a legal
                violation. Upon becoming aware of any legal infringements, we will remove such links immediately.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">7. Copyright</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                The content and works created by the site operators on these pages are subject to German copyright law.
                Duplication, processing, distribution and any form of commercialisation of such material beyond the scope of
                the copyright law require the prior written consent of the respective author or creator. Downloads and copies
                of these pages are only permitted for private, non-commercial use.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Insofar as the content on this site was not created by the operator, the copyrights of third parties are
                respected. Should you nonetheless become aware of a copyright infringement, please notify us accordingly.
                Upon becoming aware of any such infringements, we will remove the relevant content immediately.
              </p>
            </section>

          </div>
        </ScrollArea>

        <div className="flex justify-end pt-4 border-t">
          <Button
            onClick={() => onOpenChange(false)}
            className="text-white px-8"
            style={{ backgroundColor: '#c0913f' }}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
