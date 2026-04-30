import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-foreground text-white border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-2xl font-black tracking-tighter text-primary">
              erknst<span className="text-white">.</span>
            </span>
            <p className="text-sm text-white/40">Full-Stack System Developer</p>
          </div>
          
          <div className="flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          
          <p className="text-xs text-white/40 font-medium">
            &copy; {currentYear} Paul Ardy Erni Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}