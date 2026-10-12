import Contact from "@/components/sections/Contact";
import FaceliftResults from "@/components/sections/FaceliftResults";
import Hero from "@/components/sections/Hero";
import InternationalReach from "@/components/sections/InternationalReach";
import LatestBlogs from "@/components/sections/LatestBlogs";
import Recognition from "@/components/sections/Recognition";
import StateOfArt from "@/components/sections/StateOfArt";
import Surgeons from "@/components/sections/Surgeons";

export default function Home() {
  return (
    <main>
      <Hero />
      <Recognition />
      <FaceliftResults />
      <StateOfArt />
      <Surgeons />
      <LatestBlogs />
      <InternationalReach />
      <Contact />
    </main>
  );
}
