

import { useEffect, useState } from "react";

import "./App.css";
import { BrowserRouter } from "react-router-dom";


import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingPage from "./components/LoadingPage";
import CreativeLoadingPage from "./components/CreativeLoading";


function App() {

   const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  return (
      <div className="App">
     
      {isLoading && <LoadingPage onLoadingComplete={handleLoadingComplete} />}
      
  
      {!isLoading && <CustomCursor />}
      
      {!isLoading && (
    <BrowserRouter>
     
        
        <CustomCursor />

        
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />

      
    </BrowserRouter>
    
  )}
  </div>
  );
}



export default App;
