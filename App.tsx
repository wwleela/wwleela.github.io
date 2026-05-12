/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  Mail, 
  MessageCircle, 
  Phone, 
  ArrowRight, 
  Menu, 
  X,
  ExternalLink,
  ShieldCheck,
  Star
} from "lucide-react";
import { ContentData, Program } from "./types";

export default function App() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/assets/content.json")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error("Failed to load content", err));
  }, []);

  const handleEnroll = (program: Program) => {
    if (!content) return;
    const message = content.whatsapp.preFillTemplate
      .replace("{{programName}}", program.displayName)
      .replace("{{price}}", program.price.toLocaleString("en-IN"));
    
    const url = `https://wa.me/${content.contact.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleTrial = () => {
    if (!content) return;
    const url = `https://wa.me/${content.contact.phone}?text=${encodeURIComponent(content.whatsapp.freeTrialTemplate)}`;
    window.open(url, "_blank");
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-vintage-cream flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-deep-teal rounded-full border-t-transparent animate-spin mb-4" />
          <p className="font-mono text-xs uppercase tracking-widest text-deep-teal">Initializing Mission 2026...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-burnt-orange selection:text-white">
      {/* Google Analytics Placeholder */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </script>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-vintage-cream/80 backdrop-blur-md border-b-3 border-keyline">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-3xl font-bold text-deep-teal">UGH</span>
            <div className="hidden sm:block h-6 w-px bg-keyline/20 mx-2" />
            <span className="hidden sm:block font-mono text-[10px] uppercase tracking-widest text-keyline/60 mt-1">Mission 2026</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Programs", "Workshops", "Gallery", "About"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="font-serif text-lg font-semibold hover:text-burnt-orange transition-colors"
              >
                {item}
              </a>
            ))}
            <button 
              onClick={handleTrial}
              className="bg-burnt-orange text-white font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-full btn-tactical"
            >
              Secure Your Spot
            </button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-vintage-cream pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 items-center">
              {["Programs", "Workshops", "Gallery", "About"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="font-serif text-3xl font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={handleTrial}
                className="w-full bg-burnt-orange text-white font-mono text-sm uppercase tracking-widest py-4 rounded-full btn-tactical mt-8"
              >
                Secure Your Spot
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-64 h-64 md:w-80 md:h-80 mb-12"
            >
              <div className="absolute inset-0 bg-deep-teal rounded-full translate-x-4 translate-y-4" />
              <div className="relative w-full h-full rounded-full border-4 border-keyline overflow-hidden bg-white">
                <img 
                  src="https://lh3.googleusercontent.com/aida/ADBb0ui6K99eXFqSU6cl268hCSbrgfOAXdOfBdCrVFkqqH-6NvZ4N66OTbJwgkfodGmPiTaysIlbLIxZH6NwPsgiC7h5zmXSY5Q3xmzi1-fQcJlNM7xFAhSUINTvlVFEvooi8G7CNHYKsm1IC7MCd0MJlpB0AJAhRlkP1QywmITpc9gBQTKRoLOWseAxZWByrtIltlr2fqCAkPpqYij0TbAUoKPU2e0cGiyKKXr9Vv9pfZ-hqwUcXKydHBzCARlKTLW7vtDhDIE05btu" 
                  alt="UGH Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-5xl md:text-7xl font-bold mb-8 max-w-4xl tracking-tight leading-[1.05]"
            >
              Master the concrete waves of <span className="text-deep-teal">Hyderabad.</span>
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-sans text-lg md:text-xl text-keyline/70 max-w-2xl mb-12"
            >
              A unique blend of vintage elegance and tactical precision. Join our community of urban gliders and elevate your street surfing skills.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button 
                onClick={handleTrial}
                className="bg-burnt-orange text-white font-mono text-sm uppercase tracking-widest px-10 py-5 rounded-full btn-tactical text-lg"
              >
                SECURE YOUR SPOT
              </button>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 opacity-10">
            <div className="w-96 h-96 border-4 border-deep-teal rounded-full scale-150" />
          </div>
          <div className="absolute top-1/3 right-0 -translate-y-1/2 -z-10 opacity-10">
            <div className="w-80 h-80 border-4 border-burnt-orange rounded-full scale-125" />
          </div>
        </section>

        {/* Training Modules */}
        <section id="programs" className="py-24 px-6 bg-white border-y-3 border-keyline">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-16 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-burnt-orange mb-4">Tactical Curriculum</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Training Modules</h2>
              <div className="w-32 h-1 bg-keyline" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-8">
              {Object.values(content.programs).map((program, idx) => (
                <motion.div 
                  key={program.id}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-vintage-cream card-tactical p-8 flex flex-col relative overflow-hidden ${
                    program.badge ? "md:-translate-y-4 shadow-[4px_4px_0_#97381d]" : ""
                  }`}
                >
                  <div className="absolute top-6 right-6 font-mono text-[10px] text-keyline/40 uppercase tracking-widest">
                    SN:{program.id.toUpperCase().substring(0, 3)}-00{idx + 1}
                  </div>

                  <div className="border-b-2 border-keyline pb-6 mb-6">
                    <h3 className="font-serif text-2xl font-bold text-deep-teal mb-2">{program.displayName}</h3>
                    {program.badge && (
                      <span className="bg-burnt-orange text-white font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded inline-block border-2 border-keyline">
                        {program.badge}
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-sm text-keyline/70 mb-8 flex-grow">
                    {program.description}
                  </p>

                  <ul className="space-y-3 mb-10">
                    {program.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-2 text-sm font-medium">
                        <ShieldCheck size={18} className="text-deep-teal shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <div className="mb-6 flex items-baseline gap-1">
                      <span className="font-serif text-3xl font-bold italic">₹{program.price.toLocaleString("en-IN")}</span>
                      <span className="text-xs text-keyline/40 font-mono italic">/{program.period}</span>
                    </div>
                    <button 
                      onClick={() => handleEnroll(program)}
                      className={`w-full font-mono text-xs uppercase tracking-widest py-4 rounded-full border-3 border-keyline transition-colors
                        ${program.badge ? "bg-burnt-orange text-white hover:bg-rust" : "bg-white text-keyline hover:bg-burnt-orange hover:text-white"}
                      `}
                    >
                      {program.ctaText}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Process */}
        <section className="py-24 px-6 bg-vintage-cream">
          <div className="max-w-4xl mx-auto bg-white border-4 border-keyline rounded-collector p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-deep-teal p-3 rounded-xl border-2 border-keyline text-white">
                <Star size={24} />
              </div>
              <h2 className="font-serif text-3xl font-bold">Enrollment Protocol</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="font-sans text-keyline/70 mb-6 italic border-l-4 border-burnt-orange pl-4">
                  Manual verification ensures Coach Leela handles every enrollment with personalized attention.
                </p>
                <div className="space-y-6">
                  {content.paymentInstructions.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="font-mono text-sm bg-keyline text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <p className="font-sans text-sm font-medium leading-relaxed">
                        {step.replace("{{price}}", "Calculated")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-vintage-cream border-3 border-keyline rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                <span className="font-mono text-[10px] uppercase tracking-widest text-keyline/40 mb-2">Primary UPI ID</span>
                <span className="font-serif text-3xl font-bold text-deep-teal mb-6 select-all cursor-pointer">
                  {content.paymentInstructions.upiId}
                </span>
                <div className="w-full p-4 bg-white border-2 border-keyline rounded-xl mb-4">
                  <p className="text-[10px] font-mono text-keyline/60 uppercase">Expected Response Time</p>
                  <p className="font-serif font-bold">~30 Minutes</p>
                </div>
                <p className="text-xs text-keyline/50 font-mono">
                  Verification hours: 06:00 - 22:00 IST
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-keyline text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h2 className="font-serif text-4xl font-bold mb-4">UGH</h2>
              <p className="font-sans text-white/60 max-w-md mb-8">
                Skateboarding is more than a sport; it&apos;s a tactical dialogue with urban architecture. Join us in Hyderabad.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-3 border-2 border-white/20 rounded-full hover:bg-burnt-orange hover:border-burnt-orange transition-all">
                  <Instagram size={20} />
                </a>
                <a href={`mailto:${content.contact.email}`} className="p-3 border-2 border-white/20 rounded-full hover:bg-deep-teal hover:border-deep-teal transition-all">
                  <Mail size={20} />
                </a>
                <a href={content.contact.whatsappGroup} target="_blank" rel="noreferrer" className="p-3 border-2 border-white/20 rounded-full hover:bg-green-600 hover:border-green-600 transition-all">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {["Safety Protocol", "Terms of Service", "Privacy Policy", "Contact"].map(item => (
                  <li key={item}>
                    <a href="#" className="font-sans text-sm text-white/60 hover:text-burnt-orange transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-6">Community</h3>
              <div className="space-y-4">
                <button 
                  onClick={() => window.open(content.contact.googleBusiness, "_blank")}
                  className="group flex items-center gap-2 text-sm font-sans text-white/60 hover:text-white transition-all"
                >
                  Review our Community
                  <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-[10px] font-mono text-white/40 uppercase mb-1">Coached by</p>
                  <p className="font-serif font-bold text-lg">{content.contact.coachName}</p>
                  <p className="font-mono text-[10px] text-white/30 uppercase mt-1">IOC Certified</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
              © 2026 Urban Gliding Hyderabad. Stay Tactical.
            </p>
            <div className="flex gap-6">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Built for Hyderabad</span>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">v{content.meta.version}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
