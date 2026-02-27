export default function Particles() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-20 right-10 animate-pulse"></div>
    </div>
  );
}
