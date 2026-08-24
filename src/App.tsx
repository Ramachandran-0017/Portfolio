import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowDownRight, ArrowRight, Check, Code2, Database, Download,
  ExternalLink, Github, GraduationCap, Layers3, Linkedin, Mail, Menu,
  Server, Sparkles, Terminal, X, Zap, Smartphone, BriefcaseBusiness, Sun, Moon,
} from "lucide-react";
import { certifications, navItems, profile, projects, roles, skills, timeline } from "./data/portfolio";

const sectionIds = navItems.map(([, id]) => id);

function Reveal({ children, delay = 0, y = 28, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: .7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
}

function SectionHeading({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.24em] text-cyan-300/80">
        <span className="h-px w-8 bg-cyan-300/50" />{kicker}
      </div>
      <h2 className="text-4xl font-semibold tracking-[-.05em] text-white md:text-6xl">{title}</h2>
      {copy && <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">{copy}</p>}
    </Reveal>
  );
}

function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 22 }); const sy = useSpring(y, { stiffness: 350, damping: 22 });
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={(e) => {
      const r = ref.current?.getBoundingClientRect(); if (!r) return;
      x.set((e.clientX - (r.left + r.width / 2)) * .14); y.set((e.clientY - (r.top + r.height / 2)) * .14);
    }} onMouseLeave={() => { x.set(0); y.set(0); }} className={className}>{children}</motion.div>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 180, damping: 20 }); const sy = useSpring(ry, { stiffness: 180, damping: 20 });
  return (
    <motion.div ref={ref} style={{ rotateX: sx, rotateY: sy, transformPerspective: 1000 }} onMouseMove={(e) => {
      const r = ref.current?.getBoundingClientRect(); if (!r) return;
      rx.set(-((e.clientY - r.top) / r.height - .5) * 8); ry.set(((e.clientX - r.left) / r.width - .5) * 10);
    }} onMouseLeave={() => { rx.set(0); ry.set(0); }}>{children}</motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [category, setCategory] = useState("All");
  const [lightMode, setLightMode] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const heroY = useTransform(scrollYProgress, [0, .35], [0, -90]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme-v3");
    if (savedTheme === "dark") setLightMode(false);
    const t = window.setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2600);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-light", lightMode);
    window.localStorage.setItem("portfolio-theme-v3", lightMode ? "light" : "dark");
  }, [lightMode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-35% 0px -55% 0px" });
    sectionIds.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const filteredProjects = useMemo(() => category === "All" ? projects : projects.filter(p => p.category === category), [category]);
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  return (
    <div className={`min-h-screen overflow-x-hidden bg-[#07080b] text-zinc-100 ${lightMode ? "theme-light" : ""}`}>
      <motion.div className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-cyan-300" style={{ scaleX: progress }} />
      <div className="noise" /><div className="grid-bg pointer-events-none fixed inset-0 z-0" /><CursorGlow />

      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
        <div className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all ${scrolled ? "glass rounded-2xl py-3" : "py-1"}`}>
          <a href="#home" className="group flex items-center gap-3"><motion.span whileHover={{ rotate: 12, scale: 1.06 }} className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-cyan-200"><Code2 size={17}/></motion.span><span className="hidden text-sm font-semibold sm:block">RG<span className="text-cyan-300">.</span></span></a>
          <nav className="hidden items-center gap-1 md:flex">{navItems.map(([label,id]) => <a key={id} href={`#${id}`} className={`portfolio-nav-link rounded-xl px-3 py-2 text-xs font-semibold ${active === id ? "is-active" : ""}`}>{label}</a>)}</nav>
          <div className="hidden items-center gap-4 md:flex"><Social href={profile.github} label="GitHub"><Github size={16}/></Social><Social href={profile.linkedin} label="LinkedIn"><Linkedin size={16}/></Social><span className="mx-1 h-6 w-px bg-white/10" aria-hidden="true"/><ThemeToggle lightMode={lightMode} setLightMode={setLightMode}/></div>
          <div className="flex items-center gap-2 md:hidden"><ThemeToggle lightMode={lightMode} setLightMode={setLightMode}/><button className="rounded-xl border border-white/10 p-2.5" onClick={() => setMenuOpen(v=>!v)} aria-label="Toggle navigation">{menuOpen?<X size={18}/>:<Menu size={18}/>}</button></div>
        </div>
        {menuOpen && <motion.nav initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} className="glass mx-4 mt-2 rounded-2xl p-2 md:hidden">{navItems.map(([label,id])=><a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm text-zinc-300 hover:bg-white/[.04]">{label}</a>)}</motion.nav>}
      </header>

      <main className="relative z-10">
        <section id="home" className="relative flex min-h-screen items-center px-5 pb-20 pt-32">
          <motion.div style={{ y: heroY }} className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.24em] text-cyan-300/80"><span className="pulse-dot"/> {profile.eyebrow}</motion.div>
              <div className="overflow-hidden"><motion.h1 initial={{opacity:0,y:80}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.08,ease:[.22,1,.36,1]}} className="max-w-4xl text-5xl font-semibold leading-[.94] tracking-[-.065em] md:text-7xl lg:text-[6.4rem]">{profile.headline.split(" ").map((word,i)=><span key={i} className={i>4?"text-gradient inline-block mr-[.22em]":"inline-block mr-[.22em]"}>{word}</span>)}</motion.h1></div>
              <div className="mt-8 flex h-10 items-center gap-3 text-lg text-zinc-400 md:text-xl"><span>I am a</span><AnimatePresenceText text={roles[roleIndex]} /></div>
              <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.65,duration:.7}} className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">{profile.summary}</motion.p>
              <div className="mt-9 flex flex-wrap gap-3"><Magnetic><a href="#projects" className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,.08)]">Explore my work <ArrowRight size={16} className="transition group-hover:translate-x-1"/></a></Magnetic><Magnetic><a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.02] px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-cyan-300/25 hover:bg-cyan-300/[.04]">Let's talk <Mail size={15}/></a></Magnetic></div>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-zinc-500"><span>Java / Spring Boot</span><span>React / Web</span><span>Flutter / Mobile</span><span>SQL / APIs</span></div>
            </div>
            <HeroVisual />
          </motion.div>
          <motion.a href="#about" animate={{y:[0,8,0]}} transition={{duration:2,repeat:Infinity}} className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[.25em] text-zinc-600 md:flex">Scroll to explore <ArrowDownRight size={14}/></motion.a>
        </section>

        <section id="about" className="scroll-mt-24 px-5 py-28"><div className="mx-auto max-w-6xl"><SectionHeading kicker="01 / About" title="A broad software mindset, not just one stack." copy="I like understanding the whole journey from interface to API to data — and I bring that mindset to both web and mobile development."/><div className="grid gap-5 md:grid-cols-3"><InfoCard icon={<BriefcaseBusiness/>} number="01" title="Build" text="Practical applications with clean UI, reusable components and real functionality."/><InfoCard icon={<Server/>} number="02" title="Connect" text="REST APIs, authentication, backend services and database-driven workflows."/><InfoCard icon={<Smartphone/>} number="03" title="Adapt" text="Comfortable moving between web, backend and mobile when the product needs it."/></div></div></section>

        <section id="skills" className="scroll-mt-24 px-5 py-28"><div className="mx-auto max-w-6xl"><SectionHeading kicker="02 / Skills" title="Tools I use to turn ideas into software." copy="A practical toolkit across application development, frontend, backend, data and mobile."/><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Object.entries(skills).map(([group,items],i)=><Reveal key={group} delay={i*.05}><TiltCard><div className="skill-card light-skills-card reveal-border glass rounded-3xl p-6"><div className="flex items-center justify-between"><div className="grid h-10 w-10 place-items-center rounded-xl bg-white/[.04] text-zinc-300">{group.includes("Frontend")?<Layers3 size={18}/>:group.includes("Backend")?<Server size={18}/>:group.includes("Database")?<Database size={18}/>:group.includes("Mobile")?<Smartphone size={18}/>:group.includes("Languages")?<Code2 size={18}/>:<Terminal size={18}/>}</div><span className="text-[10px] uppercase tracking-[.2em] text-zinc-600">0{i+1}</span></div><h3 className="mt-7 font-semibold">{group}</h3><div className={`mt-4 flex gap-2 ${group === "Tools & Practices" ? "tools-practice-list flex-nowrap" : "flex-wrap"}`}>{items.map(item=><motion.span whileHover={{y:-3,scale:1.03}} key={item} className={`whitespace-nowrap rounded-lg border border-white/[.07] bg-white/[.025] px-2.5 py-1.5 text-xs text-zinc-400 hover:border-cyan-300/25 hover:text-zinc-200 ${group === "Tools & Practices" ? "tools-practice-chip" : ""}`}>{item}</motion.span>)}</div></div></TiltCard></Reveal>)}</div></div></section>

        <section id="projects" className="scroll-mt-24 px-5 py-28"><div className="mx-auto max-w-6xl"><SectionHeading kicker="03 / Selected Work" title="Real projects. Different kinds of problems." copy="From full-stack CRUD systems to responsive websites, these projects show how I work across different software roles."/><div className="mb-8 flex flex-wrap gap-2">{categories.map(c=><motion.button whileTap={{scale:.96}} key={c} onClick={()=>setCategory(c)} className={`rounded-full border px-4 py-2 text-xs font-medium transition ${category===c?"border-cyan-300/30 bg-cyan-300/10 text-cyan-200":"border-white/10 text-zinc-500 hover:text-zinc-200"}`}>{c}</motion.button>)}</div><motion.div layout className="space-y-5">{filteredProjects.map((project,i)=><ProjectCard key={project.title} project={project} index={i}/>)}</motion.div></div></section>

        <section id="experience" className="scroll-mt-24 px-5 py-28"><div className="mx-auto max-w-6xl"><SectionHeading kicker="04 / Experience" title="Where learning became hands-on engineering." copy="A timeline built from the experience and education in my resume."/><div className="timeline-wrap ml-3 border-l border-white/10 pl-8 md:ml-10 md:pl-12">{timeline.map((item,i)=><Reveal key={item.title} delay={i*.08} y={18}><div className="relative mb-14 last:mb-0"><motion.span whileInView={{scale:[0,1.25,1]}} viewport={{once:true}} transition={{delay:i*.08+.2}} className="absolute -left-[41px] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-cyan-300/40 bg-[#07080b] md:-left-[61px]"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300"/></motion.span><span className="text-[10px] font-semibold uppercase tracking-[.2em] text-cyan-300/70">{item.date}</span><h3 className="mt-2 text-xl font-semibold">{item.title}</h3><p className="mt-1 text-sm text-zinc-500">{item.organization}</p><p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">{item.description}</p><div className="mt-4 flex flex-wrap gap-2">{item.tags.map(tag=><span key={tag} className="rounded-lg bg-white/[.035] px-2.5 py-1 text-[11px] text-zinc-500">{tag}</span>)}</div></div></Reveal>)}</div></div></section>

        <section id="resume" className="scroll-mt-24 px-5 py-28"><div className="mx-auto max-w-6xl"><div className="resume-panel reveal-border relative overflow-hidden rounded-[2rem] bg-[#0d1117] p-8 md:p-12"><div className="aurora aurora-one"/><div className="aurora aurora-two"/><div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]"><div><div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.22em] text-cyan-300/70"><Zap size={14}/> Resume</div><h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-.035em] md:text-5xl">A quick look at the experience behind the work.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-zinc-500">Download the latest resume to see my experience, skills, projects and certifications.</p><div className="mt-6 space-y-2">{certifications.map(c=><div key={c} className="flex gap-2 text-xs text-zinc-400"><Check size={14} className="mt-0.5 text-cyan-300"/>{c}</div>)}</div></div><div className="flex flex-wrap gap-3"><Magnetic><a href={profile.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold transition hover:bg-white/[.05]">View Resume <ExternalLink size={15}/></a></Magnetic><Magnetic><a href={profile.resume} download className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-100">Download <Download size={15}/></a></Magnetic></div></div></div></div></section>

        <section id="contact" className="scroll-mt-24 px-5 py-28"><div className="mx-auto max-w-6xl"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><SectionHeading kicker="05 / Contact" title="Let's build something worth shipping." copy="Have an opportunity, project idea or software problem? Reach out and start a conversation."/><div className="space-y-3"><ContactLink href={`mailto:${profile.email}`} icon={<Mail size={18}/>} text={profile.email}/><ContactLink href={profile.github} icon={<Github size={18}/>} text="GitHub"/><ContactLink href={profile.linkedin} icon={<Linkedin size={18}/>} text="LinkedIn"/></div></div><ContactForm/></div></div></section>
      </main>
      <footer className="relative z-10 border-t border-white/[.06] px-5 py-8"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-xs text-zinc-600 md:flex-row"><span>© {new Date().getFullYear()} Ramachandran G</span><span>Designed & built with React, TypeScript & Motion.</span></div></footer>
    </div>
  );
}

