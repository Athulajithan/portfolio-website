import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <Particles
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 40 },
          size: { value: 2 },
          move: { enable: true, speed: 1 },
          links: { enable: true, distance: 150 },
          opacity: { value: 0.2 },
        },
      }}
      className="absolute inset-0 -z-10"
    />
  );
}
