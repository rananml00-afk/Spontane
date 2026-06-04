import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface PrivacyPolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyPolicyDialog({ open, onOpenChange }: PrivacyPolicyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Privacy Policy</DialogTitle>
          <DialogDescription>
            Spontane – Events, Profiles &amp; Language Exchange · As of: June 2026
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">1. Data Controller</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                The data controller within the meaning of the General Data Protection Regulation (GDPR) is:
              </p>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-gray-800 space-y-1">
                <p className="font-medium">Rana Namli</p>
                <p>Grosse Bleiche 5</p>
                <p>65719 Hofheim am Taunus, Germany</p>
                <p>Email: kontakt@spontane.app</p>
              </div>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">2. Overview of Data Processing</h3>
              <p className="text-gray-700 leading-relaxed">
                We process personal data of our users only to the extent necessary to provide a functional website and app
                ("Spontane") and our content and services. The legal bases are in particular Art. 6(1)(a) GDPR (consent),
                Art. 6(1)(b) GDPR (performance of a contract), and Art. 6(1)(f) GDPR (legitimate interests).
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Spontane offers the following core features: discovery and creation of spontaneous local events, user profiles,
                and a language exchange matchmaking feature (Sprachtandem). Each of these features involves specific data
                processing described in the relevant sections below.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">3. Hosting and Technical Infrastructure</h3>

              <h4 className="text-sm font-semibold text-gray-800 mt-3 mb-1">3.1 Website Hosting (Vercel)</h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. When the website is
                accessed, Vercel automatically processes server log data (IP address, date and time of access, browser type,
                operating system, referrer URL). The legal basis is Art. 6(1)(f) GDPR; our legitimate interest lies in the
                secure and reliable provision of the website. A data processing agreement pursuant to Art. 28 GDPR is in place
                with Vercel. Data transfers to the USA are based on EU Standard Contractual Clauses and the EU-U.S. Data
                Privacy Framework.
              </p>

              <h4 className="text-sm font-semibold text-gray-800 mb-1">3.2 Backend and Database (Supabase)</h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use Supabase (Supabase Inc.) for authentication, database management, and storage of user data. Account
                data, profile data, location data, and chat data are stored there. Data is stored in a data centre in Frankfurt,
                Germany (EU). A data processing agreement pursuant to Art. 28 GDPR is in place with Supabase.
              </p>

              <h4 className="text-sm font-semibold text-gray-800 mb-1">3.3 Analytics (Vercel Analytics)</h4>
              <p className="text-gray-700 leading-relaxed">
                We use Vercel Analytics to understand and improve the usage of our website. Vercel Analytics collects
                anonymised, aggregated data about page views and visitor interactions (e.g. pages visited, referrer, device
                type). No cookies are set, and no personal profiles are created. The legal basis is Art. 6(1)(f) GDPR
                (legitimate interest in improving our service). No consent is required as no personal data is stored and no
                cross-site tracking occurs.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">4. Registration and User Account</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Use of the app requires the creation of a user account. We process the following data for this purpose:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-2">
                <li>Email address</li>
                <li>Name or username</li>
                <li>Password (stored in encrypted form)</li>
                <li>Optional profile information (e.g. profile picture, languages spoken, interests)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                The legal basis is Art. 6(1)(b) GDPR (performance of the user agreement). Data will be deleted when the user
                account is deleted, unless statutory retention obligations require otherwise.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">5. Events and Activities</h3>
              <p className="text-gray-700 leading-relaxed">
                Spontane allows users to create, publish, and join spontaneous local events and meetups. When creating an event,
                we process the event title, description, time, and location. Published events are visible to other users of the
                app. The legal basis is Art. 6(1)(b) GDPR. Events you have created are deleted when your account is deleted.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">6. User Profiles</h3>
              <p className="text-gray-700 leading-relaxed">
                Your profile (username, profile picture, and any optional details such as interests or a short bio) is visible
                to other users of the platform. You decide which optional information to provide. The legal basis for displaying
                profile information to other users is Art. 6(1)(b) GDPR. You can edit or remove your profile information at any
                time in the app settings.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">7. Language Exchange (Sprachtandem)</h3>
              <p className="text-gray-700 leading-relaxed">
                Spontane includes a feature that helps users find language exchange partners (Sprachtandem). For this purpose,
                we process the languages you speak and wish to learn, as voluntarily entered in your profile. This information
                is visible to other users to facilitate matching. The legal basis is Art. 6(1)(b) GDPR. You can remove this
                information from your profile at any time.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">8. Location Data</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                With your consent, the app processes location data (GPS) to show you spontaneous activities and events nearby,
                and to share your approximate location with other users if you choose. Location data is collected only when you
                enable location permissions in your device settings.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The legal basis is Art. 6(1)(a) GDPR (consent). You can revoke location permission at any time in your device
                settings; core app features may be limited as a result. Location data is processed in real time and is not stored
                historically beyond what is technically necessary for the active session.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">9. Chat and Communication</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                The app enables users to exchange messages. Message content and metadata (sender, recipient, timestamp) are
                stored on our servers (Supabase) to provide this functionality. The legal basis is Art. 6(1)(b) GDPR.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Messages are deleted within 30 days after both participating accounts have been deleted. You may request earlier
                deletion by contacting us at kontakt@spontane.app.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">10. Recipients of Data</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Personal data is shared with third parties only as follows:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-2">
                <li>With the processors listed in this policy (Vercel, Supabase), to the extent necessary to provide the service;</li>
                <li>Where required by law or court order;</li>
                <li>Profile information and shared location data are visible to other app users to the extent you have enabled this in the app.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We do not sell personal data to third parties.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">11. Retention Periods</h3>
              <p className="text-gray-700 leading-relaxed">
                We store personal data only for as long as necessary for the stated purposes or as required by statutory
                retention obligations. Upon deletion of your account, your data will be deleted or anonymised, unless
                retention obligations apply. Specific retention periods are stated in the relevant sections above.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">12. Your Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-2">
                <li>Right of access (Art. 15 GDPR)</li>
                <li>Right to rectification (Art. 16 GDPR)</li>
                <li>Right to erasure (Art. 17 GDPR)</li>
                <li>Right to restriction of processing (Art. 18 GDPR)</li>
                <li>Right to data portability (Art. 20 GDPR)</li>
                <li>Right to object to processing (Art. 21 GDPR)</li>
                <li>Right to withdraw consent at any time with effect for the future (Art. 7(3) GDPR)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-2">
                You also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR).
                The supervisory authority for Hesse (Germany) is:
              </p>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-gray-800 space-y-1 text-sm">
                <p>Der Hessische Beauftragte für Datenschutz und Informationsfreiheit (HBDI)</p>
                <p>Gustav-Stresemann-Ring 1, 65189 Wiesbaden, Germany</p>
                <a href="https://datenschutz.hessen.de" target="_blank" rel="noopener noreferrer" className="underline text-gray-900 hover:text-gray-700">
                  https://datenschutz.hessen.de
                </a>
              </div>
              <p className="text-gray-700 leading-relaxed mt-2">
                To exercise any of your rights, please send an informal email to: kontakt@spontane.app
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">13. Data Security</h3>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organisational measures to protect your data against manipulation, loss,
                destruction, and unauthorised access. These include TLS encryption for all data in transit and access controls
                on our backend infrastructure.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">14. No Automated Decision-Making</h3>
              <p className="text-gray-700 leading-relaxed">
                We do not use automated decision-making or profiling within the meaning of Art. 22 GDPR that produces legal or
                similarly significant effects on users.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">15. Amendments to this Privacy Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to update this Privacy Policy if the legal situation, the app, or our data processing
                practices change. The current version is always available in the app and on our website at{' '}
                <a href="https://www.spontane.app" target="_blank" rel="noopener noreferrer" className="underline text-gray-900 hover:text-gray-700">
                  https://www.spontane.app
                </a>.
                We recommend reviewing this policy periodically.
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
