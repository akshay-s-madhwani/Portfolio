import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Check,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  Eye,
  Github,
  Linkedin,
  Mail,
  Menu,
  Star,
  Users,
  X,
  Zap
} from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-[#0B0F17]/90 backdrop-blur-md border-b border-[rgba(244,246,255,0.05)]' : 'bg-transparent'}`}>
      <div className="flex items-center justify-between px-[5vw] md:px-[7vw] py-4 md:py-5">
        <div className="font-heading font-semibold text-slate-light text-base md:text-lg tracking-tight">
          Akshay S. Madhwani
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-slate-light p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('work')} className="text-sm text-slate-text hover:text-slate-light transition-colors">Work</button>
          <button onClick={() => scrollTo('testimonials')} className="text-sm text-slate-text hover:text-slate-light transition-colors">Testimonials</button>
          <button onClick={() => scrollTo('about')} className="text-sm text-slate-text hover:text-slate-light transition-colors">About</button>
          <button onClick={() => scrollTo('contact')} className="text-sm text-slate-text hover:text-slate-light transition-colors">Contact</button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0B0F17]/95 backdrop-blur-md border-b border-[rgba(244,246,255,0.05)] px-[5vw] py-4">
          <div className="flex flex-col gap-4">
            <button onClick={() => scrollTo('work')} className="text-left text-slate-text hover:text-slate-light transition-colors py-2">Work</button>
            <button onClick={() => scrollTo('testimonials')} className="text-left text-slate-text hover:text-slate-light transition-colors py-2">Testimonials</button>
            <button onClick={() => scrollTo('about')} className="text-left text-slate-text hover:text-slate-light transition-colors py-2">About</button>
            <button onClick={() => scrollTo('contact')} className="text-left text-slate-text hover:text-slate-light transition-colors py-2">Contact</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftContent = leftContentRef.current;
    const rightCard = rightCardRef.current;
    const bg = bgRef.current;
    if (!section || !leftContent || !rightCard || !bg) return;
    
    const ctx = gsap.context(() => {
      // Load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      loadTl
        .fromTo(bg, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.2 })
        .fromTo(leftContent.querySelector('.meta-label'), { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.2)
        .fromTo(leftContent.querySelectorAll('.hero-word'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06 }, 0.3)
        .fromTo(leftContent.querySelector('.hero-body'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.5)
        .fromTo(leftContent.querySelector('.hero-ctas'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.6)
        .fromTo(rightCard, { x: '8vw', opacity: 0, scale: 0.98 }, { x: 0, opacity: 1, scale: 1, duration: 0.8 }, 0.4)
        .fromTo(rightCard.querySelectorAll('.metric-chip'), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 0.7);
      
      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            gsap.set([leftContent, rightCard, bg], { clearProps: 'all' });
            loadTl.progress(1);
          }
        }
      });
      
      // Exit phase (70%-100%)
      scrollTl
        .fromTo(leftContent, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(rightCard, { x: 0, opacity: 1 }, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(bg, { scale: 1, opacity: 1 }, { scale: 1.08, opacity: 0.6, ease: 'power2.in' }, 0.7);
        
    }, section);
    
    return () => ctx.revert();
  }, []);
  
  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section ref={sectionRef} className="section-pinned z-10">
      <div ref={bgRef} className="absolute inset-0">
        <img 
          src="/Portfolio/hero_city_bg.jpg" 
          alt="City skyline" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(11,15,23,0.72)]" />
      </div>
      
      <div className="relative h-full flex items-center">
        {/* Left Content */}
        <div ref={leftContentRef} className="absolute left-[5vw] md:left-[7vw] top-[15vh] md:top-[18vh] w-[90vw] md:w-[46vw] max-w-[600px]">
          <p className="meta-label mb-4 md:mb-6">Senior Full Stack Engineer</p>
          <h1 className="font-heading font-bold text-slate-light leading-[0.95] tracking-[-0.02em] text-[clamp(32px,8vw,76px)] md:text-[clamp(44px,5.2vw,76px)] mb-6 md:mb-8">
            <span className="hero-word block">I build systems</span>
            <span className="hero-word block">that scale.</span>
          </h1>
          <p className="hero-body text-slate-text text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-[480px]">
            MERN stack, React Native, and cloud-native automation—designed for performance, built for real users.
          </p>
          <div className="hero-ctas flex flex-wrap gap-3 md:gap-4">
            <button onClick={scrollToWork} className="btn-primary flex items-center gap-2 text-sm md:text-base">
              View selected work <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" />
            </button>
            <a href="mailto:akshayssmadhwani@gmail.com" className="btn-secondary flex items-center gap-2 text-sm md:text-base">
              <Mail size={16} className="md:w-[18px] md:h-[18px]" /> Get in touch
            </a>
          </div>
        </div>
        
        {/* Right Info Card - Hidden on mobile, shown on larger screens */}
        <div ref={rightCardRef} className="hidden md:block absolute right-[6vw] top-[22vh] w-[34vw] max-w-[420px] card-frame p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-indigo-glow to-indigo-soft flex items-center justify-center text-white font-heading font-bold text-lg md:text-xl">
              AM
            </div>
            <div>
              <h3 className="font-heading font-semibold text-slate-light text-base md:text-lg">Akshay S. Madhwani</h3>
              <p className="text-slate-text text-xs md:text-sm">New Delhi, India</p>
            </div>
          </div>
          <p className="text-slate-text mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
            Currently leading product engineering at Earnpati, building fintech solutions that serve 10,000+ active users.
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <div className="metric-chip px-3 md:px-4 py-2 bg-[rgba(79,109,245,0.1)] border border-[rgba(79,109,245,0.2)] rounded-lg">
              <span className="font-heading font-bold text-indigo-glow text-base md:text-lg">6+</span>
              <span className="text-slate-text text-xs ml-1">Years</span>
            </div>
            <div className="metric-chip px-3 md:px-4 py-2 bg-[rgba(79,109,245,0.1)] border border-[rgba(79,109,245,0.2)] rounded-lg">
              <span className="font-heading font-bold text-indigo-glow text-base md:text-lg">10k+</span>
              <span className="text-slate-text text-xs ml-1">Users</span>
            </div>
            <div className="metric-chip px-3 md:px-4 py-2 bg-[rgba(79,109,245,0.1)] border border-[rgba(79,109,245,0.2)] rounded-lg">
              <span className="font-heading font-bold text-indigo-glow text-base md:text-lg">50+</span>
              <span className="text-slate-text text-xs ml-1">Bots</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Capability Section Component (reusable for Mobile, Automation, Cloud)
