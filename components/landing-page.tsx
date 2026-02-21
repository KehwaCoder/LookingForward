"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  HandHeart,
  House,
  Mail,
  Phone,
  Shield,
  Users,
  Wifi
} from "lucide-react";
import { Logo } from "@/components/logo";

gsap.registerPlugin(ScrollTrigger);

type ReferralFormData = {
  referrerName: string;
  organization: string;
  email: string;
  phone: string;
  participantName: string;
  location: "Philadelphia/Delaware" | "Atlanta Metro";
  notes: string;
  consent: boolean;
};

const navItems = ["Who We Are", "Mission", "What We Provide", "Who We Serve", "Referral", "Contact"];

const provideCards = [
  ["Fully furnished shared and private bedrooms", "Starting at $750", House],
  ["Utilities Included", "Simple, all-in pricing", Building2],
  ["Drug- and alcohol-free environment", "Safety-focused setting", Shield],
  ["24/7 security surveillance", "Consistent peace of mind", Shield],
  ["Bed linens, kitchenware, and household essentials", "Move-in ready", CheckCircle2],
  ["Wi-Fi and onsite laundry included", "Daily essentials covered", Wifi],
  ["Furnished common living areas", "Community-centered spaces", Users],
  ["Structured program agreements", "Clear expectations", CheckCircle2],
  ["Quick and easy move-in process", "Fast support when needed", ArrowRight]
] as const;

