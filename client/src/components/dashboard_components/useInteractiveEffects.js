import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CONFIG = {
    enableStars: true,
    enableSpotlight: true,
    clickEffect: true,
    glowColor: "163, 71, 255",
    particleCount: 12,
    mobileBreakpoint: 1024,
};

export const useInteractiveCard = () => {
    const cardRef = useRef(null);
    useEffect(() => {
        const cardElement = cardRef.current;
        if (!cardElement || window.innerWidth <= CONFIG.mobileBreakpoint) return;
        const glassCard = cardElement.querySelector('.glass-card');
        if (!glassCard) return;

        let isMouseOver = false;
        let particles = [];
        let timeouts = [];

        // --- HANDLES THE GLOWING BORDER ---
        const handleMouseMove = (e) => {
            if (!isMouseOver) return;
            const rect = glassCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glassCard.style.setProperty('--glow-x', `${x}px`);
            glassCard.style.setProperty('--glow-y', `${y}px`);
        };

        const createParticles = () => {
            if (!isMouseOver || !CONFIG.enableStars) return;
            const { width, height } = glassCard.getBoundingClientRect();
            for (let i = 0; i < CONFIG.particleCount; i++) {
                const timeout = setTimeout(() => {
                    if (!isMouseOver) return;
                    const p = document.createElement('div');
                    p.className = 'particle';
                    p.style.left = `${Math.random() * width}px`;
                    p.style.top = `${Math.random() * height}px`;
                    p.style.setProperty('--glow-color', CONFIG.glowColor);
                    glassCard.appendChild(p);
                    particles.push(p);
                    gsap.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
                    gsap.to(p, { x: (Math.random() - 0.5) * 0.6 * width, y: (Math.random() - 0.5) * 0.6 * height, duration: 2 + Math.random() * 3, ease: 'none', repeat: -1, yoyo: true });
                    gsap.to(p, { opacity: 0.3, duration: 1.5 + Math.random() * 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
                }, i * 150);
                timeouts.push(timeout);
            }
        };

        const clearParticles = () => {
            timeouts.forEach(clearTimeout);
            timeouts = [];
            particles.forEach(p => {
                gsap.killTweensOf(p);
                gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => p.remove() });
            });
            particles = [];
        };

        const handleMouseEnter = () => {
            isMouseOver = true;
            createParticles();
            gsap.to(cardElement, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
            // --- FADES IN BORDER GLOW ---
            gsap.to(glassCard, { '--glow-intensity': 1, duration: 0.3 });
        };

        const handleMouseLeave = () => {
            isMouseOver = false;
            clearParticles();
            gsap.to(cardElement, { scale: 1, duration: 0.3, ease: 'power2.out' });
            // --- FADES OUT BORDER GLOW ---
            gsap.to(glassCard, { '--glow-intensity': 0, duration: 0.3 });
        };

        const handleClick = (e) => {
            if (!CONFIG.clickEffect) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const size = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));
            const ripple = document.createElement('div');
            ripple.style.cssText = `position: absolute; width: ${size * 2}px; height: ${size * 2}px; border-radius: 50%; background: radial-gradient(circle, rgba(${CONFIG.glowColor}, 0.3) 0%, transparent 70%); left: ${x - size}px; top: ${y - size}px; pointer-events: none; z-index: 1000;`;
            glassCard.appendChild(ripple);
            gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
        };

        cardElement.addEventListener('mouseenter', handleMouseEnter);
        cardElement.addEventListener('mouseleave', handleMouseLeave);
        cardElement.addEventListener('click', handleClick);
        // --- ADDED MOUSEMOVE LISTENER ---
        cardElement.addEventListener('mousemove', handleMouseMove);

        return () => {
            cardElement.removeEventListener('mouseenter', handleMouseEnter);
            cardElement.removeEventListener('mouseleave', handleMouseLeave);
            cardElement.removeEventListener('click', handleClick);
            cardElement.removeEventListener('mousemove', handleMouseMove);
            clearParticles();
        };
    }, []);
    return cardRef;
};


export const GlobalEffects = () => {
    useEffect(() => {
        if (window.innerWidth <= CONFIG.mobileBreakpoint || !CONFIG.enableSpotlight) return;

        const timeoutId = setTimeout(() => {
            const spotlight = document.createElement('div');
            spotlight.className = 'global-spotlight';
            spotlight.style.background = `radial-gradient(circle, rgba(${CONFIG.glowColor}, 0.1) 0%, rgba(77, 208, 225, 0.05) 40%, transparent 70%)`;
            document.body.appendChild(spotlight);

            const interactiveElements = document.querySelectorAll('.interactive-container');
            
            if (interactiveElements.length === 0) {
                console.error("DEBUG ERROR: No '.interactive-container' elements found.");
                return;
            }

            const handleMouseMove = (e) => {
                gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });

                let minDistance = Infinity;
                interactiveElements.forEach(elem => {
                    const rect = elem.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
                    const effectiveDistance = Math.max(0, distance - Math.max(rect.width, rect.height) / 2);
                    minDistance = Math.min(minDistance, effectiveDistance);
                });

                const spotlightRadius = 400;
                const proximity = 0.5 * spotlightRadius;
                const fadeDistance = 0.75 * spotlightRadius;
                let targetOpacity = 0;
                if (minDistance <= proximity) {
                    targetOpacity = 0.8;
                } else if (minDistance <= fadeDistance) {
                    targetOpacity = 0.8 * (1 - (minDistance - proximity) / (fadeDistance - proximity));
                }
                gsap.to(spotlight, { opacity: targetOpacity, duration: 0.3, ease: 'power2.out' });
            };

            document.addEventListener('mousemove', handleMouseMove);
            
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                if (spotlight.parentNode) {
                    spotlight.parentNode.removeChild(spotlight);
                }
            };
        }, 100);

        return () => clearTimeout(timeoutId);

    }, []);

    return null;
};