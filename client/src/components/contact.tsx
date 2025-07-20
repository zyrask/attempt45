import { Mail } from "lucide-react";

export default function Contact() {
  const contacts = [
    {
      title: "Discord",
      description: "Direct message me for quick questions or collaborations",
      value: "codexyn",
      icon: (
        <svg className="w-8 h-8 text-red-accent" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0188 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
        </svg>
      ),
      isLink: false
    },
    {
      title: "Email",
      description: "For business inquiries and detailed project discussions",
      value: "zyraskk@gmail.com",
      icon: <Mail className="w-8 h-8 text-red-accent" />,
      isLink: true,
      href: "mailto:zyraskk@gmail.com"
    },
    {
      title: "Roblox",
      description: "Connect with me for game development collaboration",
      value: "SUSPECTPLOT",
      icon: (
        <svg className="w-8 h-8 text-red-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      ),
      isLink: true,
      href: "https://www.roblox.com/users/648417667/profile",
      linkText: "View Profile"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-midnight-light/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Get In Touch</h2>
          <p className="text-xl text-text-secondary">Let's collaborate on your next Discord bot or game project</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contacts.map((contact) => (
            <div key={contact.title} className="bg-midnight border border-border-dark rounded-2xl p-8 text-center hover-lift">
              <div className="w-16 h-16 bg-red-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {contact.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-red-accent">{contact.title}</h3>
              <p className="text-text-secondary mb-4">{contact.description}</p>
              {contact.isLink && contact.href ? (
                <div className="space-y-2">
                  <p className="font-mono text-white bg-midnight-light px-4 py-2 rounded-lg">
                    {contact.value}
                  </p>
                  <a 
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-red-accent hover:text-red-hover transition-colors duration-200 text-sm"
                  >
                    {contact.linkText || contact.value}
                  </a>
                </div>
              ) : (
                <p className="font-mono text-white bg-midnight-light px-4 py-2 rounded-lg">
                  {contact.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
