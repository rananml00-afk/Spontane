import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface CookiePolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CookiePolicyDialog({ open, onOpenChange }: CookiePolicyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">🍪 Cookie Policy</DialogTitle>
          <DialogDescription>
            Last Updated: January 24, 2026
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[65vh] pr-4">
          <div className="space-y-5 text-sm">
            
            <p className="text-gray-700 leading-relaxed">
              This Cookie Policy explains how Spontane uses cookies and similar tracking technologies on our website and platform.
            </p>

            <div>
              <h3 className="font-semibold text-lg mb-2">1. What Are Cookies?</h3>
              <p className="text-gray-700 leading-relaxed">
                Cookies are small text files that are stored on your device (computer, smartphone, tablet) when you visit a website. 
                They help websites remember your preferences, improve user experience, and provide analytics data.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">2. Types of Cookies We Use</h3>
              
              <div className="ml-4 space-y-3 mt-3">
                <div>
                  <h4 className="font-semibold text-base">Essential Cookies (Required)</h4>
                  <p className="text-gray-700">
                    These cookies are necessary for the website to function properly. They enable core functionality like security, 
                    session management, and language preferences.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-base">Analytics Cookies</h4>
                  <p className="text-gray-700">
                    We use analytics cookies to understand how visitors interact with our website. This helps us improve our platform 
                    and user experience. We may use services like Google Analytics.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-base">Functional Cookies</h4>
                  <p className="text-gray-700">
                    These cookies remember your preferences (e.g., language selection, form inputs) to provide a more personalized experience.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">3. How We Use Cookies</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>To remember your language preferences</li>
                <li>To analyze website traffic and usage patterns</li>
                <li>To improve website performance and functionality</li>
                <li>To prevent fraud and enhance security</li>
                <li>To remember your form inputs (e.g., speaking partner preferences)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">4. Managing Cookies</h3>
              <p className="text-gray-700 leading-relaxed">
                You can control and manage cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
                <li>View and delete cookies</li>
                <li>Block all cookies</li>
                <li>Block third-party cookies</li>
                <li>Receive notifications when cookies are set</li>
              </ul>
              <p className="text-gray-700 mt-3">
                <strong>Note:</strong> Disabling cookies may affect the functionality of our website. Some features may not work properly 
                without cookies.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">5. Third-Party Cookies</h3>
              <p className="text-gray-700 leading-relaxed">
                We may use third-party services that set their own cookies on your device. These include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
                <li><strong>Google Analytics:</strong> For website analytics and traffic analysis</li>
                <li><strong>Supabase:</strong> For backend services and data storage</li>
              </ul>
              <p className="text-gray-700 mt-3">
                We do not control third-party cookies. Please review the privacy policies of these services for more information.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">6. Cookie Retention</h3>
              <p className="text-gray-700 leading-relaxed">
                Cookies may be session cookies (deleted when you close your browser) or persistent cookies (remain on your device 
                for a set period or until you delete them). We use both types depending on their purpose.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">7. Changes to This Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                We may update this Cookie Policy from time to time. We will notify you of significant changes by posting the updated 
                policy on our website.
              </p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">📧 Contact Us</h3>
              <p className="text-gray-700">
                If you have questions about our use of cookies, please contact us at:<br/>
                <strong className="text-purple-600">kontakt@spontane.app</strong>
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
              <p className="text-yellow-900 font-semibold text-center">
                ⚠️ By continuing to use Spontane, you consent to our use of cookies as described in this policy.
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
