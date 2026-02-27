import { Mail, Phone, Linkedin, Github, Copy } from "lucide-react";
import { useState } from "react";

export default function TopBar() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("athulajithan039@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-black border-b border-white/10 text-gray-300 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap justify-between items-center gap-4">

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span className="hidden sm:inline">
              athulajithan039@gmail.com
            </span>
            <Copy
              size={14}
              className="cursor-pointer hover:text-primary"
              onClick={copyEmail}
            />
          </div>

          <a
            href="tel:+918086143480"
            className="flex items-center gap-2 hover:text-primary"
          >
            <Phone size={16} />
            <span className="hidden sm:inline">
              +91 8086143480
            </span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://linkedin.com/in/athulajithan" target="_blank">
            <Linkedin size={18} className="hover:text-primary" />
          </a>

          <a href="https://github.com/Athulajithan" target="_blank">
            <Github size={18} className="hover:text-primary" />
          </a>
        </div>

      </div>
    </div>
  );
}