function AnimatePresenceText({text}:{text:string}) { return <motion.span key={text} initial={{opacity:0,y:18,filter:"blur(8px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} exit={{opacity:0,y:-18}} transition={{duration:.45}} className="role-gradient font-semibold">{text}</motion.span>; }
function ThemeToggle({lightMode,setLightMode}:{lightMode:boolean;setLightMode:(v:boolean)=>void}) { return <motion.button type="button" whileTap={{scale:.92}} whileHover={{scale:1.04}} onClick={()=>setLightMode(!lightMode)} aria-label={lightMode ? "Switch to dark mode" : "Switch to light mode"} aria-pressed={lightMode} className="theme-toggle" title={lightMode ? "Switch to dark mode" : "Switch to light mode"}><motion.span className="theme-toggle-thumb" layout transition={{type:"spring",stiffness:500,damping:30}}>{lightMode?<Sun size={14}/>:<Moon size={14}/>}</motion.span><span className="sr-only">{lightMode ? "Light mode" : "Dark mode"}</span></motion.button> }
function Social({href,label,children}:{href:string;label:string;children:React.ReactNode}) { return <Magnetic><a href={href} target="_blank" rel="noreferrer" aria-label={label} className="social-link rounded-xl border border-white/10 p-2.5 text-zinc-400 transition hover:border-cyan-300/20 hover:text-white">{children}</a></Magnetic>; }
function InfoCard({icon,number,title,text}:{icon:React.ReactNode;number:string;title:string;text:string}) { return <Reveal><TiltCard><div className="info-card reveal-border glass rounded-3xl p-7"><div className="flex items-center justify-between"><span className="text-cyan-300">{icon}</span><span className="text-[10px] tracking-[.2em] text-zinc-600">{number}</span></div><h3 className="mt-9 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{text}</p></div></TiltCard></Reveal>; }
function ProjectCard({project,index}:{project:(typeof projects)[number];index:number}) { return <Reveal delay={index*.06}><TiltCard><motion.article layout className="project-card reveal-border glass group relative overflow-hidden rounded-[2rem] p-6 md:p-8"><div className="project-sweep"/><div className="relative grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><div className="mb-5 flex items-center gap-3"><span className="text-[10px] font-semibold uppercase tracking-[.2em] text-cyan-300/70">0{index+1} / {project.category}</span><span className="h-px w-10 bg-white/10"/></div><h3 className="text-3xl font-semibold tracking-[-.04em] md:text-4xl">{project.title}</h3><p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">{project.description}</p><div className="mt-6 flex flex-wrap gap-2">{project.technologies.map(t=><span key={t} className="rounded-lg border border-white/[.07] bg-white/[.025] px-2.5 py-1.5 text-xs text-zinc-400">{t}</span>)}</div><div className="mt-7 flex flex-wrap gap-3">{project.demo&&<a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black">Live Demo <ExternalLink size={14}/></a>}{project.github&&<a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-zinc-200">GitHub <Github size={14}/></a>}</div></div><div className="rounded-3xl border border-white/[.06] bg-black/20 p-6"><span className="text-[10px] uppercase tracking-[.2em] text-zinc-600">What it demonstrates</span><p className="mt-4 text-sm leading-7 text-zinc-400">{project.problem}</p><div className="mt-6 space-y-3">{project.features.map(f=><div key={f} className="flex items-center gap-3 text-sm text-zinc-300"><span className="grid h-6 w-6 place-items-center rounded-full bg-cyan-300/10 text-cyan-300"><Check size={13}/></span>{f}</div>)}</div></div></div></motion.article></TiltCard></Reveal>; }
function ContactLink({href,icon,text}:{href:string;icon:React.ReactNode;text:string}) { return <Magnetic><a href={href} target={href.startsWith("http")?"_blank":undefined} rel={href.startsWith("http")?"noreferrer":undefined} className="contact-link glass flex items-center gap-4 rounded-2xl p-4 transition hover:border-cyan-300/20"><span className="text-cyan-200">{icon}</span><span className="text-sm text-zinc-300">{text}</span></a></Magnetic>; }
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/rahulda053@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="contact-form-card glass rounded-[2rem] p-6 md:p-8">
      <div className="mb-7">
        <span className="text-[10px] uppercase tracking-[.2em] text-cyan-300/70">Start a conversation</span>
        <h3 className="mt-2 text-2xl font-semibold">Tell me what you're building.</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-500">Send a message directly from the portfolio. I’ll receive it by email.</p>
      </div>
      <form onSubmit={submitForm} className="space-y-4">
        <input aria-label="Name" name="name" placeholder="Your name" required className="field" />
        <input aria-label="Email" name="email" type="email" placeholder="Email address" required className="field" />
        <textarea aria-label="Message" name="message" rows={6} placeholder="Tell me about the opportunity or project..." required className="field resize-none" />
        <input type="hidden" name="_subject" value="New Portfolio Contact — Ramachandran G" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="true" />
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button disabled={status === "sending"} className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">
          {status === "sending" ? "Sending..." : status === "success" ? "Message sent ✓" : "Send message"}
          {status !== "sending" && <ArrowRight size={16} className="transition group-hover:translate-x-1" />}
        </button>
        {status !== "idle" && status !== "sending" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-sm ${status === "error" ? "text-red-300" : "text-emerald-300"}`}
            role="status"
          >
            {status === "success" ? "Thanks — your message has been sent successfully." : "Something went wrong. Please try again or use the email link."}
          </motion.p>
        )}
      </form>
    </div>
  );
}
function HeroVisual() { return <div className="relative mx-auto h-[500px] w-full max-w-[520px]"><motion.div animate={{rotate:360}} transition={{duration:35,repeat:Infinity,ease:"linear"}} className="absolute inset-12 rounded-full border border-cyan-300/10 border-dashed"/><motion.div animate={{rotate:-360}} transition={{duration:24,repeat:Infinity,ease:"linear"}} className="absolute inset-24 rounded-full border border-violet-300/10"/><div className="hero-orb absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"/><div className="hero-code-card glass absolute left-1/2 top-1/2 w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] p-5 shadow-2xl"><div className="flex items-center justify-between"><span className="text-[10px] uppercase tracking-[.2em] text-zinc-600">software.exe</span><span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,.9)]"/></div><div className="mt-8 font-mono text-xs leading-7 text-zinc-500"><span className="text-cyan-300">const</span> developer = &#123;<br/><span className="pl-4 text-zinc-300">focus:</span> <span className="text-violet-300">"building"</span>,<br/><span className="pl-4 text-zinc-300">stack:</span> [<span className="text-emerald-300">"Java"</span>, <span className="text-emerald-300">"React"</span>],<br/><span className="pl-4 text-zinc-300">mindset:</span> <span className="text-amber-200">"curious"</span><br/>&#125;</div><div className="mt-8 grid grid-cols-3 gap-2">{["API","UI","SQL"].map((x,i)=><motion.div key={x} animate={{y:[0,-4,0]}} transition={{duration:2.2,delay:i*.25,repeat:Infinity}} className="rounded-xl border border-white/[.06] bg-white/[.025] py-2 text-center text-[9px] text-zinc-500">{x}</motion.div>)}</div></div><div className="float-chip left-0 top-24"><Code2 size={14}/> Java</div><div className="float-chip right-0 top-40"><Layers3 size={14}/> React</div><div className="float-chip bottom-24 left-10"><Server size={14}/> APIs</div><div className="float-chip bottom-16 right-5"><Database size={14}/> SQL</div></div>; }
function CursorGlow(){ const x=useMotionValue(-200); const y=useMotionValue(-200); const sx=useSpring(x,{stiffness:120,damping:30}); const sy=useSpring(y,{stiffness:120,damping:30}); useEffect(()=>{const f=(e:MouseEvent)=>{x.set(e.clientX);y.set(e.clientY)};window.addEventListener("mousemove",f);return()=>window.removeEventListener("mousemove",f)},[x,y]); return <motion.div style={{left:sx,top:sy}} className="cursor-glow"/>; }

export default App;
