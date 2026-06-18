import { AmbientBackground } from "./components/AmbientBackground";
import { CursorGlow } from "./components/CursorGlow";
import { FloatingCTA } from "./components/FloatingCTA";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/ScrollProgress";
import { SocialSidebar } from "./components/SocialSidebar";
import { useTheme } from "./hooks/useTheme";
import {
  About,
  CaseStudies,
  Contact,
  Credentials,
  Expertise,
  Experience,
  Gallery,
  Hero,
  HowIWork,
  Insights,
  Leadership,
  Metrics,
  Testimonials,
  Tools,
  Trust,
} from "./sections/Sections";

function Divider() {
  return <div className="section-divider" />;
}

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-bg relative min-h-screen overflow-x-hidden">
      <AmbientBackground />
      <div className="relative z-10">
        <CursorGlow />
        <ScrollProgress />
        <SocialSidebar />
        <FloatingCTA />
        <Navbar theme={theme} setTheme={setTheme} />

        <main>
          <Hero />
          <Trust />
          <Divider />
          <About />
          <Divider />
          <Expertise />
          <Divider />
          <HowIWork />
          <Divider />
          <Metrics />
          <Divider />
          <Experience />
          <Divider />
          <CaseStudies />
          <Divider />
          <Leadership />
          <Divider />
          <Credentials />
          <Divider />
          <Testimonials />
          <Divider />
          <Gallery />
          <Divider />
          <Insights />
          <Divider />
          <Tools />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}
