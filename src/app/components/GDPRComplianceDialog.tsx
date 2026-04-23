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
          <DialogTitle className="text-3xl font-bold">🛡️ GDPR Compliance / DSGVO-Konformität</DialogTitle>
          <DialogDescription>
            General Data Protection Regulation | Datenschutz-Grundverordnung
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">
            
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-xl mb-2">GDPR Commitment</h3>
              <p className="text-gray-800">
                Spontane is committed to complying with the General Data Protection Regulation (GDPR) and protecting 
                the privacy rights of all users in the European Union and beyond.
              </p>
            </div>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Legal Basis for Data Processing</h3>
              <p className="text-gray-700 mb-2">
                We process your personal data based on the following legal grounds under GDPR Article 6:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Consent (Art. 6(1)(a)):</strong> You provide explicit consent when signing up for our services</li>
                <li><strong>Contract Performance (Art. 6(1)(b)):</strong> Processing is necessary to fulfill our speaking partner matching service</li>
                <li><strong>Legitimate Interests (Art. 6(1)(f)):</strong> For service improvement, analytics, and fraud prevention</li>
                <li><strong>Legal Obligation (Art. 6(1)(c)):</strong> When required by law (e.g., tax records)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Your GDPR Rights</h3>
              <p className="text-gray-700 mb-2">Under GDPR, you have the following rights:</p>
              
              <div className="space-y-3 ml-4">
                <div>
                  <h4 className="font-semibold text-base">Right to Access (Art. 15)</h4>
                  <p className="text-gray-700">
                    You can request a copy of all personal data we hold about you, including information about how we use it.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-base">Right to Rectification (Art. 16)</h4>
                  <p className="text-gray-700">
                    You can request correction of inaccurate or incomplete personal data.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-base">Right to Erasure / "Right to be Forgotten" (Art. 17)</h4>
                  <p className="text-gray-700">
                    You can request deletion of your personal data under certain conditions (e.g., data no longer necessary, 
                    consent withdrawn, unlawful processing).
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-base">Right to Restriction of Processing (Art. 18)</h4>
                  <p className="text-gray-700">
                    You can request that we limit how we process your data in certain situations.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-base">Right to Data Portability (Art. 20)</h4>
                  <p className="text-gray-700">
                    You can request your data in a structured, commonly used, machine-readable format to transfer to another service.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-base">Right to Object (Art. 21)</h4>
                  <p className="text-gray-700">
                    You can object to processing based on legitimate interests or for direct marketing purposes.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-base">Right to Withdraw Consent (Art. 7(3))</h4>
                  <p className="text-gray-700">
                    You can withdraw your consent at any time. This does not affect the lawfulness of processing before withdrawal.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-base">Right to Lodge a Complaint (Art. 77)</h4>
                  <p className="text-gray-700">
                    You have the right to lodge a complaint with a supervisory authority (data protection authority) if you believe 
                    your data protection rights have been violated.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. How to Exercise Your Rights</h3>
              <p className="text-gray-700 mb-2">
                To exercise any of your GDPR rights, please contact us at:
              </p>
              <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
                <p className="text-gray-800"><strong>Email:</strong> <span className="text-purple-600 font-semibold">kontakt@spontane.app</span></p>
                <p className="text-gray-800 mt-1"><strong>Subject Line:</strong> "GDPR Request - [Your Right]"</p>
              </div>
              <p className="text-gray-700 mt-3">
                We will respond to your request within <strong>30 days</strong> (or 60 days for complex requests, with notification).
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Data Protection Measures</h3>
              <p className="text-gray-700 mb-2">We implement technical and organizational measures to protect your data:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular security audits and updates</li>
                <li>Staff training on data protection</li>
                <li>Secure cloud hosting with GDPR-compliant providers (Supabase)</li>
                <li>Data minimization - we only collect necessary data</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">5. Data Sharing and Third Parties</h3>
              <p className="text-gray-700 mb-2">
                We only share your data with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Your matched language partners</strong> (with your consent for the matching service)</li>
                <li><strong>GDPR-compliant service providers:</strong>
                  <ul className="list-circle list-inside ml-6 mt-1">
                    <li>Supabase (cloud hosting, EU-based infrastructure)</li>
                    <li>Resend (email service)</li>
                  </ul>
                </li>
              </ul>
              <p className="text-gray-700 mt-2 font-semibold">
                We do NOT sell or rent your personal data to third parties.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">6. Data Retention</h3>
              <p className="text-gray-700">
                We retain your personal data only as long as necessary to provide our services and comply with legal obligations:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
                <li><strong>Active users:</strong> Data retained while you use the service</li>
                <li><strong>Inactive users:</strong> Data may be deleted after 12 months of inactivity (with prior notification)</li>
                <li><strong>Deletion requests:</strong> Processed within 30 days</li>
                <li><strong>Legal requirements:</strong> Some data may be retained longer if required by law (e.g., financial records for tax purposes)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">7. International Data Transfers</h3>
              <p className="text-gray-700">
                Your data may be transferred outside the EU. We ensure appropriate safeguards through:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Standard Contractual Clauses (SCCs) approved by the EU Commission</li>
                <li>Use of GDPR-compliant cloud providers with EU data centers</li>
                <li>Adequacy decisions by the EU Commission for specific countries</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">8. Children's Data</h3>
              <p className="text-gray-700">
                Our service is not intended for individuals under 18 years of age. We do not knowingly collect or process 
                personal data from children. If you believe we have processed a child's data, please contact us immediately 
                for deletion.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">9. Data Breach Notification</h3>
              <p className="text-gray-700">
                In the event of a personal data breach that poses a risk to your rights and freedoms, we will:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Notify the relevant supervisory authority within <strong>72 hours</strong> of becoming aware of the breach</li>
                <li>Notify affected users <strong>without undue delay</strong> if the breach poses a high risk</li>
                <li>Provide information about the breach, its consequences, and measures taken</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">10. Cookies and Tracking</h3>
              <p className="text-gray-700">
                We use cookies and similar technologies in compliance with GDPR. You can manage cookie preferences through 
                your browser settings. See our <strong>Cookie Policy</strong> for more details.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">11. Supervisory Authority</h3>
              <p className="text-gray-700 mb-2">
                If you believe your data protection rights have been violated, you can lodge a complaint with the supervisory authority:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-300">
                <p className="text-gray-800 font-semibold">For Germany (Frankfurt-based):</p>
                <p className="text-gray-800 mt-1">
                  <strong>Der Hessische Beauftragte für Datenschutz und Informationsfreiheit</strong><br/>
                  Gustav-Stresemann-Ring 1<br/>
                  65189 Wiesbaden, Germany<br/>
                  Website: <a href="https://datenschutz.hessen.de" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">datenschutz.hessen.de</a>
                </p>
              </div>
            </section>

            {/* BETA WARNING */}
            <div className="bg-orange-50 border-4 border-orange-400 rounded-lg p-5">
              <h3 className="text-xl font-bold text-orange-900 mb-3">⚠️ Beta Phase Disclaimer</h3>
              <p className="text-gray-900 font-semibold mb-2">
                Spontane is currently in beta development phase. While we strive for GDPR compliance:
              </p>
              <ul className="list-disc list-inside text-gray-800 space-y-1 ml-4">
                <li>Our data protection processes are continuously being improved</li>
                <li>Technical measures may have limitations during development</li>
                <li>Data processing workflows are being refined</li>
                <li>Documentation may be updated frequently</li>
              </ul>
              <p className="text-orange-900 font-bold mt-3">
                We take GDPR compliance seriously and are working hard to meet all requirements. If you notice any 
                compliance issues, please report them to kontakt@spontane.app.
              </p>
            </div>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">12. Contact & Data Protection Officer</h3>
              <p className="text-gray-700 mb-2">
                For all GDPR-related inquiries, data protection questions, or to exercise your rights:
              </p>
              <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
                <p className="text-gray-800"><strong>Email:</strong> <span className="text-purple-600 font-semibold">kontakt@spontane.app</span></p>
                <p className="text-gray-800 mt-1"><strong>Company:</strong> Business Online Inc.</p>
                <p className="text-gray-800 mt-1"><strong>Location:</strong> Frankfurt, Germany</p>
              </div>
            </section>

            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4">
              <p className="text-green-900 font-semibold text-center">
                ✅ Your privacy is important to us. We are committed to protecting your data and respecting your rights under GDPR.
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
