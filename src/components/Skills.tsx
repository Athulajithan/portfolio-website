import SectionWrapper from "./SectionWrapper";

export default function Skills() {
  const categories = [
    {
      title: "Programming & Querying",
      skills: ["Python", "SQL"],
    },
    {
      title: "Data Analysis",
      skills: [
        "Data Cleaning",
        "Data Validation",
        "Exploratory Data Analysis (EDA)",
        "Descriptive Statistics",
        "Trend Analysis",
        "Data Wrangling",
      ],
    },
    {
      title: "Data Visualization & BI",
      skills: [
        "Tableau",
        "Power BI",
        "Excel",
        "Matplotlib",
      ],
    },
    {
      title: "Databases & Tools",
      skills: [
        "Relational Databases",
        "CSV / Excel Data Handling",
        "Jupyter Notebook",
      ],
    },
    {
      title: "Reporting & Insights",
      skills: [
        "Dashboard Development",
        "KPI Tracking",
        "Ad-hoc Analysis",
        "Business Reporting",
        "Data-Driven Decision Making",
      ],
    },
    {
      title: "Soft Skills",
      skills: [
        "Analytical Thinking",
        "Problem Solving",
        "Communication",
        "Stakeholder Collaboration",
      ],
    },
  ];

  return (
    <SectionWrapper id="skills">
      <h2 className="text-3xl font-bold text-primary mb-12 text-center">
        Technical & Professional Skills
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-black/40 p-6 rounded-2xl border border-white/10"
          >
            <h3 className="text-lg font-semibold mb-4 text-primary">
              {cat.title}
            </h3>

            <ul className="space-y-2 text-gray-300">
              {cat.skills.map((skill, index) => (
                <li key={index}>✔ {skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
