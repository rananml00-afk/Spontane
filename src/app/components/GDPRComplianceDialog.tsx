import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface GDPRComplianceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GDPRComplianceDialog({ open, onOpenChange }: GDPRComplianceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">GDPR Commitment</DialogTitle>
          <DialogDescription>
            Spontane – www.spontane.app · As of: June 2026
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">

            <p className="text-gray-700 leading-relaxed">
              Spontane is operated by Rana Namli (Grosse Bleiche 5, 65719 Hofheim am Taunus, Germany) and is committed to
              complying with the General Data Protection Regulation (GDPR) and protecting the privacy rights of all users
              in the European Union and beyond.
            </p>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">1. Legal Basis for Data Processing</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                We process your personal data based on the following legal grounds under GDPR Article 6:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Consent (Art. 6(1)(a)):</strong> For location data and non-essential features where you provide explicit consent.</li>
                <li><strong>Contract Performance (Art. 6(1)(b)):</strong> Processing necessary to provide the Spontane platform, including account management, events, profiles, chat, and language exchange matching.</li>
                <li><strong>Legitimate Interests (Art. 6(1)(f)):</strong> For service improvement and fraud prevention, where our interests do not override your rights.</li>
                <li><strong>Legal Obligation (Art. 6(1)(c)):</strong> Where required by applicable law.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">2. Your GDPR Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Under GDPR, you have the following rights regarding your personal data:
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800">Right to Access (Art. 15)</h4>
                  <p className="text-gray-700">Request a copy of all personal data we hold about you.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Right to Rectification (Art. 16)</h4>
                  <p className="text-gray-700">Request correction of inaccurate or incomplete data.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Right to Erasure / Right to be Forgotten (Art. 17)</h4>
                  <p className="text-gray-700">Request deletion of your data where it is no longer necessary, consent has been withdrawn, or processing is unlawful.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Right to Restriction of Processing (Art. 18)</h4>
                  <p className="text-gray-700">Request that we limit how we process your data in certain situations.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Right to Data Portability (Art. 20)</h4>
                  <p className="text-gray-700">Request your data in a structured, machine-readable format.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Right to Object (Art. 21)</h4>
                  <p className="text-gray-700">Object to processing based on legitimate interests or for direct marketing.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Right to Withdraw Consent (Art. 7(3))</h4>
                  <p className="text-gray-700">Withdraw consent at any time. This does not affect the lawfulness of processing before withdrawal.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Right to Lodge a Complaint (Art. 77)</h4>
                  <p className="text-gray-700">Lodge a complaint with a supervisory authority if you believe your rights have been violated.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">3. How to Exercise Your Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                To exercise any of your GDPR rights, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-gray-800 space-y-1">
                <p>Email: <strong>kontakt@spontane.app</strong></p>
                <p>Please include the subject line: <em>"GDPR Request – [Your Right]"</em></p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-3">
                We will respond within 30 days. For complex requests, we may extend this by a further 60 days and will
                notify you accordingly, as permitted under Art. 12(3) GDPR.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">4. Data Protection Measures</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                We implement appropriate technical and organisational measures to protect your data, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>TLS encryption for all data in transit</li>
                <li>Encrypted storage via Supabase (EU-based infrastructure, Frankfurt)</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Data minimisation – we collect only what is necessary</li>
                <li>Regular review of data processing practices</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">5. Data Sharing and Third Parties</h3>
              <p className="text-gray-700 leading-relaxed mb-2">We only share your data with:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                <li><strong>Other Spontane users</strong> – profile information and shared location, only to the extent you have enabled this in the app.</li>
                <li><strong>Supabase Inc.</strong> – cloud infrastructure and database (EU data centre, Frankfurt). Data processing agreement in place pursuant to Art. 28 GDPR.</li>
                <li><strong>Vercel Inc.</strong> – website hosting (USA). Data processing agreement and Standard Contractual Clauses in place.</li>
                <li><strong>Resend</strong> – transactional email delivery. Data processing agreement in place.</li>
              </ul>
              <p className="text-gray-700 font-medium">We do NOT sell or rent your personal data to third parties.</p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">6. Data Retention</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                We retain personal data only as long as necessary to provide our services and comply with legal obligations:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Active accounts:</strong> Data retained for the duration of your use of the platform.</li>
                <li><strong>Inactive accounts:</strong> Accounts inactive for more than 12 months may be deleted after prior notification.</li>
                <li><strong>Deletion requests:</strong> Processed within 30 days.</li>
                <li><strong>Chat messages:</strong> Deleted within 30 days after both participating accounts are deleted.</li>
                <li><strong>Legal requirements:</strong> Certain data may be retained longer if required by law.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">7. International Data Transfers</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Some of our service providers (Vercel, Resend) are based outside the EU. We ensure appropriate safeguards through:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                <li>EU-U.S. Data Privacy Framework (where applicable)</li>
                <li>Use of providers with EU-based data centres where possible (Supabase: Frankfurt)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">8. Children's Data</h3>
              <p className="text-gray-700 leading-relaxed">
                Spontane is not intended for individuals under 18 years of age. We do not knowingly collect or process personal
                data from minors. If you believe we have inadvertently processed data relating to a minor, please contact us
                immediately at kontakt@spontane.app and we will delete it without delay.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">9. Data Breach Notification</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                In the event of a personal data breach that poses a risk to your rights and freedoms, we will:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Notify the competent supervisory authority (HBDI, Wiesbaden) within <strong>72 hours</strong> of becoming aware of the breach, as required by Art. 33 GDPR.</li>
                <li>Notify affected users without undue delay where the breach poses a high risk to their rights and freedoms (Art. 34 GDPR).</li>
                <li>Provide clear information about the nature of the breach, its likely consequences, and the measures taken.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">10. Cookies and Tracking</h3>
              <p className="text-gray-700 leading-relaxed">
                Our website uses Vercel Analytics, which collects anonymised, aggregated data (page views, device type, referrer)
                without setting cookies or creating personal profiles. No consent banner is required for this. No other tracking
                or advertising cookies are used. If this changes, this policy will be updated and a consent mechanism will be
                implemented.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">11. Supervisory Authority</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                If you believe your data protection rights have been violated, you can lodge a complaint with the competent
                supervisory authority:
              </p>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-gray-800 space-y-1">
                <p className="font-medium">Der Hessische Beauftragte für Datenschutz und Informationsfreiheit (HBDI)</p>
                <p>Gustav-Stresemann-Ring 1</p>
                <p>65189 Wiesbaden, Germany</p>
                <p>
                  <a href="https://datenschutz.hessen.de" target="_blank" rel="noopener noreferrer" className="underline text-gray-900 hover:text-gray-700">
                    https://datenschutz.hessen.de
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">12. Contact</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                For all GDPR-related inquiries or to exercise your rights:
              </p>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-gray-800 space-y-1">
                <p><strong>Data Controller:</strong> Rana Namli</p>
                <p><strong>Address:</strong> Grosse Bleiche 5, 65719 Hofheim am Taunus, Germany</p>
                <p><strong>Email:</strong> kontakt@spontane.app</p>
              </div>
              <p className="text-gray-600 leading-relaxed mt-3 text-xs">
                Note: Spontane is operated by a private individual and does not have a formally appointed Data Protection Officer
                (DPO), as this is not required under Art. 37 GDPR for operators of this scale. The data controller is directly
                responsible for all data protection matters.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">13. Updates to this Document</h3>
              <p className="text-gray-700 leading-relaxed">
                This GDPR Commitment page will be updated to reflect changes in our data processing practices, applicable law,
                or the services we offer. The current version is always available at{' '}
                <a href="https://www.spontane.app" target="_blank" rel="noopener noreferrer" className="underline text-gray-900 hover:text-gray-700">
                  https://www.spontane.app
                </a>. Last updated: June 2026.
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
