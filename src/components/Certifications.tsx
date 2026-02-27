import SectionWrapper from "./SectionWrapper";
import { ExternalLink } from "lucide-react";
import Tilt from "react-parallax-tilt";

export default function Certifications() {
  const certs = [
    {
      title: "Masters Program in Data Science (Gold - 86%)",
      issuer: "NASSCOM (Government Aligned)",
      file: "/certificates/nasscom.pdf",
    },
    {
      title: "Data Science Programme - Certificate of Excellence",
      issuer: "EXCELR",
      file: "/certificates/excelr.pdf",
    },
    {
      title: "Data Analytics Job Simulation",
      issuer: "Deloitte (Forage)",
      file: "/certificates/deloitte.pdf",
    },
    {
      title: "Data Science & Analytics",
      issuer: "HP LIFE",
      file: "/certificates/hp.pdf",
    },
    {
      title: "Tableau Business Intelligence Analyst",
      issuer: "Coursera",
      file: "/certificates/coursera.pdf",
    },
  ];

  return (
    <SectionWrapper id="certifications">
      <h2 className="text-3xl font-bold text-primary mb-12 text-center">
        Certifications
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {certs.map((cert, i) => (
          <Tilt
            key={i}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareEnable={false}
            className="bg-black/40 p-6 rounded-2xl border border-white/10 hover:border-primary transition"
          >
            <a href={cert.file} target="_blank">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">
                    {cert.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    {cert.issuer}
                  </p>
                </div>
                <ExternalLink className="text-primary" />
              </div>
            </a>
          </Tilt>
        ))}
      </div>
    </SectionWrapper>
  );
}
