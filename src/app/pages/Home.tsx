import { Banner } from "../components/Banner";
import { MonstersSection } from "../components/MonstersSection";
import { FAQ } from "../components/FAQ";
import { SpeakingPartnerSection } from "../components/SpeakingPartnerSection";

export function Home() {
  return (
    <>
      <Banner />
      <SpeakingPartnerSection />
      <MonstersSection />
      <FAQ />
    </>
  );
}
