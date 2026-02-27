import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [active, setActive] = useState("about");
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);

  const sections = [
    "about",
    "experience",
    "projects",
    "assignments",
    "skills",
    "certifications",
    "contact",
  ];

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActive(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <nav className="sticky top-0 w-full backdrop-blur-2xl bg-black/40 border-b border-white/10 shadow-lg z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        <h1 className="text-primary font-bold text-lg sm:text-xl">
          Athul N A
        </h1>

        <div className="hidden md:flex items-center gap-6 text-sm">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`relative px-1 transition ${
                active === section
                  ? "text-primary font-semibold"
                  : "text-gray-300"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300 ${
                  active === section ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}

          <button onClick={toggleTheme}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleTheme}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-black border-t border-white/10 px-4 py-4 space-y-4">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => setOpen(false)}
              className="block hover:text-primary"
            >
              {section}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
