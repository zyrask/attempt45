import { AlertTriangle, Shield, DollarSign, Ticket } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Broadcast Error",
      description: "Analog horror Roblox game developed in collaboration with a friend. Features immersive storytelling and atmospheric gameplay mechanics built with Roblox Studio and Luau.",
      icon: AlertTriangle,
      technologies: ["Roblox Studio", "Luau", "Game Development"],
      status: null,
      link: "#broadcast-error"
    },
    {
      title: "Light Yagami",
      description: "Solo-developed Discord moderation and entertainment bot. Features comprehensive moderation tools, fun commands, and automated server management capabilities.",
      icon: Shield,
      technologies: ["Discord.js", "Node.js", "Moderation"],
      status: { text: "Active Development", color: "text-green-400" }
    },
    {
      title: "Luckigi",
      description: "Discord gambling bot inspired by Dank Memer. Features casino games, currency system, and engaging gambling mechanics for Discord servers.",
      icon: DollarSign,
      technologies: ["Python", "Discord.py", "Gaming"],
      status: { text: "Beta Testing", color: "text-blue-400" }
    },
    {
      title: "Sentinel",
      description: "Advanced Discord bot specialized in ticket systems and welcome automation. Streamlines server onboarding and provides efficient support ticket management.",
      icon: Ticket,
      technologies: ["Discord.js", "Node.js", "Automation"],
      status: { text: "Production Ready", color: "text-green-400" }
    }
  ];

  const handleProjectClick = (link?: string) => {
    if (link) {
      const target = document.querySelector(link);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  };

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Projects</h2>
          <p className="text-xl text-text-secondary">A showcase of my Discord bots and Roblox development work</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div 
                key={project.title}
                className="bg-midnight-light border border-border-dark rounded-2xl p-8 hover-lift cursor-pointer"
                onClick={() => handleProjectClick(project.link)}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-accent/20 rounded-xl flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-red-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-accent">{project.title}</h3>
                </div>
                <p className="text-text-secondary mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-red-accent/20 text-red-accent rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.status ? (
                  <div className="text-text-secondary">
                    Status: <span className={`${project.status.color} font-semibold`}>{project.status.text}</span>
                  </div>
                ) : project.link && (
                  <button className="text-red-accent hover:text-red-hover font-semibold inline-flex items-center">
                    Learn More 
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
