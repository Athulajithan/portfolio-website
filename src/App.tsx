import ThreeBackground from "./components/ThreeBackground";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Assignments from "./components/Assignments";
import Pipeline from "./components/Pipeline";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AIChat from "./components/AIChat";

export default function App(){
  return (
    <>
      {/* GLOBAL 3D BACKGROUND */}
      <ThreeBackground/>

      <Navbar/>
      <Hero/>
      <About/>
      <Experience/>
      <Projects/>
      <Assignments/>
      <Pipeline/>
      <Skills/>
      <Certifications/>
      <Contact/>
      <Footer/>
      <AIChat/>
    </>
  );
}
