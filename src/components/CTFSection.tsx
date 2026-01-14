import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Terminal, Lock, FileJson, Cpu, AlertTriangle } from 'lucide-react';

const challenges = [
  {
    id: 2,
    title: 'Obfuscated Intel',
    category: 'Web & JS Deobfuscation',
    difficulty: 'Medium',
    points: 300,
    icon: FileJson,
    description: 'The intelligence agency has intercepted a suspicious static page. There seems to be a hidden script running in the background collecting data.',
    details: {
      entry: 'www.blabla.com/index.html',
      setup: '<script src="secret.js"> (heavily obfuscated)',
      path: [
        'Inspect → Find secret.js',
        'Download → JSNice/CyberChef deobfuscate',
        'Extract flag variable → Flag 2 + Challenge 3 link'
      ]
    }
  }
];

const CTFSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeChallenge] = useState(challenges[0]);

  return (
    <section id="ctf" className="relative py-24 overflow-hidden bg-black/20">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10">
            <span className="font-mono-tech text-sm text-secondary uppercase tracking-wider">Track 2</span>
          </div>
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-4">
            <span className="gradient-text text-glow">Capture The Flag</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6" />
          <p className="font-rajdhani text-lg text-foreground/70 max-w-2xl mx-auto">
            Test your skills in our terminal-based CTF environment. Solve challenges, capture flags, and climb the leaderboard.
          </p>
        </motion.div>

        {/* Terminal Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-xl overflow-hidden border border-secondary/30 bg-[#050816] shadow-[0_0_30px_rgba(0,255,65,0.15)] relative">
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] bg-[length:100%_2px,3px_100%] opacity-20" />
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-secondary/10 border-b border-secondary/20 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="font-mono-tech text-sm text-secondary/70 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                user@cyberfest:~/ctf-challenges
              </div>
              <div className="w-16" />
            </div>

            {/* Terminal Body */}
            <div className="p-6 md:p-8 font-mono-tech text-sm md:text-base overflow-x-auto relative z-10 min-h-[400px]">
              <div className="flex flex-col gap-6">
                {/* Command Input */}
                <div className="flex items-center gap-3 text-secondary font-bold">
                  <span className="text-accent">➜</span>
                  <span className="text-primary">~</span>
                  <span>./view_challenge.sh --id=02</span>
                </div>

                {/* Challenge Display */}
                <div className="grid md:grid-cols-12 gap-8 mt-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  
                  {/* Left Panel: Challenge Info */}
                  <div className="md:col-span-7 space-y-6">
                    <div className="border border-secondary/20 bg-secondary/5 p-5 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
                          <Lock className="w-5 h-5" />
                          {activeChallenge.title}
                        </h3>
                        <span className="px-2 py-1 text-xs border border-secondary/50 text-secondary rounded bg-secondary/10">
                          {activeChallenge.points} PTS
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">Category</span>
                          <p className="text-primary">{activeChallenge.category}</p>
                        </div>
                        
                        <div>
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">Description</span>
                          <p className="text-foreground/80 mt-1 leading-relaxed">
                            {activeChallenge.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-accent" />
                        Intelligence Report
                      </div>
                      <div className="bg-black/40 border border-white/10 rounded p-4 font-mono text-sm space-y-2">
                        <div className="flex gap-4">
                          <span className="text-accent min-w-[80px]">TARGET:</span>
                          <span className="text-foreground/90">{activeChallenge.details.entry}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-accent min-w-[80px]">VECTOR:</span>
                          <span className="text-foreground/90">{activeChallenge.details.setup}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel: Execution Path */}
                  <div className="md:col-span-5">
                    <div className="h-full border-l border-secondary/20 pl-6 md:pl-8 relative">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-secondary/50 to-transparent opacity-50" />
                      
                      <h4 className="text-secondary font-bold mb-6 flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        Execution Path
                      </h4>

                      <div className="space-y-6">
                        {activeChallenge.details.path.map((step, index) => (
                          <div key={index} className="relative">
                            <div className="flex items-start gap-3 group">
                              <div className="mt-1 min-w-[24px] h-6 flex items-center justify-center rounded bg-secondary/10 border border-secondary/30 text-secondary text-xs">
                                {index + 1}
                              </div>
                              <p className="text-foreground/80 group-hover:text-primary transition-colors">
                                {step}
                              </p>
                            </div>
                            {index < activeChallenge.details.path.length - 1 && (
                              <div className="absolute left-3 top-7 w-px h-4 bg-secondary/20" />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 p-4 bg-accent/5 border border-accent/20 rounded text-xs text-accent/80">
                        <span className="font-bold block mb-1">HINT:</span>
                        Tools like JSNice or CyberChef are recommended for deobfuscation tasks.
                      </div>
                    </div>
                  </div>

                </div>

                {/* Blinking Cursor */}
                <div className="mt-2 flex items-center gap-2 text-secondary/50">
                  <span>awaiting_input</span>
                  <span className="w-2 h-4 bg-secondary animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTFSection;