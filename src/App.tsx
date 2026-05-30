import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, type Variants } from "framer-motion";
import {
  Mail, ExternalLink, Download,
  ChevronDown, Code2, Layers, Terminal, Cpu, Globe,
  ArrowUpRight, Sparkles, Menu, X, Database, Zap
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

/* ─────────────────────────────────────────────────────────────
   TYPES & INTERFACES
───────────────────────────────────────────────────────────── */
type Lang = "en" | "hu";

interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
}

interface AboutData {
  bio: string;
  highlights: string[];
}

interface Skill {
  name: string;
  level: number;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  accent: string;
  demo: string;
  github: string;
}

interface ContentStructure {
  titles: string[];
  tagline: string;
  availability: string;
  about: AboutData;
  projects: Project[];
  nav: string[];
  labels: {
    about: string;
    skills: string;
    work: string;
    contact: string;
    aboutHeading: string;
    aboutSubheading: string;
    skillsHeading: string;
    skillsSubheading: string;
    projectsHeading: string;
    projectsSubheading: string;
    projectsViewAll: string;
    contactHeading: string;
    contactSubheading: string;
    contactText: string;
    viewWork: string;
    downloadCv: string;
    scroll: string;
    experience: string;
    shipped: string;
    stars: string;
    satisfaction: string;
  };
}

interface PortfolioData {
  name: string;
  email: string;
  location: string;
  social: SocialLinks;
  cvUrl: string;
  skills: Record<"Frontend" | "Backend" | "Tools", Skill[]>;
}

/* ─────────────────────────────────────────────────────────────
   STATIC PORTFOLIO DATA (SHARED ACROSS LANGUAGES)
───────────────────────────────────────────────────────────── */
const PORTFOLIO_DATA: PortfolioData = {
  name: "Kristóf Pálfi",
  email: "palfikristof2004.kfpl@gmail.com",
  location: "Budapest, Hungary",
  social: {
    github: "https://github.com/Lyon0525",
    linkedin: "https://linkedin.com",
    email: "mailto:palfikristof2004.kfpl@gmail.com",
  },
  cvUrl: "#",
  skills: {
    Frontend: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 80 },
      { name: "Three.js", level: 65 },
    ],
    Backend: [
      { name: "C# / .NET", level: 95 },
      { name: "Node.js", level: 82 },
      { name: "PostgreSQL", level: 75 },
      { name: "GraphQL", level: 78 },
      { name: "Prisma", level: 72 },
    ],
    Tools: [
      { name: "Git & GitHub", level: 95 },
      { name: "Figma", level: 85 },
      { name: "Docker", level: 68 },
      { name: "Vite", level: 90 },
      { name: "Vitest", level: 78 },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   LANGUAGE DICTIONARY
───────────────────────────────────────────────────────────── */
const DICTIONARY: Record<Lang, ContentStructure> = {
  en: {
    titles: [
      "Full-Stack Web Developer",
      "Application Developer",
      "Big Data Scientist",
      "Infrastructure Engineer"
    ],
    tagline: "I architect scalable applications, design robust data pipelines, and engineer reliable infrastructure from the ground up.",
    availability: "Open to opportunities",
    about: {
      bio: "I am a versatile engineer operating at the convergence of software engineering, big data analytics, and cloud systems infrastructure. With deep expertise across the entire lifecycle of software development, I specialize in crafting elegant frontends, designing highly performant backends, implementing data science workflows, and provisioning automated cloud architectures.",
      highlights: ["Full-Stack & Native Apps", "Big Data Pipelines", "DevOps & Cloud Infrastructure"],
    },
    nav: ["About", "Skills", "Projects", "Contact"],
    labels: {
      about: "About Me",
      skills: "Tech Stack",
      work: "Work",
      contact: "Get In Touch",
      aboutHeading: "Building things",
      aboutSubheading: "that matter.",
      skillsHeading: "My ",
      skillsSubheading: "Toolkit",
      projectsHeading: "Featured ",
      projectsSubheading: "Projects",
      projectsViewAll: "View all",
      contactHeading: "Let's work ",
      contactSubheading: "together",
      contactText: "I'm currently available for freelance projects, full-time roles, and interesting collaborations. Let's build something great.",
      viewWork: "View My Work",
      downloadCv: "Download CV",
      scroll: "Scroll",
      experience: "Years of Experience",
      shipped: "Projects Shipped",
      stars: "GitHub Stars",
      satisfaction: "Client Satisfaction"
    },
    projects: [
      { title: "Lumina UI", description: "A production-ready component library built on Radix UI primitives with a focus on accessibility and developer experience.", tags: ["React", "TypeScript", "Storybook"], gradient: "from-violet-600/30 to-cyan-500/20", accent: "#7c3aed", demo: "#", github: "#" },
      { title: "Velocify Dashboard", description: "Real-time analytics dashboard for SaaS metrics with live WebSocket updates, interactive charts, and role-based access control.", tags: ["Next.js", "Recharts", "WebSocket"], gradient: "from-cyan-600/30 to-emerald-500/20", accent: "#06b6d4", demo: "#", github: "#" },
      { title: "Forge CMS", description: "A headless CMS with a visual block editor, multi-locale support, and a GraphQL API. Powers 12 production sites.", tags: ["Node.js", "GraphQL", "PostgreSQL"], gradient: "from-fuchsia-600/30 to-violet-500/20", accent: "#d946ef", demo: "#", github: "#" },
      { title: "PixelPerfect", description: "A browser-based design tool for rapid UI prototyping with export to React components. Built with Canvas API.", tags: ["Canvas API", "TypeScript", "Zustand"], gradient: "from-amber-600/20 to-orange-500/20", accent: "#f59e0b", demo: "#", github: "#" },
    ],
  },
  hu: {
    titles: [
      "Full-Stack Webfejlesztő",
      "Alkalmazásfejlesztő",
      "Big Data Adattudós",
      "Infrastruktúra Mérnök"
    ],
    tagline: "Skálázható alkalmazásokat tervezek, robusztus adatfolyamokat építek és megbízható felhő-infrastruktúrát üzemeltetek az alapoktól.",
    availability: "Nyitott a lehetőségekre",
    about: {
      bio: "Sokoldalú mérnök vagyok, aki a szoftverfejlesztés, a big data analitika és a felhőalapú rendszerek metszéspontjában dolgozik. A szoftverfejlesztés teljes életciklusában szerzett tapasztalataimmal elegáns frontendek készítésére, nagy teljesítményű backendek tervezésére, adattudományi munkafolyamatok megvalósítására és automatizált felhőarchitektúrák kiépítésére specializálódtam.",
      highlights: ["Full-Stack és Natív Appok", "Big Data Adatfolyamok", "DevOps és Felhő Infrastruktúra"],
    },
    nav: ["Rólam", "Képességek", "Projektek", "Kapcsolat"],
    labels: {
      about: "Rólam",
      skills: "Technológiák",
      work: "Munkáim",
      contact: "Kapcsolat",
      aboutHeading: "Dolgokat építek,",
      aboutSubheading: "amik számítanak.",
      skillsHeading: "Az én ",
      skillsSubheading: "Eszközkészletem",
      projectsHeading: "Kiemelt ",
      projectsSubheading: "Projektek",
      projectsViewAll: "Összes megtekintése",
      contactHeading: "Dolgozzunk ",
      contactSubheading: "együtt",
      contactText: "Jelenleg elérhető vagyok szabadúszó projektekre, teljes munkaidős pozíciókra és érdekes együttműködésekre. Építsünk valami nagyszerűt.",
      viewWork: "Munkáim megtekintése",
      downloadCv: "Önéletrajz letöltése",
      scroll: "Görgess",
      experience: "Év tapasztalat",
      shipped: "Átadott projekt",
      stars: "GitHub csillag",
      satisfaction: "Ügyfélelégedettség"
    },
    projects: [
      { title: "Lumina UI", description: "Produkcióra kész komponenskönyvtár Radix UI alapokon, fókuszban az akadálymentesítéssel és a kiváló fejlesztői élménnyel.", tags: ["React", "TypeScript", "Storybook"], gradient: "from-violet-600/30 to-cyan-500/20", accent: "#7c3aed", demo: "#", github: "#" },
      { title: "Velocify Dashboard", description: "Valós idejű analitikai műszerfal SaaS mérőszámokhoz élő WebSocket frissítésekkel, interaktív diagramokkal és szerepkör alapú hozzáféréssel.", tags: ["Next.js", "Recharts", "WebSocket"], gradient: "from-cyan-600/30 to-emerald-500/20", accent: "#06b6d4", demo: "#", github: "#" },
      { title: "Forge CMS", description: "Headless CMS vizuális blokkszerkesztővel, többnyelvű támogatással és GraphQL API-val. 12 éles weboldalt szolgál ki.", tags: ["Node.js", "GraphQL", "PostgreSQL"], gradient: "from-fuchsia-600/30 to-violet-500/20", accent: "#d946ef", demo: "#", github: "#" },
      { title: "PixelPerfect", description: "Böngészőalapú tervezőeszköz gyors UI prototípus-készítéshez, React komponens exportálási lehetőséggel. Canvas API-val építve.", tags: ["Canvas API", "TypeScript", "Zustand"], gradient: "from-amber-600/20 to-orange-500/20", accent: "#f59e0b", demo: "#", github: "#" },
    ],
  }
};

/* ─────────────────────────────────────────────────────────────
   ANIMATIONS & UTILS
───────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function useScrolled(threshold: number = 20): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useTypewriter(words: string[], typingSpeed: number = 100, deletingSpeed: number = 50, pauseDuration: number = 2000): string {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingDelay, setTypingDelay] = useState(typingSpeed);

  useEffect(() => {
    const timer = setTimeout(() => {
      const i = loopNum % words.length;
      const fullText = words[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingDelay(deletingSpeed);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingDelay(typingSpeed);
      }

      if (!isDeleting && text === fullText) {
        setTypingDelay(pauseDuration);
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingDelay(500);
      }
    }, typingDelay);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingDelay, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-mono tracking-[0.2em] uppercase text-cyan-400">{children}</span>
      <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
    </div>
  );
}

type ColorType = "cyan" | "violet" | "fuchsia";
function GlowDot({ color = "cyan" }: { color?: ColorType }) {
  const colors: Record<ColorType, string> = { 
    cyan: "bg-cyan-400", 
    violet: "bg-violet-400", 
    fuchsia: "bg-fuchsia-400" 
  };
  return <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors[color]} mr-2 animate-pulse`} />;
}

/* Flag SVG Microcomponents */
function FlagHU() {
  return (
    <svg className="w-5 h-3.5 rounded-sm overflow-hidden object-cover shadow-sm border border-white/10" viewBox="0 0 6 4">
      <rect width="6" height="1.33" fill="#ce2939" />
      <rect width="6" height="1.33" y="1.33" fill="#fff" />
      <rect width="6" height="1.33" y="2.66" fill="#477050" />
    </svg>
  );
}

function FlagEN() {
  return (
    <svg className="w-5 h-3.5 rounded-sm overflow-hidden object-cover shadow-sm border border-white/10" viewBox="0 0 60 30">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z"/>
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#s)"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  content: ContentStructure;
}

function Navbar({ lang, setLang, content }: NavbarProps) {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (index: number) => {
    const rawLinks = ["about", "skills", "projects", "contact"];
    document.getElementById(rawLinks[index])?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const toggleLang = () => {
    const nextLang = lang === "en" ? "hu" : "en";
    setLang(nextLang);
    localStorage.setItem("portfolio-lang", nextLang);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-[0_0_40px_rgba(6,182,212,0.05)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.a
            href="#"
            className="font-mono text-sm font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-cyan-400">&lt;</span>
            <span className="text-white">PORTFOLIO</span>
            <span className="text-cyan-400">/&gt;</span>
          </motion.a>

          <nav className="hidden md:flex items-center gap-8">
            {content.nav.map((link, i) => (
              <button
                key={link}
                onClick={() => scrollTo(i)}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium relative group"
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {[
              { href: PORTFOLIO_DATA.social.github, Icon: FaGithub },
              { href: PORTFOLIO_DATA.social.linkedin, Icon: FaLinkedin },
              { href: PORTFOLIO_DATA.social.email, Icon: Mail },
            ].map(({ href, Icon }) => (
              <motion.a
                key={href}
                href={href}
                whileHover={{ scale: 1.15, color: "#22d3ee" }}
                className="text-slate-400 hover:text-cyan-400 transition-colors p-1.5"
                target="_blank"
                rel="noreferrer"
              >
                <Icon size={17} />
              </motion.a>
            ))}
            
            {/* Language Switcher Button right after the Email Icon */}
            <motion.button
              onClick={toggleLang}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="ml-1 p-1.5 flex items-center justify-center focus:outline-none"
              title={lang === "en" ? "Switch to Hungarian" : "Váltás Angolra"}
            >
              {lang === "hu" ? <FlagHU /> : <FlagEN />}
            </motion.button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button onClick={toggleLang} className="p-1.5">
              {lang === "hu" ? <FlagHU /> : <FlagEN />}
            </button>
            <button
              className="text-slate-400 hover:text-white"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {content.nav.map((link, i) => (
              <button
                key={link}
                onClick={() => scrollTo(i)}
                className="text-2xl font-bold text-slate-300 hover:text-white transition-colors"
              >
                {link}
              </button>
            ))}
            <div className="flex gap-6 mt-4">
              {[
                { href: PORTFOLIO_DATA.social.github, Icon: FaGithub },
                { href: PORTFOLIO_DATA.social.linkedin, Icon: FaLinkedin },
                { href: PORTFOLIO_DATA.social.email, Icon: Mail },
              ].map(({ href, Icon }) => (
                <a key={href} href={href} className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO 
───────────────────────────────────────────────────────────── */
function Hero({ content }: { content: ContentStructure }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const typedTitle = useTypewriter(content.titles);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-fuchsia-600/5 blur-[150px]" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={fadeUp} className="flex items-center gap-2">
                <GlowDot color="cyan" />
                <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                  {content.availability}
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                <span className="text-white">{content === DICTIONARY.hu ? "Szia, " : "Hi, I'm "}</span>
                <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {PORTFOLIO_DATA.name}
                </span>
                {content === DICTIONARY.hu && <span className="text-white"> vagyok</span>}
                <br />
                <span className="text-slate-300 text-3xl sm:text-5xl lg:text-5xl font-bold inline-block mt-2 min-h-[1.2em]">
                  {typedTitle}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-[4px] h-[0.9em] bg-cyan-400 ml-2 align-baseline translate-y-1"
                  />
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-lg leading-relaxed mt-4">
                {content.tagline}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
                <motion.button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative px-7 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-shadow duration-300"
                >
                  {content.labels.viewWork}
                  <ArrowUpRight size={16} className="inline ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>

                <motion.a
                  href={PORTFOLIO_DATA.cvUrl}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                >
                  <Download size={15} />
                  {content.labels.downloadCv}
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Orbital Atom Core with Non-Rotating Horizontal Text Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center h-[380px] sm:h-[420px]"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px] flex items-center justify-center">
              
              {/* Outer Ring - React */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-cyan-500/20"
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ top: "0%", left: "50%", transform: "translate(15px, -50%)" }}
                  className="absolute flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold backdrop-blur-sm shadow-lg border-cyan-500/40 text-cyan-400 bg-cyan-500/10 whitespace-nowrap origin-center"
                >
                  <Code2 size={10} />
                  React
                </motion.div>
              </motion.div>

              {/* Middle Ring - TypeScript */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-violet-500/25"
              >
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_10px_#a78bfa]" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                  style={{ top: "50%", right: "0%", transform: "translate(calc(100% + 8px), -50%)" }}
                  className="absolute flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold backdrop-blur-sm shadow-lg border-violet-500/40 text-violet-400 bg-violet-500/10 whitespace-nowrap origin-center"
                >
                  <Layers size={10} />
                  TS
                </motion.div>
              </motion.div>

              {/* Inner Ring - C# */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                className="absolute inset-16 rounded-full border border-fuchsia-500/30"
              >
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_#e879f9]" />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                  style={{ bottom: "0%", left: "50%", transform: "translate(12px, 50%)" }}
                  className="absolute flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold backdrop-blur-sm shadow-lg border-fuchsia-500/40 text-fuchsia-400 bg-fuchsia-500/10 whitespace-nowrap origin-center"
                >
                  <Cpu size={10} />
                  C#
                </motion.div>
              </motion.div>

              {/* Central Cap */}
              <div className="absolute w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] z-10">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-4xl sm:text-5xl font-black bg-gradient-to-br from-cyan-400 to-violet-400 bg-clip-text text-transparent"
                >
                  {PORTFOLIO_DATA.name.split(" ").map((n) => n[0]).join("")}
                </motion.div>
              </div>

            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">{content.labels.scroll}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-slate-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────────── */
function About({ content }: { content: ContentStructure }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-28 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.div variants={fadeUp}>
              <SectionLabel>{content.labels.about}</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
                {content.labels.aboutHeading}
                <br />
                <span className="text-slate-400">{content.labels.aboutSubheading}</span>
              </h2>
              <p className="text-slate-400 text-base leading-loose mb-8">
                {content.about.bio}
              </p>
              <div className="flex flex-wrap gap-3">
                {content.about.highlights.map((h) => (
                  <span
                    key={h}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 font-medium"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
            {[
              { value: "3+", label: content.labels.experience, Icon: Zap, color: "cyan" as const },
              { value: "15+", label: content.labels.shipped, Icon: Globe, color: "violet" as const },
              { value: "500+", label: content.labels.stars, Icon: Sparkles, color: "fuchsia" as const },
              { value: "100%", label: content.labels.satisfaction, Icon: Cpu, color: "cyan" as const },
            ].map(({ value, label, Icon, color }) => {
              const glow = {
                cyan: "shadow-[0_0_30px_rgba(6,182,212,0.08)] hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] border-cyan-500/20",
                violet: "shadow-[0_0_30px_rgba(139,92,246,0.08)] hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] border-violet-500/20",
                fuchsia: "shadow-[0_0_30px_rgba(217,70,239,0.08)] hover:shadow-[0_0_40px_rgba(217,70,239,0.15)] border-fuchsia-500/20",
              };
              const iconColor = { cyan: "text-cyan-400", violet: "text-violet-400", fuchsia: "text-fuchsia-400" };
              const valColor = { cyan: "text-cyan-400", violet: "text-violet-400", fuchsia: "text-fuchsia-400" };
              return (
                <motion.div
                  key={label}
                  whileHover={{ y: -4 }}
                  className={`relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border transition-all duration-300 ${glow[color]}`}
                >
                  <Icon size={20} className={`mb-3 ${iconColor[color]}`} />
                  <div className={`text-3xl font-black mb-1 ${valColor[color]}`}>{value}</div>
                  <div className="text-xs text-slate-500 font-medium">{label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────────────────────── */
function Skills({ content }: { content: ContentStructure }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  type CategoryKey = keyof typeof PORTFOLIO_DATA.skills;
  const categoryConfig: Record<CategoryKey, { Icon: React.ElementType, color: ColorType, glow: string, accent: string }> = {
    Frontend: { Icon: Code2, color: "cyan", glow: "rgba(6,182,212,0.15)", accent: "#22d3ee" },
    Backend: { Icon: Database, color: "violet", glow: "rgba(139,92,246,0.15)", accent: "#a78bfa" },
    Tools: { Icon: Terminal, color: "fuchsia", glow: "rgba(217,70,239,0.15)", accent: "#e879f9" },
  };

  return (
    <section id="skills" ref={ref} className="py-28 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <SectionLabel>{content.labels.skills}</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              {content.labels.skillsHeading}<span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">{content.labels.skillsSubheading}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {(Object.entries(PORTFOLIO_DATA.skills) as [CategoryKey, Skill[]][]).map(([category, skills]) => {
              const { Icon, color, glow, accent } = categoryConfig[category];
              const borderColor = { cyan: "border-cyan-500/20", violet: "border-violet-500/20", fuchsia: "border-fuchsia-500/20" };
              const textColor = { cyan: "text-cyan-400", violet: "text-violet-400", fuchsia: "text-fuchsia-400" };
              const barColor = { cyan: "from-cyan-500 to-cyan-300", violet: "from-violet-500 to-violet-300", fuchsia: "from-fuchsia-500 to-fuchsia-300" };

              return (
                <motion.div
                  key={category}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  style={{ boxShadow: `0 0 40px ${glow}` }}
                  className={`p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border ${borderColor[color]} transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg bg-white/5 ${textColor[color]}`}>
                      <Icon size={18} />
                    </div>
                    <h3 className="font-bold text-white">{category}</h3>
                  </div>

                  <div className="space-y-4">
                    {skills.map(({ name, level }, i) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.1 * i, duration: 0.5 }}
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm text-slate-300 font-medium">{name}</span>
                          <span className={`text-xs font-mono ${textColor[color]}`}>{level}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${level}%` } : {}}
                            transition={{ delay: 0.15 * i + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className={`h-full rounded-full bg-gradient-to-r ${barColor[color]}`}
                            style={{ boxShadow: `0 0 8px ${accent}60` }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────────────────────── */
function Projects({ content }: { content: ContentStructure }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="projects" ref={ref} className="py-28 relative">
      <div className="absolute right-0 top-0 w-96 h-96 bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-16">
            <div>
              <SectionLabel>{content.labels.work}</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-black text-white">
                {content.labels.projectsHeading}<span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">{content.labels.projectsSubheading}</span>
              </h2>
            </div>
            <a href="#" className="hidden sm:flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-medium">
              {content.labels.projectsViewAll} <ArrowUpRight size={15} />
            </a>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {content.projects.map((project, i) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm transition-all duration-300 hover:border-white/15"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} border-b border-white/5 overflow-hidden`}>
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
                  <div className="absolute top-4 left-4 right-4 h-7 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 flex items-center gap-2 px-3">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-400/60" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                      <div className="w-2 h-2 rounded-full bg-green-400/60" />
                    </div>
                    <div className="flex-1 h-3 rounded bg-white/10 mx-4" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] text-white/20 leading-relaxed select-none">
                    <div>const App = () =&gt; &#123;</div>
                    <div>&nbsp;&nbsp;return &lt;Dashboard /&gt;</div>
                    <div>&#125;</div>
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${project.accent}20, transparent 70%)` }}
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.a
                        href={project.demo}
                        whileHover={{ scale: 1.15 }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink size={14} />
                      </motion.a>
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.15 }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        title="GitHub"
                      >
                        <FaGithub size={14} />
                      </motion.a>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs font-mono border border-white/10 text-slate-400 bg-white/[0.03]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────────── */
function Contact({ content }: { content: ContentStructure }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contact" ref={ref} className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-gradient-to-r from-violet-600/10 via-cyan-600/10 to-fuchsia-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp}>
            <SectionLabel>{content.labels.contact}</SectionLabel>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
            {content.labels.contactHeading}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {content.labels.contactSubheading}
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {content.labels.contactText}
          </motion.p>

          <motion.a
            variants={fadeUp}
            href={PORTFOLIO_DATA.social.email}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] transition-shadow duration-300 mb-12"
          >
            <Mail size={18} />
            {PORTFOLIO_DATA.email}
            <ArrowUpRight size={16} />
          </motion.a>

          <motion.div variants={fadeUp} className="flex justify-center gap-4">
            {[
              { href: PORTFOLIO_DATA.social.github, Icon: FaGithub, label: "GitHub" },
              { href: PORTFOLIO_DATA.social.linkedin, Icon: FaLinkedin, label: "LinkedIn" },
              { href: PORTFOLIO_DATA.social.email, Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4, scale: 1.05 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] text-slate-400 hover:text-white hover:border-white/15 transition-all duration-300 min-w-[80px]"
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-24 border-t border-white/5 pt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 pb-8">
          <span className="font-mono text-sm text-slate-600">
            <span className="text-cyan-600">&lt;</span>
            {PORTFOLIO_DATA.name}
            <span className="text-cyan-600">/&gt;</span>
          </span>
          <span className="text-xs text-slate-600">
            © {new Date().getFullYear()} · Designed & built with React + Tailwind + TypeScript
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("hu");

  useEffect(() => {
    // Check local preference first, fallback to browser tracking system
    const savedLang = localStorage.getItem("portfolio-lang") as Lang | null;
    if (savedLang === "en" || savedLang === "hu") {
      setLang(savedLang);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("hu")) {
        setLang("hu");
      } else {
        setLang("en");
      }
    }
  }, []);

  const content = DICTIONARY[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased selection:bg-cyan-500/30 selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      <Navbar lang={lang} setLang={setLang} content={content} />
      <main>
        <Hero content={content} />
        <About content={content} />
        <Skills content={content} />
        <Projects content={content} />
        <Contact content={content} />
      </main>
    </div>
  );
}