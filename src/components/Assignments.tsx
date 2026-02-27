import SectionWrapper from "./SectionWrapper";

export default function Assignments() {
  return (
    <SectionWrapper id="assignments">
      <h2 className="text-3xl font-bold text-primary mb-10 text-center">
        Data Science Assignments
      </h2>

      <p className="text-gray-400 leading-8 text-center max-w-3xl mx-auto mb-8">
        This repository contains 20 comprehensive assignments completed using
        Google Colab. It covers Python fundamentals, EDA,
        visualization, statistics, and Machine Learning implementations.
      </p>

      <div className="text-center">
        <a
          href="https://github.com/Athulajithan/Data-Science-assignments"
          target="_blank"
          className="px-6 py-3 bg-primary text-black font-semibold rounded-lg transition duration-300 hover:shadow-[0_0_20px_#00f5ff]"
        >
          View Repository
        </a>
      </div>
    </SectionWrapper>
  );
}
