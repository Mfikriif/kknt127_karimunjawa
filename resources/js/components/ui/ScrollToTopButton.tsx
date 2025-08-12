import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopButtonProps {
    threshold?: number; // Pixel threshold untuk menampilkan button
    targetSectionId?: string; // ID section yang menjadi trigger
    showOnSection?: boolean; // Apakah button muncul berdasarkan section atau scroll distance
    className?: string;
}

export default function ScrollToTopButton({ 
    threshold = 800, 
    targetSectionId = 'hero', // Default ke 'hero' untuk umkm-hero section
    showOnSection = true,
    className = ""
}: ScrollToTopButtonProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (showOnSection && targetSectionId) {
                // Mode: Tampilkan button ketika MELEWATI section tertentu (hero)
                const targetElement = document.getElementById(targetSectionId);
                if (targetElement) {
                    const rect = targetElement.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;
                    const elementHeight = rect.height;
                    
                    // Button muncul ketika user sudah melewati hero section
                    // (scroll melewati bagian bawah hero section + offset 50px)
                    const hasPassedHero = window.scrollY > (elementTop + elementHeight - 50);
                    setIsVisible(hasPassedHero);
                } else {
                    // Fallback: jika hero section tidak ditemukan, gunakan threshold
                    setIsVisible(window.scrollY > threshold);
                }
            } else {
                // Mode: Tampilkan button berdasarkan scroll distance
                setIsVisible(window.scrollY > threshold);
            }
        };

        // Throttled scroll handler untuk performance
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    toggleVisibility();
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', toggleVisibility, { passive: true });
        
        // Check initial state
        toggleVisibility();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', toggleVisibility);
        };
    }, [threshold, targetSectionId, showOnSection]);

    const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isScrolling) return; // Prevent multiple clicks
        
        setIsScrolling(true);
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        // Reset scrolling state after animation
        setTimeout(() => {
            setIsScrolling(false);
        }, 1000);

        // Add haptic feedback for mobile
        if ('vibrate' in navigator && navigator.vibrate) {
            try {
                navigator.vibrate(50);
            } catch {
                // Ignore vibration errors
            }
        }
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            type="button"
            className={`
                fixed bottom-6 right-6 z-[9999]
                w-12 h-12 md:w-14 md:h-14
                bg-gradient-to-br from-[#1B9C85] to-[#4DD0E1] 
                hover:from-[#16A085] hover:to-[#3FBDCC]
                text-white rounded-full shadow-lg hover:shadow-xl
                transition-all duration-300 ease-in-out
                transform hover:scale-110 active:scale-95
                backdrop-blur-sm border border-white/20
                group focus:outline-none focus:ring-4 focus:ring-[#4DD0E1]/50
                cursor-pointer
                ${isScrolling ? 'animate-pulse cursor-wait' : 'cursor-pointer'}
                ${className}
            `}
            aria-label="Scroll to top"
            title="Kembali ke atas"
            disabled={isScrolling}
        >
            <div className="relative flex items-center justify-center w-full h-full pointer-events-none">
                {/* Background circle animation */}
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-ping pointer-events-none"></div>
                
                {/* Arrow icon */}
                <ArrowUp 
                    className={`
                        w-5 h-5 md:w-6 md:h-6 
                        transition-transform duration-300 ease-out
                        group-hover:-translate-y-0.5
                        ${isScrolling ? 'animate-bounce' : ''}
                    `}
                />
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1B9C85] to-[#4DD0E1] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 pointer-events-none"></div>
            </div>
        </button>
    );
}