'use client';

import { useState } from 'react';
import CustomCursor from '@/components/CustomCursor';
import CreativeLoadingPage from '@/components/CreativeLoading';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return (
        <div className="App">
            {isLoading && <CreativeLoadingPage onLoadingComplete={handleLoadingComplete} />}

            {!isLoading && <CustomCursor />}

            {!isLoading && (
                <>
                    <Navbar />
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Experience />
                    <Contact />
                    <Footer />
                </>
            )}
        </div>
    );
}
