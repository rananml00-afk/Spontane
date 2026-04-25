import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface JournalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const journalPosts = [
  {
    id: 1,
    title: "The Science Behind Language Tandem Learning",
    excerpt: "Discover why practicing with native speakers accelerates your language learning journey faster than any app or textbook could.",
    author: "Rana Namli",
    date: "April 15, 2026",
    readTime: "5 min read",
    category: "Learning Tips"
  },
  {
    id: 2,
    title: "How to Overcome the Fear of Speaking",
    excerpt: "The most common barrier to fluency isn't grammar or vocabulary—it's the fear of making mistakes. Here's how to break through it.",
    author: "Rana Namli",
    date: "April 10, 2026",
    readTime: "7 min read",
    category: "Mindset"
  },
  {
    id: 3,
    title: "5 Conversation Starters for Your First Tandem Session",
    excerpt: "Nervous about your first language exchange? These proven conversation starters will help you break the ice and keep the dialogue flowing.",
    author: "Rana Namli",
    date: "April 5, 2026",
    readTime: "4 min read",
    category: "Practical Tips"
  },
  {
    id: 4,
    title: "Why Location-Based Learning Matters",
    excerpt: "Learning a language in the context of your local environment creates deeper connections and more practical skills than remote-only study.",
    author: "Rana Namli",
    date: "March 28, 2026",
    readTime: "6 min read",
    category: "Research"
  },
  {
    id: 5,
    title: "Building Friendships Through Language Exchange",
    excerpt: "The unexpected benefit of language tandems: genuine friendships that transcend cultural boundaries and enrich your life.",
    author: "Rana Namli",
    date: "March 20, 2026",
    readTime: "5 min read",
    category: "Community"
  },
  {
    id: 6,
    title: "The Spontane Method: Learn by Living",
    excerpt: "Traditional methods teach you to speak about life. Our method teaches you to speak while living it—here's the difference.",
    author: "Rana Namli",
    date: "March 12, 2026",
    readTime: "8 min read",
    category: "Methodology"
  }
];

export function JournalDialog({ open, onOpenChange }: JournalDialogProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#c0913f' }}>
            INSIGHTS & STORIES
          </p>
          <DialogTitle className="text-3xl md:text-4xl font-bold text-gray-900">
            Spontane Journal
          </DialogTitle>
          <DialogDescription className="text-gray-600 font-light text-lg pt-2">
            Explore language learning insights, success stories, and practical tips from our community
          </DialogDescription>
        </DialogHeader>

        {/* Featured Post */}
        <div className="mt-8 mb-12">
          <div className="border border-gray-200 rounded-lg p-8 hover:border-gray-300 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs uppercase tracking-wider text-white rounded-full" style={{ backgroundColor: '#c0913f' }}>
                Featured
              </span>
              <span className="text-sm text-gray-500">{journalPosts[0].category}</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {journalPosts[0].title}
            </h3>
            
            <p className="text-gray-600 font-light text-lg mb-6 leading-relaxed">
              {journalPosts[0].excerpt}
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{journalPosts[0].author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{journalPosts[0].date}</span>
              </div>
              <span>{journalPosts[0].readTime}</span>
            </div>
            
            <Button 
              variant="outline"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
            >
              Read Article <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Recent Posts Grid */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {journalPosts.slice(1).map((post) => (
              <div 
                key={post.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs uppercase tracking-wider text-gray-500">
                    {post.category}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h4>
                
                <p className="text-gray-600 font-light mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Stay Updated
            </h3>
            <p className="text-gray-600 font-light mb-6">
              Subscribe to our journal for weekly insights on language learning, cultural exchange, and community stories.
            </p>
            <Button
              className="text-white hover:opacity-90"
              style={{ backgroundColor: '#c0913f' }}
            >
              Subscribe to Journal
            </Button>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200 mt-8">
          <Button 
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
