
import React, { useState, useRef, useEffect } from 'react';
import { createStarryNight } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface HiddenGiftPopupProps {
  isCountdownComplete: boolean;
  onClose: () => void;
}

const HiddenGiftPopup: React.FC<HiddenGiftPopupProps> = ({ isCountdownComplete, onClose }) => {
  const [phase, setPhase] = useState(0);
  const starryContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isCountdownComplete) {
      onClose();
      return;
    }
    
    // Start the animation sequence
    setPhase(0);
    const timer1 = setTimeout(() => setPhase(1), 1000); // Show first message
    const timer2 = setTimeout(() => setPhase(2), 4000); // Show starry night and final message
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isCountdownComplete, onClose]);
  
  useEffect(() => {
    if (phase === 2 && starryContainerRef.current) {
      createStarryNight(starryContainerRef.current);
    }
  }, [phase]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
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
            onClick={onClose}
            variant="outline"
          >
            Close
          </Button>
        </div>
      )}
      
      {/* Close button */}
      <Button
        className="absolute top-4 right-4 z-20 rounded-full p-2 bg-transparent hover:bg-theme-white/10"
        size="icon"
        variant="ghost"
        onClick={onClose}
      >
        <X className="h-5 w-5 text-theme-white" />
      </Button>
    </div>
  );
};

export default HiddenGiftPopup;
