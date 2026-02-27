import CountUp from "react-countup";

export default function Metrics() {
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-10 mt-12">

      <div>
        <h3 className="text-3xl font-bold text-primary">
          <CountUp end={20} duration={3} />+
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          Assignments
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-primary">
          <CountUp end={6} duration={3} />+
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          Certifications
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-primary">
          <CountUp end={86} duration={3} />%
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          NASSCOM Gold Score
        </p>
      </div>

    </div>
  );
}
