import BannerImage from './BannerImage';
import BannerDescription from './BannerDescription';

export default function MainPageBanner() {
  return (
    <section className="relative w-full h-[240px] md:h-[550px]">
      <BannerImage />
      <BannerDescription />
    </section>
  );
}
