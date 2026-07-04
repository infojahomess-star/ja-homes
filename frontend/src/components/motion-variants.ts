// Shared motion configurations for premium, GPU-accelerated animations

export const motionVariants = {
  // Cinematic transition on page entry
  cinematicFadeIn: "transition-all duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1)",
  
  // Custom camera pull-back zoom out
  cameraPullBack: "transition-transform duration-[2500ms] cubic-bezier(0.16, 1, 0.3, 1)",
  
  // Glowing pulsar animation for hotspots
  radarPing: "animate-ping opacity-60 bg-amber-500",
  
  // Slow pan Ken Burns effect
  kenBurnsClass: "animate-ken-burns",
  
  // Parallax translation
  parallaxScroll: "will-change-transform transition-transform duration-100 ease-out",
  
  // Premium 3D Tilt container transition
  tiltHover: "transition-all duration-500 ease-out hover:shadow-2xl hover:border-amber-500/30",
  
  // Stagger reveal delays
  delayStagger: [
    "delay-[100ms]",
    "delay-[200ms]",
    "delay-[300ms]",
    "delay-[400ms]",
    "delay-[500ms]"
  ],
  
  // Button interactions
  ctaInteractive: "transition-all duration-500 hover:scale-[1.03] hover:brightness-110 active:scale-95 cursor-pointer"
};
