import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface TermsOfServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TermsOfServiceDialog({ open, onOpenChange }: TermsOfServiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">General Terms and Conditions of Use</DialogTitle>
          <DialogDescription>
            For "Spontane" · As of: June 2026
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">§ 1 Scope and Provider</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                (1) These Terms of Use govern the use of the app and website "Spontane" (available at https://www.spontane.app),
                operated by Rana Namli, Grosse Bleiche 5, 65719 Hofheim am Taunus, Germany (hereinafter "Provider").
              </p>
              <p className="text-gray-700 leading-relaxed">
                (2) By registering, the user agrees to these Terms of Use. Any differing terms and conditions of the user shall not apply.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">§ 2 Description of Services</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                (1) Spontane is a platform through which users can discover and create spontaneous activities and meetups, and
                communicate with other users. This includes in particular the display of nearby activities (based on shared location
                data) and chat functions.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                (2) Use of the website is free of charge. The app is available in a free basic version and a paid premium version
                (freemium model). The features of each version are described in the app and on the website.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                (3) The Provider acts solely as a technical intermediary. Meetups and activities are organized by the users themselves;
                the Provider is neither a contracting party nor an organizer of such activities.
              </p>
              <p className="text-gray-700 leading-relaxed">
                (4) There is no entitlement to uninterrupted availability. The Provider endeavors to operate the platform as
                continuously as possible but cannot exclude maintenance, further development, or technical disruptions.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">§ 3 Registration and User Account</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                (1) Use of the platform requires the creation of a user account. The information requested during registration must
                be provided truthfully.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                (2) Use is only permitted for natural persons aged 18 or older.
              </p>
              <p className="text-gray-700 leading-relaxed">
                (3) The user account is non-transferable. The user must keep their login credentials confidential and must notify
                the Provider immediately if there is any indication of misuse.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">§ 4 Obligations and Rules of Conduct</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                (1) The user agrees to comply with applicable law and the rights of third parties when using Spontane.
                The following are prohibited in particular:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-2">
                <li>offensive, threatening, discriminatory, pornographic, or otherwise unlawful content,</li>
                <li>harassment of other users (particularly in the chat),</li>
                <li>providing false identities or creating fake profiles,</li>
                <li>commercial advertising, spam, or chain messages without the Provider's consent,</li>
                <li>automated scraping of the platform as well as interference with the technical infrastructure,</li>
                <li>sharing the location or profile data of other users with third parties.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                (2) In the event of violations, the Provider is entitled to delete content, temporarily suspend the account, or
                terminate it permanently (see § 7).
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">§ 5 User Content and Grant of Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                (1) The user is solely responsible for content they post (e.g. profile information, activity descriptions, messages,
                images). The Provider does not adopt such content as its own.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                (2) The user grants the Provider a simple, geographically unrestricted right of use in posted content, limited to
                the duration of the posting, to the extent necessary for the operation of the platform (in particular storage,
                display to other users, and technical reproduction).
              </p>
              <p className="text-gray-700 leading-relaxed">
                (3) The user warrants that they hold the necessary rights to the content they post.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">§ 6 Liability</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                (1) The Provider is liable without limitation for intentional acts and gross negligence, as well as for injury to
                life, body, or health.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                (2) In cases of simple negligence, the Provider is liable only for breaches of material contractual obligations
                (cardinal obligations), and only up to the foreseeable damage typical of the contract.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                (3) Liability for the conduct of other users, particularly in the context of in-person meetups, is excluded.
                Participation in activities organized through Spontane is at the user's own risk. The Provider does not verify the
                identity of users.
              </p>
              <p className="text-gray-700 leading-relaxed">
                (4) Liability under the German Product Liability Act (Produkthaftungsgesetz) remains unaffected.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">§ 7 Term, Termination, and Suspension</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                (1) The user agreement is concluded for an indefinite period. The user may terminate it at any time without notice
                by deleting their account in the app or by sending an email to kontakt@spontane.app.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                (2) The Provider may terminate the agreement with two weeks' notice. The right to extraordinary termination for good
                cause — in particular in the event of violations of § 4 — remains unaffected.
              </p>
              <p className="text-gray-700 leading-relaxed">
                (3) If there is reasonable suspicion of a violation, the Provider may temporarily suspend the account. The user will
                be informed thereof, where permitted and possible, and will be given the opportunity to respond.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">§ 8 Amendments to the Terms of Use</h3>
              <p className="text-gray-700 leading-relaxed">
                The Provider may amend these Terms with effect for the future, to the extent required by changes in the legal
                situation, case law, or the further development of the platform, and provided the user is not unreasonably
                disadvantaged. Amendments will be communicated to the user in text form (e.g. in the app or by email) at least four
                weeks before they take effect. If the user does not object within this period or continues to use the platform
                thereafter, the amendments shall be deemed accepted; this will be expressly noted in the notification. If the user
                objects, the Provider may terminate the agreement with ordinary notice.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">§ 9 Final Provisions</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                (1) The law of the Federal Republic of Germany applies, excluding the UN Convention on Contracts for the
                International Sale of Goods (CISG). With respect to consumers, this choice of law applies only to the extent that
                it does not deprive them of the protection afforded by mandatory provisions of the law of their habitual residence.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                (2) Should any individual provisions of these Terms be or become invalid, the validity of the remaining provisions
                shall not be affected.
              </p>
              <p className="text-gray-700 leading-relaxed">
                (3) The European Commission provides a platform for online dispute resolution:{' '}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="underline text-gray-900 hover:text-gray-700">
                  https://ec.europa.eu/consumers/odr/
                </a>. The Provider is neither willing nor obliged to participate in dispute resolution proceedings before a consumer
                arbitration board.
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
