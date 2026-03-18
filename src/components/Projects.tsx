import { useState } from "react";
import SectionWrapper from "./SectionWrapper";

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const projects = [
    
    {
  title: "Online Course Recommendation System",
  category: "Recommender System",
  description:
    "Hybrid course recommendation system that suggests relevant online courses using content similarity and popularity scoring, deployed as an interactive Streamlit application.",
  details: [
    "Hybrid recommender (Content + Popularity)",
    "Cosine similarity based recommendations",
    "Feature engineering & preprocessing pipeline",
    "Real-time interactive Streamlit deployment",
    "Explainable recommendation logic"
  ],
  live: "https://online-course-recommendation-system.streamlit.app/",
  github: "https://github.com/Athulajithan/Online-course-recommendation-system",
},

    // ✅ NEW PROJECT ADDED HERE
    {
      title: "Netflix Tableau Dashboard",
      category: "Data Analytics",
      description:
        "Interactive Tableau dashboard analyzing Netflix movies and TV shows, focusing on content distribution, ratings, genres, and trends.",
      details: [
        "Tableau dashboard with interactive filters",
        "Movies vs TV Shows comparison",
        "Top genres & ratings analysis",
        "Content trends over time",
        "Geographical distribution (map visualization)"
      ],
      live: "https://public.tableau.com/views/Netflex-Dashboard/Netflix",
      github: "https://github.com/Athulajithan/Netflix-tableau-dashboard",
    },

    {
      title: "Apple Stock Price Forecasting",
      category: "ML",
      description:
        "End-to-end time series forecasting system using statistical and machine learning models.",
      details: [
        "Data preprocessing & EDA",
        "Evaluated using MAE & RMSE",
        "Deployed with Streamlit",
      ],
      live: "https://athul-stock-price-forecasting.streamlit.app/",
      github: "https://github.com/Athulajithan/Stock-Price-Forecasting",
    },
    {
      title: "Human Scream Detection System",
      category: "ML",
      description:
        "Machine learning-based audio classification system using MFCC feature extraction.",
      details: [
        "Audio preprocessing",
        "Feature extraction (MFCC)",
        "Model evaluation metrics",
      ],
      live: "",
      github: "https://github.com/Athulajithan/scream-detection",
    },
    {
      title: "AI Agent Web Application",
      category: "Web",
      description:
        "Flask-based AI web application with modular backend architecture.",
      details: [
        "API integration",
        "Input validation",
        "Backend logic design",
      ],
      live: "",
      github: "https://github.com/Athulajithan/ai-agent-python-flask",
    },
  ];

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <SectionWrapper id="projects">
      <h2 className="text-3xl font-bold text-primary mb-12 text-center">
        Projects
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {/* ✅ Added "Data Analytics" */}
        {["All", "ML", "Web", "Data Analytics"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              filter === type
                ? "bg-primary text-black"
                : "border border-white/20 hover:border-primary"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {filtered.map((project, i) => (
          <div
            key={i}
            className="bg-black/40 p-6 rounded-2xl border border-white/10 transition duration-300 hover:border-primary"
          >
            <h3 className="text-xl font-semibold mb-3">
              {project.title}
            </h3>

            <p className="text-gray-400 mb-4">
              {project.description}
            </p>

            <ul className="text-gray-400 text-sm space-y-1 mb-4">
              {project.details.map((detail, index) => (
                <li key={index}>• {detail}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 text-sm">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  Live Demo
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
