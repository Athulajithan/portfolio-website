import SectionWrapper from "./SectionWrapper";

const steps = [
  "Data Collection",
  "Data Cleaning",
  "Feature Engineering",
  "Model Training",
  "Evaluation",
  "Deployment"
];

export default function Pipeline(){
  return (
    <SectionWrapper id="pipeline">
      <h2 className="text-3xl font-bold text-primary mb-12 text-center">
        ML Pipeline
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {steps.map((s,i)=>(
          <div key={i} className="px-5 py-3 bg-white/5 border border-white/10 rounded-full hover:border-primary transition">
            {s}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
