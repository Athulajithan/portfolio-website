import SectionWrapper from "./SectionWrapper";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <h2 className="text-3xl font-bold text-primary mb-10 text-center">
        Contact
      </h2>

      <div className="space-y-6 text-gray-300 text-center">

        <div className="flex items-center justify-center gap-3">
          <Mail size={20} />
          <a href="mailto:athulajithan039@gmail.com" className="hover:text-primary">
            athulajithan039@gmail.com
          </a>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Phone size={20} />
          <a href="tel:+918086143480" className="hover:text-primary">
            +91 8086143480
          </a>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Linkedin size={20} />
          <a href="https://linkedin.com/in/athulajithan" target="_blank" className="hover:text-primary">
            LinkedIn Profile
          </a>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Github size={20} />
          <a href="https://github.com/Athulajithan" target="_blank" className="hover:text-primary">
            GitHub Profile
          </a>
        </div>

      </div>
    </SectionWrapper>
  );
}
