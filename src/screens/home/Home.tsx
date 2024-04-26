import Hero from "../../components/hero/Hero";
import OurServices from "../../components/ourServices/OurServices";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <OurServices />
    </div>
  );
}
