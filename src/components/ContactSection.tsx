import React from 'react';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-foreground text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -ml-64 -mb-64" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Let's discuss your next <span className="text-primary">system</span>.
              </h2>
              <p className="text-white/60 text-lg max-w-lg leading-relaxed">
                Whether it's a new enterprise workflow tool or a scalable backend integration, I'm ready to help you build it.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <a href="mailto:paerni.it@gmail.com" className="flex items-center gap-4 group">
                <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-1">Email Me</p>
                  <p className="text-xl font-bold">paerni.it@gmail.com</p>
                </div>
              </a>

              <div className="flex gap-4">
                <a href="https://github.com/ArdyErni" className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-foreground transition-all">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/ernipa-it/" className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-foreground transition-all">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-8 md:p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
            <form action="https://formspree.io/f/mjglkkje" method="POST" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-1">Name</label>
                  <Input
                    name="name"
                    placeholder="John Doe"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-1">Email</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus-visible:ring-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60 ml-1">Message</label>
                <Textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 min-h-[150px] rounded-xl focus-visible:ring-primary"
                />
              </div>
              <Button type="submit" size="lg" className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg">
                Send Message
                <Send className="ml-3 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}