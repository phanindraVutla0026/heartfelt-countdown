
import React, { useState, useRef, useEffect } from 'react';
import { createStarryNight } from '@/utils/animations';
import { Button } from '@/components/ui/button';

interface HiddenGiftProps {
  isCountdownComplete: boolean;
}

const HiddenGift: React.FC<HiddenGiftProps> = ({ isCountdownComplete }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [phase, setPhase] = useState(0);
  const starryContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (phase === 2 && starryContainerRef.current) {
      createStarryNight(starryContainerRef.current);
    }
  }, [phase]);
  
  const handleReveal = () => {
    if (!isCountdownComplete) return;
    
    setIsRevealed(true);
    
    // Timeline for the secret message
    setTimeout(() => setPhase(1), 1000); // Show first message
    setTimeout(() => setPhase(2), 4000); // Show starry night and final message
  };
  
  // If not revealed, show the secret button
  if (!isRevealed) {
    return (
      <div 
        className={`fixed bottom-8 right-8 md:bottom-10 md:right-10 z-20 transition-all duration-500 ${isCountdownComplete ? 'opacity-70 hover:opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleReveal}
      >
        <div className="relative flex flex-col items-center group cursor-pointer">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-theme-red bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center transition-all duration-300 animate-pulse">
            <span className="text-theme-white text-xl md:text-2xl">❤️</span>
          </div>
          <span className="absolute -bottom-6 text-xs text-theme-white opacity-80 group-hover:opacity-100 transition-opacity duration-300">tap me</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {phase === 0 && (
        <div className="w-full h-full bg-theme-black animate-fadeIn flex items-center justify-center">
          {/* Black screen fade in */}
        </div>
      )}
      
      {phase === 1 && (
        <div className="w-full h-full bg-theme-black flex items-center justify-center p-4">
          <p className="font-handwritten text-2xl md:text-3xl text-theme-white text-center max-w-md animate-fadeIn">
            "Some words are better left unspoken... But if they were to be said, they would sound something like this..."
          </p>
        </div>
      )}
      
      {phase === 2 && (
        <div 
          ref={starryContainerRef}
          className="w-full h-full bg-gradient-to-b from-theme-deepBlack to-theme-black flex flex-col items-center justify-center p-4 overflow-hidden relative"
        >
          <p className="font-serif text-xl md:text-2xl text-theme-white text-center max-w-md animate-fadeIn mb-2 z-10">
            ✨ For someone as rare as a falling star, may your wishes always come true. ✨
          </p>
          
          <Button 
            className="mt-8 px-6 py-2 bg-transparent border border-theme-white text-theme-white rounded-full hover:bg-theme-white hover:text-theme-black transition-all duration-300 z-10"
            onClick={() => setIsRevealed(false)}
            variant="outline"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default HiddenGift;
