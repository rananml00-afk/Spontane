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
            Effective Date: January 24, 2026 | Last Updated: January 24, 2026
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">
            
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Introduction</h3>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Spontane. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our language learning platform and speaking partner matching service.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Please note that Spontane is currently in beta phase. While we implement appropriate security measures, 
                we cannot guarantee absolute data security.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Information We Collect</h3>
              
              <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">2.1 Information You Provide</h4>
              <p className="text-gray-700 leading-relaxed mb-2">
                When you use our speaking partner matching service, we collect:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Name and email address</li>
                <li>Language learning information (target language, native language, proficiency level)</li>
                <li>Location (city/region)</li>
                <li>Meeting preferences (online, in-person, or both)</li>
                <li>Availability and schedule preferences</li>
                <li>Interests and hobbies (optional)</li>
                <li>Additional notes about your language learning goals</li>
              </ul>

              <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">2.2 Automatically Collected Information</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>IP address and browser information</li>
                <li>Device information</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. How We Use Your Information</h3>
              <p className="text-gray-700 leading-relaxed mb-2">We use your information to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Match you with compatible language partners based on your goals, location, and preferences</li>
                <li>Send you partner suggestions via email with contact information</li>
                <li>Notify you when the Spontane app launches (if you opted in)</li>
                <li>Improve our services through analytics and user feedback</li>
                <li>Communicate with you about updates and improvements</li>
                <li>Prevent fraud and abuse</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Information Sharing</h3>
              
              <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">4.1 With Language Partners</h4>
              <p className="text-gray-700 leading-relaxed mb-2">
                When we find a compatible match, we share your profile information (name, email, language info, 
                location, interests, and meeting preferences) with your matched partners so you can connect and 
                practice together.
              </p>

              <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">4.2 We Do Not Sell Your Data</h4>
              <p className="text-gray-700 leading-relaxed mb-2">
                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Data Security</h3>
              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security measures to protect your information, including encryption, 
                secure servers, and access controls. However, no method of transmission over the internet is 100% secure. 
                We cannot guarantee absolute security, especially as we are in the beta phase.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Your Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-2">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your information (right to be forgotten)</li>
                <li>Object to marketing communications</li>
                <li>Withdraw consent to data processing at any time</li>
                <li>Data portability - receive your data in a structured format</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                To exercise these rights, contact us at: kontakt@spontane.app
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Data Retention</h3>
              <p className="text-gray-700 leading-relaxed">
                We retain your information as long as necessary to provide our services. If you request deletion, 
                we will remove your data within 30 days, except where retention is legally required.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">8. Cookies</h3>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar technologies to improve user experience, analyze usage patterns, and 
                remember your preferences. You can control cookie settings through your browser, but some features 
                may not work properly without cookies.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">9. Children's Privacy</h3>
              <p className="text-gray-700 leading-relaxed">
                Our service is not intended for children under 18. We do not knowingly collect personal information 
                from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">10. International Data Transfers</h3>
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to and processed in countries outside your country of residence. 
                We ensure appropriate safeguards are in place in accordance with this Privacy Policy and applicable laws.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">11. Changes to This Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of material changes via email 
                or through a prominent notice on our website. Your continued use of our services after changes indicates 
                acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">12. Beta Phase Disclaimer</h3>
              <p className="text-gray-700 leading-relaxed">
                Spontane is currently in early development and beta testing phase. As such, you acknowledge and accept that:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
                <li>Our systems, processes, and data handling practices are continuously being improved</li>
                <li>Privacy features and security measures may contain errors or limitations</li>
                <li>Data accuracy, completeness, and availability cannot be guaranteed at all times</li>
                <li>Service interruptions, data processing errors, or technical issues may occur</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                To the maximum extent permitted by law, we disclaim any liability for errors, inaccuracies, or issues 
                arising from our early development phase. By using Spontane, you accept these risks and agree that we 
                are not liable for damages or losses resulting from data processing errors, security breaches, or other 
                technical problems during this development phase.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">13. Contact</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-800">Email: kontakt@spontane.app</p>
                <p className="text-gray-800 mt-1">Location: Frankfurt, Germany</p>
                <p className="text-gray-800 mt-1">Company: Business Online Inc.</p>
              </div>
            </section>
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
