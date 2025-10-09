import React from 'react';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="block w-48 text-center p-4 rounded-lg font-mono uppercase tracking-widest transition-all duration-300 ease-in-out transform hover:-translate-y-1 neon-text neon-border hover:bg-cyan-400/[0.1] hover:shadow-[0_0_35px_#00ffff]"
  >
    {children}
  </a>
);

const Navigation = () => {
  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <nav className="flex flex-col items-center">
        <div className="space-y-6">
          {/* Group 1 */}
          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <NavLink href="#">Home</NavLink>
            <NavLink href="#">About</NavLink>
          </div>

          {/* Group 2 */}
          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <NavLink href="#">Projects</NavLink>
            <NavLink href="#">Blog</NavLink>
          </div>

          {/* Group 3 */}
          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <NavLink href="#">Contact</NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;