interface CapabilitySectionProps {
  id?: string;
  zIndex: number;
  meta: string;
  headline: string;
  body: string;
  bullets: { label: string; desc: string }[];
  bgImage: string;
  layout: 'left' | 'right';
}

function CapabilitySection({ id, zIndex, meta, headline, body, bullets, bgImage, layout }: CapabilitySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const image = imageRef.current;
    const bg = bgRef.current;
    if (!section || !card || !image || !bg) return;
    
    // Check if mobile
    const isMobile = window.innerWidth < 768;
    
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });
      
      // Mobile animations (simpler)
      if (isMobile) {
        scrollTl
          .fromTo(card, { y: '30vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(image, { y: '20vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);
      } else {
        // Desktop animations
        if (layout === 'left') {
          scrollTl
            .fromTo(card, { x: '-55vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
            .fromTo(card.querySelector('.glow-bar'), { scaleY: 0.2, opacity: 0 }, { scaleY: 1, opacity: 1, ease: 'none' }, 0.06)
            .fromTo(card.querySelectorAll('.card-text > *'), { x: '-6vw', opacity: 0 }, { x: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 0.1)
            .fromTo(image, { x: '55vw', opacity: 0, scale: 0.96 }, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0.08);
        } else {
          scrollTl
            .fromTo(image, { x: '-55vw', opacity: 0, scale: 0.96 }, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0)
            .fromTo(card, { x: '55vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.06)
            .fromTo(card.querySelector('.glow-bar'), { scaleY: 0.2, opacity: 0 }, { scaleY: 1, opacity: 1, ease: 'none' }, 0.1)
            .fromTo(card.querySelectorAll('.card-text > *'), { x: '4vw', opacity: 0 }, { x: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 0.12);
        }
      }
      
      // Exit
      if (isMobile) {
        scrollTl
          .fromTo(card, { y: 0, opacity: 1 }, { y: '-15vh', opacity: 0, ease: 'power2.in' }, 0.7)
          .fromTo(image, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7);
      } else {
        if (layout === 'left') {
          scrollTl
            .fromTo(card, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
            .fromTo(image, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
        } else {
          scrollTl
            .fromTo(image, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
            .fromTo(card, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
        }
      }
      scrollTl.fromTo(bg, { scale: 1, opacity: 1 }, { scale: 1.06, opacity: 0.6, ease: 'power2.in' }, 0.7);
      
    }, section);
    
    return () => ctx.revert();
  }, [layout]);
  
  return (
    <section ref={sectionRef} id={id} className="section-pinned" style={{ zIndex }}>
      <div ref={bgRef} className="absolute inset-0">
        <img src={bgImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[rgba(11,15,23,0.68)]" />
      </div>
      
      <div className="relative h-full flex flex-col md:flex-row items-center justify-center md:justify-start py-[10vh] md:py-0">
        {/* Card */}
        <div 
          ref={cardRef} 
          className={`relative md:absolute mx-[5vw] md:mx-0 mb-4 md:mb-0 w-[90vw] md:w-[44vw] max-w-[540px] md:h-auto md:max-h-[520px] card-frame p-5 md:p-8 flex ${layout === 'right' ? 'md:right-[7vw] md:top-[18vh]' : 'md:left-[7vw] md:top-[18vh]'}`}
        >
          <div className="hidden md:block glow-bar w-3 h-[80%] rounded-full self-center mr-6 origin-center" />
          <div className="card-text flex-1 flex flex-col justify-center">
            <p className="meta-label mb-3 md:mb-4 text-xs">{meta}</p>
            <h2 className="font-heading font-bold text-slate-light text-[clamp(28px,6vw,52px)] md:text-[clamp(34px,3.6vw,52px)] leading-[1.05] mb-4 md:mb-6">
              {headline}
            </h2>
            <p className="text-slate-text leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
              {body}
            </p>
            <div className="space-y-3 md:space-y-4">
              {bullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-2 md:gap-3">
                  <span className="font-mono text-xs text-indigo-glow uppercase tracking-wider mt-0.5 md:mt-1 flex-shrink-0">{bullet.label}</span>
                  <span className="text-slate-text text-xs md:text-sm">{bullet.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Image Tile - Hidden on mobile */}
        <div 
          ref={imageRef}
          className={`hidden md:block absolute top-[26vh] w-[38vw] max-w-[480px] h-[48vh] max-h-[380px] rounded-2xl overflow-hidden border border-[rgba(244,246,255,0.08)] ${layout === 'right' ? 'left-[7vw]' : 'right-[7vw]'}`}
        >
          <img src={bgImage} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const gallery = galleryRef.current;
    if (!section || !card || !gallery) return;
    
    const isMobile = window.innerWidth < 768;
    
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });
      
      // Entrance
      if (isMobile) {
        scrollTl
          .fromTo(card, { y: '25vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(gallery.querySelectorAll('.project-card'), { y: '20vh', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, ease: 'none' }, 0.1);
      } else {
        scrollTl
          .fromTo(card, { x: '-55vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(card.querySelector('.glow-bar'), { scaleY: 0.2, opacity: 0 }, { scaleY: 1, opacity: 1, ease: 'none' }, 0.08)
          .fromTo(gallery.querySelectorAll('.project-card'), { x: '55vw', opacity: 0, scale: 0.98 }, { x: 0, opacity: 1, scale: 1, stagger: 0.04, ease: 'none' }, 0.1);
      }
      
      // Exit
      if (isMobile) {
        scrollTl
          .fromTo(card, { y: 0, opacity: 1 }, { y: '-15vh', opacity: 0, ease: 'power2.in' }, 0.7)
          .fromTo(gallery.querySelectorAll('.project-card'), { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, stagger: 0.03, ease: 'power2.in' }, 0.7);
      } else {
        scrollTl
          .fromTo(card, { x: 0, opacity: 1 }, { x: '-14vw', opacity: 0, ease: 'power2.in' }, 0.7)
          .fromTo(gallery.querySelectorAll('.project-card'), { x: 0, opacity: 1 }, { x: '14vw', opacity: 0, stagger: 0.03, ease: 'power2.in' }, 0.7);
      }
        
    }, section);
    
    return () => ctx.revert();
  }, []);
  
  const projects = [
    {
      name: 'Earnpati',
      desc: 'Fintech affiliate platform',
      tech: 'MERN + React Native • 10k+ users • 4.8★',
      image: '/Portfolio/project_thumb_earn.jpg',
      link: 'https://play.google.com/store/search?q=earnpati&c=apps&hl=en_IN'
    },
    {
      name: 'OSD Hongkong',
      desc: 'Bulk messaging + WhatsApp commerce',
      tech: '50 parallel bots • K8s orchestration',
      image: '/Portfolio/project_thumb_osd.jpg'
    },
    {
      name: 'iRide',
      desc: 'Logistics tracking app',
      tech: '10k+ riders • distance + cost engine',
      image: '/Portfolio/project_thumb_iride.jpg'
    }
  ];
  
  return (
    <section ref={sectionRef} id="work" className="section-pinned z-50">
      <div className="absolute inset-0 bg-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(79,109,245,0.10),transparent_55%)]" />
      </div>
      
      <div className="relative h-full flex flex-col md:flex-row items-center justify-center md:justify-start py-[8vh] md:py-0">
        {/* Left Card */}
        <div ref={cardRef} className="relative md:absolute mx-[5vw] md:mx-0 mb-4 md:mb-0 w-[90vw] md:w-[40vw] max-w-[480px] md:h-auto md:max-h-[520px] card-frame p-5 md:p-8 flex md:left-[7vw] md:top-[18vh]">
          <div className="hidden md:block glow-bar w-3 h-[80%] rounded-full self-center mr-6 origin-center" />
          <div className="flex-1 flex flex-col justify-center">
            <p className="meta-label mb-3 md:mb-4 text-xs">Selected Work</p>
            <h2 className="font-heading font-bold text-slate-light text-[clamp(28px,6vw,52px)] md:text-[clamp(34px,3.6vw,52px)] leading-[1.05] mb-4 md:mb-6">
              Projects that shipped.
            </h2>
            <p className="text-slate-text leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
              A few highlights from the past few years—products built from zero to production, handling real users and real scale.
            </p>
            <div className="flex items-center gap-2 text-indigo-glow">
              <Code2 size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="font-mono text-xs md:text-sm">Full-stack • Mobile • Automation</span>
            </div>
          </div>
        </div>
        
        {/* Right Gallery */}
        <div ref={galleryRef} className="relative md:absolute mx-[5vw] md:mx-0 w-[90vw] md:w-[42vw] max-w-[520px] flex flex-col gap-3 md:gap-[2.2vh] md:right-[7vw] md:top-[18vh]">
          {projects.map((project, i) => (
            <div 
              key={i} 
              className="project-card flex-1 card-frame overflow-hidden flex items-center gap-3 md:gap-5 p-3 md:px-5 md:py-4 group cursor-pointer hover:border-[rgba(79,109,245,0.3)] transition-colors"
              onClick={() => project.link && window.open(project.link, '_blank')}
            >
              <div className="w-16 h-12 md:w-24 md:h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img src={project.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-slate-light text-sm md:text-lg mb-0.5 md:mb-1">{project.name}</h3>
                <p className="text-slate-text text-xs md:text-sm mb-0.5 md:mb-1">{project.desc}</p>
                <p className="font-mono text-[10px] md:text-xs text-indigo-glow">{project.tech}</p>
              </div>
              {project.link ? (
                <ExternalLink className="text-slate-text group-hover:text-indigo-glow transition-colors flex-shrink-0" size={16} />
              ) : (
                <ChevronRight className="text-slate-text group-hover:text-indigo-glow group-hover:translate-x-1 transition-all flex-shrink-0" size={16} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section with real reviews
function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(content.querySelector('.heading-block'), 
        { y: 24, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          scrollTrigger: {
            trigger: content.querySelector('.heading-block'),
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo(content.querySelectorAll('.review-card'), 
        { y: 18, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: content.querySelector('.reviews-grid'),
            start: 'top 75%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );
      
    }, section);
    
    return () => ctx.revert();
  }, []);
  
  const reviews = [
    {
      name: 'Milton V.',
      location: 'Araçatuba, Brazil',
      project: 'Bug Fix (Bot on telegram)',
      rating: 5,
      text: 'Excellent Freelancer, i will hire again absolutely!',
      skills: ['PHP', 'JavaScript', 'Node.js', 'MongoDB']
    },
    {
      name: 'Former Client',
      location: '',
      project: 'Data science / Clustering Algorithms',
      rating: 5,
      text: 'A programmer who knows what he is doing and is aware of everything. If you need solutions hire him 100% recommended',
      skills: ['Python', 'Data Science']
    },
    {
      name: 'Former Client',
      location: '',
      project: 'Import JSON data',
      rating: 5,
      text: 'Responsible person with incredible skills, gives you solutions instantly',
      skills: ['JavaScript']
    },
    {
      name: 'Michael D.',
      location: 'Wicklow Town, Ireland',
      project: 'Web Scraping Tool',
      rating: 5,
      text: 'Great hard working freelancer, will work with again',
      skills: ['Web Scraping', 'Selenium', 'AWS']
    },
    {
      name: 'Former Client',
      location: '',
      project: 'JSON file for Python',
      rating: 5,
      text: 'He is a LEGEND... it is hard to find good people like this guy here, he is very hardworking and helped me in every detail of what I needed',
      skills: ['Python']
    },
    {
      name: 'Mariano M.',
      location: '',
      project: 'Chrome Extension for WhatsApp',
      rating: 5,
      text: 'Es un programador excelente, rápido y creativo. Entendió perfectamente lo que necesitaba y logró resolverlo. Un gran profesional!',
      skills: ['JavaScript', 'Chrome Extension']
    }
  ];
  
  return (
    <section ref={sectionRef} id="testimonials" className="relative bg-navy-900 py-[10vh] md:py-[12vh] z-60">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(79,109,245,0.08),transparent_50%)]" />
      
      <div ref={contentRef} className="relative px-[5vw] md:px-[7vw]">
        <div className="heading-block mb-10 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-500 fill-yellow-500" size={18} />
              ))}
            </div>
            <span className="font-heading font-bold text-slate-light">5.0</span>
            <span className="text-slate-text text-sm">• 12 Reviews</span>
          </div>
          <h2 className="font-heading font-bold text-slate-light text-[clamp(28px,6vw,52px)] md:text-[clamp(34px,3.6vw,52px)] leading-[1.05] mb-4">
            Client testimonials.
          </h2>
          <p className="text-slate-text text-base md:text-lg max-w-[500px]">
            Real feedback from real clients. 100% on-time, 100% on-budget delivery record.
          </p>
        </div>
        
        <div className="reviews-grid grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="review-card card-frame p-4 md:p-6 hover:border-[rgba(79,109,245,0.2)] transition-colors">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="text-yellow-500 fill-yellow-500" size={12} />
                ))}
              </div>
              <p className="text-slate-light text-sm md:text-base leading-relaxed mb-4">
                "{review.text}"
              </p>
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4">
                {review.skills.map((skill, k) => (
                  <span key={k} className="px-2 py-0.5 bg-[rgba(79,109,245,0.1)] text-indigo-glow text-[10px] md:text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading font-semibold text-slate-light text-sm">{review.name}</p>
                  {review.location && <p className="text-slate-text text-xs">{review.location}</p>}
                </div>
                <span className="text-slate-text/60 text-xs">{review.project}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Freelancer Profile Link */}
        <div className="mt-8 md:mt-12 text-center">
          <a 
            href="https://www.freelancer.in/u/asmadhwani" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-indigo-glow hover:text-slate-light transition-colors text-sm md:text-base"
          >
            View full profile on Freelancer <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

// About Section (flowing)
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(content.querySelector('.heading-block'), 
        { y: 24, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          scrollTrigger: {
            trigger: content.querySelector('.heading-block'),
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo(content.querySelectorAll('.principle-item'), 
        { y: 18, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: content.querySelector('.principles-grid'),
            start: 'top 75%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo(content.querySelector('.background-card'), 
        { y: 28, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          scrollTrigger: {
            trigger: content.querySelector('.background-card'),
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          }
        }
      );
      
    }, section);
    
    return () => ctx.revert();
  }, []);
  
  const principles = [
    {
      icon: Zap,
      title: 'Own the outcome',
      desc: "I don't just write tickets—I ship, measure, and iterate."
    },
    {
      icon: Eye,
      title: 'Keep it observable',
      desc: 'Logs, metrics, and alerts are part of the feature.'
    },
    {
      icon: Users,
      title: 'Optimize for the team',
      desc: 'Clear state, clean APIs, and documentation that ages well.'
    }
  ];
  
  return (
    <section ref={sectionRef} id="about" className="relative bg-navy-900 py-[10vh] md:py-[12vh] z-70">
      <div ref={contentRef} className="px-[5vw] md:px-[7vw]">
        <div className="heading-block mb-10 md:mb-16">
          <p className="meta-label mb-3 md:mb-4">About</p>
          <h2 className="font-heading font-bold text-slate-light text-[clamp(28px,6vw,52px)] md:text-[clamp(34px,3.6vw,52px)] leading-[1.05] mb-4">
            How I work
          </h2>
          <p className="text-slate-text text-base md:text-lg max-w-[500px]">
            A few principles that keep projects predictable and teams moving fast.
          </p>
        </div>
        
        <div className="principles-grid grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
          {principles.map((principle, i) => (
            <div key={i} className="principle-item">
              <div className="w-10 h-10 rounded-lg bg-[rgba(79,109,245,0.1)] border border-[rgba(79,109,245,0.2)] flex items-center justify-center mb-4 md:mb-5">
                <principle.icon className="text-indigo-glow" size={18} />
              </div>
              <h3 className="font-heading font-semibold text-slate-light text-lg md:text-xl mb-2 md:mb-3">{principle.title}</h3>
              <p className="text-slate-text text-sm md:text-base leading-relaxed">{principle.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="background-card card-frame p-5 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          <div className="flex-1">
            <p className="meta-label mb-3 md:mb-4">Background</p>
            <p className="text-slate-light text-base md:text-lg mb-3 md:mb-4">
              B.Com (Business Administration) — Delhi University
            </p>
            <p className="text-slate-text text-sm md:text-base leading-relaxed">
              Self-taught engineer with a business mindset. I understand that code is a means to an end—solving real problems for real people. This perspective helps me prioritize what matters and ship faster.
            </p>
          </div>
          <div className="w-full md:w-[280px] h-[160px] md:h-[200px] rounded-xl overflow-hidden">
            <img src="/Portfolio/about_office.jpg" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section (flowing)
function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  
  const copyEmail = () => {
    navigator.clipboard.writeText('akshayssmadhwani@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelector('.contact-card'), 
        { x: '-6vw', opacity: 0 },
        { 
          x: 0, 
          opacity: 1,
          scrollTrigger: {
            trigger: section.querySelector('.contact-card'),
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo(section.querySelector('.closing-text'), 
        { x: '6vw', opacity: 0 },
        { 
          x: 0, 
          opacity: 1,
          scrollTrigger: {
            trigger: section.querySelector('.closing-text'),
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          }
        }
      );
      
    }, section);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={sectionRef} id="contact" className="relative bg-navy-900 py-[10vh] md:py-[12vh] z-80">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(79,109,245,0.08),transparent_50%)]" />
      
      <div className="relative px-[5vw] md:px-[7vw]">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
          {/* Contact Card */}
          <div className="contact-card card-frame p-5 md:p-8 w-full lg:w-[44vw] max-w-[520px]">
            <div className="flex items-start gap-4 md:gap-6">
              <div className="hidden md:block glow-bar w-3 h-24 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <h2 className="font-heading font-bold text-slate-light text-[clamp(28px,6vw,52px)] md:text-[clamp(34px,3.6vw,52px)] leading-[1.05] mb-4">
                  Let's build something solid.
                </h2>
                <p className="text-slate-text leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                  If you need a product engineer who can lead, ship, and scale—let's talk.
                </p>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  <button onClick={copyEmail} className="btn-primary flex items-center gap-2 text-sm md:text-base">
                    {copied ? <Check size={16} className="md:w-[18px] md:h-[18px]" /> : <Copy size={16} className="md:w-[18px] md:h-[18px]" />}
                    {copied ? 'Copied!' : 'Copy email'}
                  </button>
                  <a 
                    href="https://www.freelancer.in/u/asmadhwani" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-secondary flex items-center gap-2 text-sm md:text-base"
                  >
                    <ExternalLink size={16} className="md:w-[18px] md:h-[18px]" /> Hire me on Freelancer
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Closing Text */}
          <div className="closing-text flex-1 pt-0 md:pt-8 w-full">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <Mail className="text-indigo-glow" size={18} />
              <a href="mailto:akshayssmadhwani@gmail.com" className="font-heading text-slate-light text-base md:text-xl hover:text-indigo-glow transition-colors break-all">
                akshayssmadhwani@gmail.com
              </a>
            </div>
            <p className="text-slate-text text-sm md:text-base mb-6 md:mb-8">
              Based in New Delhi, India. Open to remote opportunities worldwide. $20 USD/hour on Freelancer.
            </p>
            <div className="flex gap-3 md:gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[rgba(244,246,255,0.05)] border border-[rgba(244,246,255,0.1)] flex items-center justify-center text-slate-text hover:text-slate-light hover:border-[rgba(244,246,255,0.2)] transition-all">
                <Github size={16} className="md:w-[18px] md:h-[18px]" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[rgba(244,246,255,0.05)] border border-[rgba(244,246,255,0.1)] flex items-center justify-center text-slate-text hover:text-slate-light hover:border-[rgba(244,246,255,0.2)] transition-all">
                <Linkedin size={16} className="md:w-[18px] md:h-[18px]" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12 md:mt-20 pt-6 md:pt-8 border-t border-[rgba(244,246,255,0.05)] flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-slate-text text-xs md:text-sm">
            © 2026 Akshay S. Madhwani. All rights reserved.
          </p>
          
        </div>
      </div>
    </section>
  );
}

// Main App
function App() {
  useEffect(() => {
    // Global scroll snap for pinned sections
    const setupSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;
      
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));
      
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    };
    
    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupSnap, 500);
    
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
  
  return (
    <div className="relative bg-navy-900">
      <div className="grain-overlay" />
      <Navigation />
      
      <main className="relative">
        <HeroSection />
        
        <CapabilitySection
          zIndex={20}
          meta="Mobile Development"
          headline="Apps that feel instant."
          body="React Native, offline-first architecture, and state management that stays predictable as the product grows."
          bullets={[
            { label: 'Offline-first', desc: 'SQLite + queue-based sync' },
            { label: 'State', desc: 'Redux with durable persistence' },
            { label: 'Shipping', desc: 'Play Store releases + CI/CD' }
          ]}
          bgImage="/Portfolio/mobile_phone_bg.jpg"
          layout="left"
        />
        
        <CapabilitySection
          zIndex={30}
          meta="Automation & Data"
          headline="Automate the repetitive."
          body="Python pipelines, browser automation, and bot systems that handle concurrency without losing reliability."
          bullets={[
            { label: 'Scraping', desc: 'Proxy rotation + retry logic' },
            { label: 'Bots', desc: 'WhatsApp / Telegram orchestration' },
            { label: 'Delivery', desc: 'Clean exports + alerting' }
          ]}
          bgImage="/Portfolio/automation_desk_bg.jpg"
          layout="right"
        />
        
        <CapabilitySection
          zIndex={40}
          meta="Cloud & DevOps"
          headline="Concurrency, handled."
          body="Kubernetes-orchestrated services, caching layers, and monitoring that keeps the system predictable under load."
          bullets={[
            { label: 'Orchestration', desc: 'K8s + Docker' },
            { label: 'Caching', desc: 'Redis + optimized queries' },
            { label: 'Observability', desc: 'Logs, alerts, health checks' }
          ]}
          bgImage="/Portfolio/server_corridor_bg.jpg"
          layout="left"
        />
        
        <ProjectsSection />
        <TestimonialsSection />
        
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
