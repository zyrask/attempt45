import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import BroadcastError from "@/components/broadcast-error";
import About from "@/components/about";
import Contact from "@/components/contact";
import { useSecretCode } from "@/hooks/use-secret-code";
import Notification from "@/components/ui/notification";

export default function Home() {
  const { showNotification } = useSecretCode();

  return (
    <div className="min-h-screen bg-midnight text-white font-sans antialiased">
      <div className="min-h-screen bg-gradient-to-br from-midnight via-midnight-light to-midnight grid-bg">
        <Navigation />
        <Hero />
        <Projects />
        <BroadcastError />
        <About />
        <Contact />
        
        {/* Footer */}
        <footer className="py-12 bg-midnight">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="flex justify-center items-center mb-6">
              <img 
                src="https://i.ibb.co/XfLLCNmk/download-4.jpg" 
                alt="codexyn" 
                className="w-8 h-8 rounded-lg mr-3"
              />
              <span className="text-lg font-semibold text-glow">codexyn</span>
            </div>
            <p className="text-text-secondary text-lg mb-4">
              Obviously made with love by the man, <span className="text-red-accent font-semibold">codexyn</span>.
            </p>
            <div className="border-t border-border-dark pt-6">
              <p className="text-text-secondary text-sm">
                &copy; 2024 codexyn. Built for creativity, powered by passion.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <Notification show={showNotification} />
    </div>
  );
}
