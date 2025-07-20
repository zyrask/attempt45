export default function Hero() {
  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <section id="home" className="pt-24 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center fade-in">
        <div className="mb-8">
          <img 
            src="https://i.ibb.co/XfLLCNmk/download-4.jpg" 
            alt="codexyn" 
            className="w-24 h-24 rounded-2xl mx-auto mb-6 glow-red"
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">codexyn</h1>
        <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
          Discord bot developer specializing in{" "}
          <span className="text-red-accent font-semibold">Node.js & Python</span>. 
          Building innovative bots and exploring{" "}
          <span className="text-red-accent font-semibold">Roblox development</span> with Luau.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleNavClick("#projects")}
            className="px-8 py-4 bg-red-accent hover:bg-red-hover text-white font-semibold rounded-xl transition-all duration-200 hover:glow-red"
          >
            View Projects
          </button>
          <button
            onClick={() => handleNavClick("#contact")}
            className="px-8 py-4 border-2 border-red-accent hover:bg-red-accent hover:text-white text-red-accent font-semibold rounded-xl transition-all duration-200"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}
