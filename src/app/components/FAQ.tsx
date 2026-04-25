import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useLanguage } from '../contexts/LanguageContext';

const faqData = [
  {
    questionKey: "whatIsSpontane" as const,
    answerKey: "whatIsSpontaneAnswer" as const
  },
  {
    questionKey: "whoIsSpontaneFor" as const,
    answerKey: "whoIsSpontaneForAnswer" as const
  },
  {
    questionKey: "howIsSpontaneDifferent" as const,
    answerKey: "howIsSpontaneDifferentAnswer" as const
  },
  {
    questionKey: "howDoesIntegration" as const,
    answerKey: "howDoesIntegrationAnswer" as const
  },
  {
    questionKey: "canIUseProfessional" as const,
    answerKey: "canIUseProfessionalAnswer" as const
  },
  {
    questionKey: "whyWasCreated" as const,
    answerKey: "whyWasCreatedAnswer" as const
  },
  {
    questionKey: "isSpontaneSafe" as const,
    answerKey: "isSpontaneSafeAnswer" as const
  },
  {
    questionKey: "stillHaveQuestions" as const,
    answerKey: "stillHaveQuestionsAnswer" as const
  }
];

export function FAQ() {
  const { t } = useLanguage();
  
  return (
    <section className="w-full py-32 px-4 bg-white border-t border-gray-200">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest mb-6" style={{ color: '#c0913f' }}>
            YOUR QUESTIONS ANSWERED
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t('frequentlyAskedQuestions')}</h2>
          <p className="text-xl text-gray-600 font-light">
            {t('everythingYouNeedToKnow')}
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-1">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-200"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6 text-base font-normal text-gray-900">
                <span className="pr-4">{t(faq.questionKey)}</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6 leading-relaxed font-light">
                {t(faq.answerKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}