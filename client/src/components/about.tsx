export default function About() {
  const skills = [
    {
      name: "Discord Bot Development",
      level: 90,
      label: "Expert",
      color: "bg-red-accent"
    },
    {
      name: "Node.js & Python",
      level: 85,
      label: "Advanced",
      color: "bg-red-accent"
    },
    {
      name: "Roblox Studio & Luau",
      level: 60,
      label: "Intermediate",
      color: "bg-yellow-400"
    },
    {
      name: "Game Development",
      level: 50,
      label: "Growing",
      color: "bg-yellow-400"
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">About Me</h2>
          <p className="text-xl text-text-secondary">Passionate developer crafting digital experiences</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-red-accent">Skills & Technologies</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-red-accent">{skill.label}</span>
                  </div>
                  <div className="w-full bg-border-dark rounded-full h-2">
                    <div 
                      className={`${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 text-red-accent">My Journey</h3>
            <div className="space-y-6 text-text-secondary">
              <p>
                Started as a passionate Discord bot developer, I've built multiple successful bots 
                that serve thousands of users across various Discord communities. My expertise lies 
                in creating sophisticated automation tools and entertainment systems.
              </p>
              <p>
                Recently, I've expanded into game development with Roblox Studio and Luau, 
                working on atmospheric horror experiences and pushing creative boundaries. 
                Each project teaches me something new about interactive storytelling and user engagement.
              </p>
              <p>
                Always exploring new technologies and methodologies to create more engaging 
                and efficient digital experiences. Currently focusing on advanced Discord bot 
                architectures and immersive game development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
