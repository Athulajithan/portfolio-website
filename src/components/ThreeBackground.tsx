import ThreeScene from "./ThreeScene";

export default function ThreeBackground(){
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <ThreeScene/>
    </div>
  );
}
