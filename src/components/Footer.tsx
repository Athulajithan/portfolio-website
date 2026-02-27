import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 py-10 border-t border-white/10 text-center text-gray-400">
      <div className="flex justify-center gap-6 mb-4">
        <a href="https://github.com/Athulajithan" target="_blank">
          <Github className="hover:text-primary transition" />
        </a>
        <a href="https://linkedin.com/in/athulajithan" target="_blank">
          <Linkedin className="hover:text-primary transition" />
        </a>
      </div>

      <p>© {new Date().getFullYear()} Athul N A</p>
      <p className="text-sm mt-2">
        Built with React, TypeScript & Tailwind CSS
      </p>
    </footer>
  );
}
