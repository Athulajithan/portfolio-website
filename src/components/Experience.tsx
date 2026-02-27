import SectionWrapper from "./SectionWrapper";
import { useState } from "react";
import CertificateModal from "./CertificateModal";
import logo from "../assets/ai-variant.png";
import { motion } from "framer-motion";

export default function Experience() {
  const [showModal, setShowModal] = useState(false);

  return (
    <SectionWrapper id="experience">
      <h2 className="text-3xl font-bold text-primary mb-12 text-center">
        Experience
      </h2>

      <div className="relative border-l border-primary/40 pl-8">

        {/* ITEM */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 relative"
        >
          {/* animated dot */}
          <span className="absolute -left-3 top-2 w-6 h-6 bg-primary rounded-full animate-pulse" />

          {/* glass card */}
          <div className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl hover:-translate-y-1 transition">

            {/* gradient shine */}
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40" />

            {/* header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-lg bg-white/10 border border-white/10">
                <img src={logo} alt="AI Variant" className="w-16" />
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Data Science Intern — AI Variant
                </h3>

                <p className="text-gray-400 text-sm">
                  Aug 2025 – Feb 2026
                </p>
              </div>
            </div>

            {/* certificate */}
            <button
              onClick={() => setShowModal(true)}
              className="text-primary text-sm hover:underline"
            >
              View Internship Certificate
            </button>

            {/* responsibilities */}
            <div className="mt-4 space-y-4 text-gray-300">

  {/* Apple Project */}
  <div>
    <p className="font-semibold text-primary text-sm mb-2">
      Apple Stock Price Forecasting
    </p>
    <ul className="list-disc ml-5 space-y-1 text-sm">
      <li>Built time-series forecasting models for stock trend prediction</li>
      <li>Performed EDA and feature engineering (rolling mean, lag features)</li>
      <li>Evaluated models using MAE & RMSE</li>
      <li>Deployed interactive forecasting dashboard with Streamlit</li>
    </ul>
  </div>

  {/* Recommendation Project */}
  <div>
    <p className="font-semibold text-primary text-sm mb-2">
      Online Course Recommendation System
    </p>
    <ul className="list-disc ml-5 space-y-1 text-sm">
      <li>Developed personalized course recommendation engine</li>
      <li>Implemented similarity-based ranking using course metadata</li>
      <li>Applied collaborative / content-based filtering techniques</li>
      <li>Built interactive UI for course suggestions</li>
    </ul>
  </div>

</div>

            {/* skills tags ⭐ */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Python", "Pandas", "Scikit-learn", "Streamlit", "Forecasting"].map(
                (s) => (
                  <span
                    key={s}
                    className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/10"
                  >
                    {s}
                  </span>
                )
              )}
            </div>

            {/* projects */}
            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="text-primary font-semibold mb-2">
                Key Internship Projects
              </h4>

              <div className="flex flex-col gap-2 text-sm text-gray-300">
                <span>Apple Stock Price Forecasting System</span>
                <span>Online Course Recommendation System</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {showModal && (
        <CertificateModal
          file="/certificates/ai-variant-internship.pdf"
          onClose={() => setShowModal(false)}
        />
      )}
    </SectionWrapper>
  );
}
