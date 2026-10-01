import SectionWrapper from "./SectionWrapper";

export default function Skills() {
  const categories = [
    {
      title: "Programming & Querying",
      skills: [
        "Python",
        "SQL",
        "MySQL",
        "OOP",
        "Pandas",
        "NumPy",
      ],
    },
    {
      title: "Generative & Agentic AI",
      skills: [
        "Generative AI",
        "LLM Integration",
        "AI Agents",
        "LangChain",
        "Google Gemini API",
        "RAG",
        "ChromaDB",
        "BM25 Retrieval",
        "Prompt Engineering",
        "Text-to-SQL",
      ],
    },
    {
      title: "Machine Learning & AI",
      skills: [
        "Machine Learning",
        "Scikit-learn",
        "XGBoost",
        "Regression",
        "Classification",
        "Clustering",
        "Recommendation Systems",
        "Time Series Forecasting",
        "Anomaly Detection",
        "Model Evaluation",
        "Hyperparameter Tuning",
      ],
    },
    {
      title: "Data Analysis & Quality",
      skills: [
        "Data Cleaning",
        "Data Validation",
        "Data Profiling",
        "Data Wrangling",
        "Exploratory Data Analysis",
        "Statistical Analysis",
        "Descriptive Statistics",
        "Feature Engineering",
        "Trend Analysis",
        "Data Transformation",
      ],
    },
    {
      title: "Data Engineering & Databases",
      skills: [
        "ETL",
        "Data Ingestion",
        "Data Pipelines",
        "Relational Databases",
        "SQLite",
        "SQL Server",
        "SQL Joins",
        "Aggregations",
        "CSV / Excel / JSON / Parquet",
      ],
    },
    {
      title: "Visualization & Business Intelligence",
      skills: [
        "Power BI",
        "Tableau",
        "Excel",
        "Pivot Tables",
        "VLOOKUP",
        "KPI Dashboards",
        "Interactive Dashboards",
        "Matplotlib",
        "Plotly",
        "Business Reporting",
      ],
    },
    {
      title: "Python Development & Tools",
      skills: [
        "Flask",
        "Streamlit",
        "REST APIs",
        "JSON APIs",
        "Git",
        "GitHub",
        "Jupyter Notebook",
        "Google Colab",
        "Pytest",
        "Environment Configuration",
      ],
    },
  ];

  return (
    <SectionWrapper id="skills">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
          Technical & Professional Skills
        </h2>

        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          A practical toolkit spanning Python development, data analytics,
          machine learning, Generative AI, Agentic AI, and business intelligence.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group bg-black/40 p-6 rounded-2xl border border-white/10
                         hover:border-primary/40 hover:bg-black/50
                         transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-5 text-primary">
                {cat.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full text-sm
                               bg-white/5 text-gray-300
                               border border-white/10
                               hover:border-primary/40
                               hover:text-white
                               transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
