import { Banner } from '@/components/banner';
import { Cta } from '@/components/cta';
import FeaturesDestination from '@/components/FeaturesDestination';
import { Testimonials } from '@/components/testimonials';
import { WhyChoose } from '@/components/why-choose';

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturesDestination />
      <WhyChoose />
      <Testimonials />
      <Cta />
    </>
  );
}
