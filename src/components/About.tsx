import SectionWrapper from "./SectionWrapper";

export default function About() {
  return (
    <SectionWrapper id="about">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        About
      </h2>

      <p className="text-gray-400 leading-8 text-center max-w-3xl mx-auto">
        I am a Computer Science graduate with hands-on experience in
        Data Science, Data Analysis, and Machine Learning.
        I specialize in data cleaning, exploratory data analysis (EDA),
        forecasting systems, and dashboard development.
        I am actively seeking roles in Data Science,
        Data Analysis, and AI/ML.
      </p>
    </SectionWrapper>
  );
}
