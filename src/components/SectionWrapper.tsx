import { motion } from "framer-motion";

export default function SectionWrapper({ id, children }: any) {
  return (
    <section id={id} className="relative py-28 px-4 sm:px-6">

      {/* TOP separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* glass container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="
          relative
          max-w-6xl
          mx-auto
          p-8 sm:p-10
          rounded-3xl
          bg-white/[0.04]
          border border-white/10
          backdrop-blur-xl
          shadow-[0_0_40px_rgba(0,0,0,0.25)]
        "
      >
        {children}
      </motion.div>

      {/* BOTTOM glow divider */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[1px] bg-primary/20 blur-sm" />

    </section>
  );
}
