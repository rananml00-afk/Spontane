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
          <DialogTitle className="text-2xl">Terms of Service</DialogTitle>
          <DialogDescription>
            Effective Date: January 24, 2026 | Last Updated: January 24, 2026
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">
            
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h3>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Spontane. By accessing or using our platform, submitting a language partner request, or using 
                our services, you agree to be bound by these Terms of Service. If you do not agree with these terms, 
                please do not use our services.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Please note that Spontane is a new startup project in beta phase. We are a small team just starting out. 
                Errors and issues are normal during this development phase.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Service Description</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Spontane is a language learning platform that connects people for real-world language practice. Our services include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Language partner matching service based on language goals and preferences</li>
                <li>Email notifications with partner suggestions</li>
                <li>Educational resources and language learning tools</li>
                <li>Community features (when the full app launches)</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. User Eligibility</h3>
              <p className="text-gray-700 leading-relaxed">
                You must be at least 18 years old to use our services. By using Spontane, you represent and warrant 
                that you meet this age requirement and have the legal capacity to enter into these terms.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">4. User Responsibilities</h3>
              
              <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">4.1 Accurate Information</h4>
              <p className="text-gray-700 leading-relaxed">
                You agree to provide accurate, complete, and truthful information when submitting a language partner 
                request or using our services. False information may result in suspension or termination of services.
              </p>

              <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">4.2 Appropriate Conduct</h4>
              <p className="text-gray-700 leading-relaxed mb-2">
                When interacting with language partners, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Treat others with respect and courtesy</li>
                <li>Communicate professionally and appropriately</li>
                <li>Respect cultural differences and boundaries</li>
                <li>Not harass, discriminate, or engage in abusive behavior</li>
                <li>Not share inappropriate or offensive content</li>
                <li>Honor scheduled meetings and provide timely notice of cancellations</li>
              </ul>

              <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">4.3 Safety</h4>
              <p className="text-gray-700 leading-relaxed">
                You are responsible for your own safety when meeting with language partners. We recommend:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Meeting in public places for in-person sessions</li>
                <li>Informing someone you trust about your plans</li>
                <li>Trusting your instincts and reporting suspicious behavior</li>
                <li>Using video calls before meeting in person</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Prohibited Activities</h3>
              <p className="text-gray-700 leading-relaxed mb-2">You may not:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Use our services for illegal or unauthorized purposes</li>
                <li>Violate any laws in your jurisdiction</li>
                <li>Impersonate another person or entity</li>
                <li>Harass, threaten, or intimidate other users</li>
                <li>Send spam, phishing, or unsolicited commercial messages</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools (bots, scrapers) without permission</li>
                <li>Collect or harvest user information without consent</li>
                <li>Share your account credentials with others</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Language Partner Matching</h3>
              
              <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">6.1 Matching Process</h4>
              <p className="text-gray-700 leading-relaxed">
                Our automatic matching system connects you with language partners based on your preferences, goals, and 
                availability. We use algorithms to find compatible matches, but we cannot guarantee perfect matches or 
                successful partnerships.
              </p>

              <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">6.2 No Guarantee of Results</h4>
              <p className="text-gray-700 leading-relaxed">
                While we strive to provide quality matches, Spontane does not guarantee:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>That you will find a compatible partner</li>
                <li>The quality or reliability of matched partners</li>
                <li>Language learning outcomes or progress</li>
                <li>Partner availability or commitment</li>
              </ul>

              <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">6.3 User Discretion</h4>
              <p className="text-gray-700 leading-relaxed">
                You have complete discretion in choosing whether to contact or meet suggested partners. We recommend 
                communicating with potential partners before committing to regular practice sessions.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Intellectual Property</h3>
              <p className="text-gray-700 leading-relaxed">
                All content on Spontane, including text, graphics, logos, images, monster characters, and software, is 
                the property of Spontane or its licensors and is protected by copyright, trademark, and other intellectual 
                property laws. You may not copy, modify, distribute, or create derivative works without our express 
                written permission.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">8. Privacy</h3>
              <p className="text-gray-700 leading-relaxed">
                Your use of our services is also governed by our Privacy Policy, which explains how we collect, use, and 
                protect your personal information. By using Spontane, you consent to our data practices as described in 
                the Privacy Policy.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">9. Disclaimers</h3>
              
              <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">9.1 As-Is Service</h4>
              <p className="text-gray-700 leading-relaxed">
                Spontane is provided "as is" and "as available" without warranties of any kind, either express or implied, 
                including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>

              <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">9.2 Beta Platform</h4>
              <p className="text-gray-700 leading-relaxed mb-2">
                Spontane is currently in early development phase. Therefore:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>The platform may contain errors, bugs, inaccuracies, or incomplete information</li>
                <li>Features may change, be removed, or function unexpectedly</li>
                <li>Matching algorithms are being refined and may not always provide optimal results</li>
                <li>Content, translations, and communications may contain errors or inaccuracies</li>
                <li>Service interruptions, downtime, or data loss may occur</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                By using Spontane, you acknowledge and accept these limitations. We are actively working to improve 
                the platform, but we make no guarantees about accuracy, reliability, or completeness of information 
                or services.
              </p>

              <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">9.3 No Professional Advice</h4>
              <p className="text-gray-700 leading-relaxed">
                Spontane is not a professional educational institution or certification provider. Our platform facilitates 
                peer-to-peer language practice and should not be considered a substitute for formal language education or 
                professional instruction.
              </p>

              <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">9.4 Third Party Interactions</h4>
              <p className="text-gray-700 leading-relaxed">
                We are not responsible for the actions, conduct, or behavior of language partners or other users. 
                Interactions between users occur independently of Spontane, and we are not liable for disputes, injuries, 
                or damages arising from such interactions.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">10. Limitation of Liability</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                To the maximum extent permitted by law, Spontane, its founders, officers, directors, employees, agents, 
                and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or 
                punitive damages, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Loss of profits, revenue, or business opportunities</li>
                <li>Loss of data or information</li>
                <li>Errors, inaccuracies, or mistakes in content or matching</li>
                <li>Personal injury or property damage</li>
                <li>Unauthorized access to your data</li>
                <li>Bugs, viruses, or harmful code</li>
                <li>Service interruptions or unavailability</li>
                <li>Actions or omissions of other users or third parties</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                This limitation applies regardless of the legal theory (contract, tort, negligence, strict liability, or 
                otherwise), even if we have been informed of the possibility of such damages.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                You use Spontane entirely at your own risk. We assume no responsibility or liability for any consequences 
                arising from your use of the platform.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">11. Indemnification</h3>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Spontane and its affiliates from all claims, damages, 
                losses, liabilities, and expenses (including attorney fees) arising from:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
                <li>Your use of our services</li>
                <li>Your violation of these terms</li>
                <li>Your violation of any rights of another person or entity</li>
                <li>Your interactions with language partners</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">12. Termination</h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate your access to our services at any time, with or without 
                cause or notice, including if we believe you have violated these terms. You may also terminate your use 
                of our services at any time by contacting us to request account deletion.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">13. Changes to Terms</h3>
              <p className="text-gray-700 leading-relaxed">
                We may modify these terms at any time. We will notify you of material changes via email or through a 
                prominent notice on our website. Your continued use of our services after changes indicates acceptance 
                of the updated terms.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">14. Governing Law</h3>
              <p className="text-gray-700 leading-relaxed">
                These terms are governed by and construed in accordance with the laws of Germany, without regard to its 
                conflict of law provisions. Any disputes arising from these terms or your use of our services shall be 
                subject to the exclusive jurisdiction of the courts in Germany.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">15. Contact Information</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-800">Email: kontakt@spontane.app</p>
                <p className="text-gray-800 mt-1">Location: Frankfurt, Germany</p>
                <p className="text-gray-800 mt-1">Company: Business Online Inc.</p>
              </div>
            </section>

            <section className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                By using Spontane's language partner matching service, you acknowledge that:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
                <li>You understand that interactions with language partners occur independently of Spontane</li>
                <li>You are personally responsible for your own safety when meeting partners</li>
                <li>Spontane acts only as a facilitator and is not liable for user behavior</li>
                <li>You have read, understood, and accepted these terms and our Privacy Policy</li>
                <li>You understand that we are a new startup and cannot provide guarantees or assume liability</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
        
        <div className="flex justify-end pt-4 border-t">
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