function GlassButton({ children, href }: { children: string; href: string }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white/15 px-6 py-3 font-medium text-white shadow-glass transition duration-500 hover:-translate-y-1 hover:border-copper hover:shadow-copper"
    >
      <span className="absolute inset-0 -z-10 bg-gradient-to-r from-copper/60 via-copper/10 to-copper/60 opacity-0 transition group-hover:opacity-100" />
      {children}
    </a>
  );
}

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 30, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 30, stiffness: 300 });
  const heroRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ReferralFormData>();

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-reveal-group]",
          start: "top 75%"
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: ReferralFormData) => {
    const res = await fetch("/api/referral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const titleLetters = useMemo(
    () => "Help Clients Find Stability with Housing and Community Support".split(" "),
    []
  );

  return (
    <div className="snap-container relative overflow-hidden">
      <motion.div style={{ left: springX, top: springY }} className="custom-cursor hidden md:block" />

      <header className="fixed inset-x-4 top-4 z-50 rounded-2xl glass">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-3" aria-label="Looking Forward Home">
            <Logo className="h-auto w-36 sm:w-44" />
          </a>
          <button
            className="rounded-lg border border-white/30 p-2 text-white md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 bg-white transition ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`my-1 block h-0.5 w-5 bg-white transition ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
          <nav className="hidden gap-6 md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="text-sm text-white/90 transition hover:text-copper">
                {item}
              </a>
            ))}
          </nav>
        </div>
        {menuOpen && (
          <nav className="space-y-2 px-4 pb-4 md:hidden">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="block rounded-lg bg-white/10 px-3 py-2 text-sm">
                {item}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 pt-32">
        <section className="snap-section relative min-h-[75vh] pb-20" ref={heroRef}>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-copper-glow" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <p className="mb-4 font-[var(--font-libre)] text-xl italic text-white/90">A safe place to land — and move forward.</p>
            <h1 className="font-[var(--font-libre)] text-4xl leading-tight md:text-6xl">
              {titleLetters.map((word, idx) => (
                <motion.span
                  key={word + idx}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="mr-3 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/85">
              Serving Greater Philadelphia and Delaware, and the Atlanta Metropolitan Area
            </p>
            <div className="mt-2 h-1 w-40 rounded-full copper-underline" />
            <div className="mt-8 flex flex-wrap gap-4">
              <GlassButton href="#referral">Refer Someone</GlassButton>
              <GlassButton href="#who-we-are">Learn More</GlassButton>
            </div>
          </motion.div>
        </section>

        <section id="who-we-are" className="snap-section py-14" data-reveal-group>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div data-reveal className="glass rounded-3xl p-8">
              <h2 className="mb-4 font-[var(--font-libre)] text-4xl">Who We Are</h2>
              <p className="text-white/90">
                Landing Forward provides safe, structured housing programs for individuals experiencing or at risk of homelessness. Our program is rooted in dignity, respect, and community-building.
              </p>
            </div>
            <motion.img
              data-reveal
              whileHover={{ rotate: -1.5, scale: 1.02 }}
              src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80"
              alt="Supportive housing and community"
              className="h-[320px] w-full rounded-3xl object-cover shadow-glass"
            />
          </div>
        </section>

        <section id="mission" className="snap-section py-14 text-center" data-reveal-group>
          <div data-reveal className="glass rounded-3xl p-10">
            <h2 className="font-[var(--font-libre)] text-4xl">Our Mission</h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90">
              We believe a <span className="text-copper">stable home</span> is the foundation for a better quality of life and stronger communities. Landing Forward offers supportive housing environments that help individuals regain stability and thrive.
            </p>
            <p className="mt-5 font-[var(--font-libre)] text-2xl italic text-copper">Structured support. Compassionate community. Lasting momentum.</p>
          </div>
        </section>

        <section id="what-we-provide" className="snap-section py-14" data-reveal-group>
          <h2 data-reveal className="mb-8 text-center font-[var(--font-libre)] text-4xl">What We Provide</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {provideCards.map(([title, subtitle, Icon]) => (
              <motion.article
                data-reveal
                key={title}
                whileHover={{ y: -6, rotateX: 5, rotateY: -5 }}
                className="glass rounded-2xl p-5 transition hover:border-copper"
              >
                <Icon className="mb-4 text-copper" />
                <h3 className="font-medium">{title}</h3>
                <p className="mt-2 text-sm text-white/75">{subtitle}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="who-we-serve" className="snap-section py-14" data-reveal-group>
          <h2 data-reveal className="mb-8 font-[var(--font-libre)] text-4xl">Who We Serve</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {["Veterans", "Seniors", "Individuals experiencing homelessness or housing instability"].map((item) => (
              <div key={item} data-reveal className="glass animate-float rounded-2xl p-6">
                <HandHeart className="mb-3 text-copper" />
                <p>{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-white/80">*All participants must be eligible for independent living.</p>
        </section>

        <section className="snap-section py-14" data-reveal-group>
          <div data-reveal className="glass animate-pulseGlow rounded-3xl p-10">
            <h2 className="font-[var(--font-libre)] text-4xl">Why Refer to Landing Forward</h2>
            <p className="mt-4 text-white/90">
              Referral partners help individuals access safe, affordable housing that offers safety, consistency, and the opportunity to build a supportive community. Our program is inclusive and compassionate, and we offer housing in multiple locations.
            </p>
          </div>
        </section>

        <section id="referral" className="snap-section py-14" data-reveal-group>
          <div data-reveal className="glass rounded-3xl p-8">
            <h2 className="mb-6 font-[var(--font-libre)] text-4xl">Referral Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
              {[
                ["referrerName", "Referrer Name", "text"],
                ["organization", "Organization", "text"],
                ["email", "Email", "email"],
                ["phone", "Phone", "tel"],
                ["participantName", "Participant Name", "text"]
              ].map(([name, label, type]) => (
                <label key={name} className="text-sm">
                  {label}
                  <input
                    type={type}
                    className="mt-1 w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-copper focus:shadow-copper"
                    {...register(name as keyof ReferralFormData, { required: true })}
                  />
                  {errors[name as keyof ReferralFormData] && <span className="text-xs text-orange-200">Required</span>}
                </label>
              ))}
              <label className="text-sm">
                Location
                <select
                  className="mt-1 w-full rounded-xl border border-white/25 bg-charcoal px-4 py-3 text-white outline-none transition focus:border-copper focus:shadow-copper"
                  {...register("location", { required: true })}
                >
                  <option value="">Select location</option>
                  <option>Philadelphia/Delaware</option>
                  <option>Atlanta Metro</option>
                </select>
              </label>
              <label className="md:col-span-2 text-sm">
                Notes
                <textarea
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-copper focus:shadow-copper"
                  {...register("notes")}
                />
              </label>
              <label className="md:col-span-2 flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-copper" {...register("consent", { required: true })} />
                I confirm this referral is submitted with participant awareness.
              </label>
              <div className="md:col-span-2">
                <button
                  disabled={isSubmitting}
                  className="rounded-full bg-copper px-6 py-3 font-medium text-white transition hover:brightness-110 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Referral"}
                </button>
                {submitted && <p className="mt-3 text-emerald-200">Thank you. Your referral was submitted successfully.</p>}
              </div>
            </form>
          </div>
        </section>

        <section id="contact" className="snap-section py-14" data-reveal-group>
          <div data-reveal className="glass rounded-3xl p-8">
            <h2 className="font-[var(--font-libre)] text-4xl">Contact</h2>
            <ul className="mt-5 space-y-3 text-white/90">
              <li className="flex items-center gap-2"><Phone className="text-copper" /> <a href="tel:+14842220049">Greater Philadelphia and Delaware: 484.222.0049</a></li>
              <li className="flex items-center gap-2"><Phone className="text-copper" /> <a href="tel:+14045009323">Atlanta Metro: 404.500.9323</a></li>
              <li className="flex items-center gap-2"><Mail className="text-copper" /> <a href="mailto:info@landingforward.com">info@landingforward.com</a></li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t border-copper/40 bg-black/25">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo className="h-auto w-40" />
            <p className="mt-3 text-sm text-white/80">A safe place to land — and move forward.</p>
          </div>
          <div className="text-sm text-white/75">
            <p>© {new Date().getFullYear()} Looking Forward Community Programs.</p>
            <p>landingforward.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
