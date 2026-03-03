import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import profile from "../assets/profile.webp";
import Metrics from "./Metrics";
import ThreeScene from "./ThreeScene";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* 3D BACKGROUND */}
      <div className="absolute inset-0">
        <ThreeScene />
      </div>

      {/* glow blobs */}
      <div className="pointer-events-none absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-xl"
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent" />

          <p className="text-primary text-sm tracking-widest uppercase mb-3">
            Portfolio
          </p>

          <h1 className="text-5xl font-bold">
            Hi, I'm <span className="text-primary">Athul N A</span>
          </h1>

          <h2 className="text-xl text-gray-300 mt-4 h-10">
            <Typewriter
              words={["Data Scientist", "Data Analyst", "AI/ML Engineer"]}
              loop
              cursor
            />
          </h2>

          <div className="mt-6 inline-block px-4 py-1 text-sm bg-green-500/20 text-green-400 rounded-full border border-green-500/30 animate-pulse">
            Available for Hire
          </div>

          <p className="mt-6 text-gray-300 max-w-xl">
            Transforming raw data into actionable insights using
            predictive modeling and intelligent analytics.
          </p>

          {/* ⭐ CTA BUTTONS (ADDED) */}
          <div className="flex flex-wrap gap-4 mt-6">

            <a
              href="#projects"
              className="px-5 py-2 bg-primary text-black rounded-lg hover:scale-105 transition"
            >
              View Projects
            </a>

            <a
              href="/resume.pdf"
              download
              className="px-5 py-2 border border-primary text-primary rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:scale-105 transition"
            >
              Download Resume
            </a>

          </div>

          <Metrics />

          <img
            src="https://github-readme-stats.vercel.app/api?username=Athulajithan&show_icons=true&theme=transparent&hide_border=true"
            alt="GitHub Stats"
            className="mt-8 rounded-lg"
          />

          <div className="flex gap-6 mt-8 text-gray-300">
            <a href="https://linkedin.com/in/athulajithan">
              <Linkedin className="hover:text-primary transition" />
            </a>
            <a href="https://github.com/Athulajithan">
              <Github className="hover:text-primary transition" />
            </a>
            <a href="mailto:athulajithan039@gmail.com">
              <Mail className="hover:text-primary transition" />
            </a>
          </div>
        </motion.div>

        {/* RIGHT — PROFILE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute w-[420px] h-[420px] rounded-full bg-white/5 border border-white/10 backdrop-blur-xl" />
          <div className="absolute w-[460px] h-[460px] rounded-full bg-primary/20 blur-[120px]" />

          <div className="relative p-2 rounded-full bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl">
            <img
              src={profile}
              alt="Athul N A"
              loading="lazy"
              className="w-80 h-80 object-cover rounded-full"
            />
            <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-40" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}