
import React, { useState, useEffect } from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import Celebration from '@/components/Celebration';
import HiddenGift from '@/components/HiddenGift';

const Index = () => {
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const birthdayDate = new Date('March 29, 2025 00:00:00');
  
  // Check if we're currently on Deekshitha's birthday (for testing)
  useEffect(() => {
    const checkIfBirthday = () => {
      const now = new Date();
      // For testing/preview purposes, uncomment the next line and comment out the actual check
      // return true;
      return now >= birthdayDate;
    };
    
    setIsCountdownComplete(checkIfBirthday());
  }, []);
  
  const handleCountdownComplete = () => {
    setIsCountdownComplete(true);
  };
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background with gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-theme-black to-theme-black/95 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(229,57,53,0.1)_0%,rgba(0,0,0,0)_60%)] z-0"></div>
      </div>
      
      {/* Subtle red glow in the center */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-theme-redGlow blur-3xl rounded-full opacity-20 z-0"></div>
      
      {/* Main content container */}
      <main className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 z-10">
        <h1 className="text-2xl md:text-3xl font-serif text-theme-white mb-8 text-center">
          A Clock That Counts Every Second For You
        </h1>
        
        <div className="mb-10 w-full max-w-3xl">
          <CountdownTimer 
            targetDate={birthdayDate} 
            onComplete={handleCountdownComplete} 
          />
        </div>
      </main>
      
      {/* Celebration component (visible when countdown completes) */}
      <Celebration isVisible={isCountdownComplete} />
      
      {/* Hidden Gift Button and Reveal */}
      <HiddenGift isCountdownComplete={isCountdownComplete} />
    </div>
  );
};

export default Index;
